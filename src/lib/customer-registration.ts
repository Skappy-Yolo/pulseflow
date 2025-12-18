// =============================================================================
// CUSTOMER REGISTRATION SERVICE
// =============================================================================
// This service handles customer registration flow with the new multi-tenant schema
// - Submits registration to queue (pending approval)
// - Handles account activation
// - Integrates with existing consultant auth
// =============================================================================

import { supabase } from './supabase';

// Types
export type CustomerType = 'consulting' | 'executive';

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  organizationType: string;
  teamSizeOrClients: string;
  primaryRole: string;
  mainChallenge: string;
  otherChallenge?: string;
  userType: CustomerType;
}

export interface RegistrationResult {
  success: boolean;
  message: string;
  registrationId?: string;
  error?: string;
}

export interface ActivationResult {
  success: boolean;
  message: string;
  redirectUrl?: string;
  error?: string;
}

// =============================================================================
// REGISTRATION SERVICE
// =============================================================================

export class CustomerRegistrationService {
  
  /**
   * Submit a new customer registration to the queue
   * This goes to customer_registration_queue with status='pending'
   */
  static async submitRegistration(formData: RegistrationFormData): Promise<RegistrationResult> {
    try {
      // Check if email already exists in queue
      const { data: existing } = await supabase
        .from('customer_registration_queue')
        .select('id, status')
        .eq('email', formData.workEmail.toLowerCase())
        .single();

      if (existing) {
        if (existing.status === 'pending') {
          return {
            success: false,
            message: 'This email is already pending review. We\'ll be in touch soon!',
            error: 'EMAIL_PENDING'
          };
        }
        if (existing.status === 'approved') {
          return {
            success: false,
            message: 'This email has already been approved. Please check your email for activation instructions.',
            error: 'EMAIL_APPROVED'
          };
        }
        if (existing.status === 'rejected') {
          // Allow re-registration if previously rejected
          // Delete the old entry first
          await supabase
            .from('customer_registration_queue')
            .delete()
            .eq('id', existing.id);
        }
      }

      // Also check if email exists in organization_members (already a customer)
      const { data: existingMember } = await supabase
        .from('organization_members')
        .select('id')
        .eq('email', formData.workEmail.toLowerCase())
        .single();

      if (existingMember) {
        return {
          success: false,
          message: 'An account with this email already exists. Please login instead.',
          error: 'EMAIL_EXISTS'
        };
      }

      // Insert into registration queue
      const { data, error } = await supabase
        .from('customer_registration_queue')
        .insert({
          email: formData.workEmail.toLowerCase(),
          first_name: formData.firstName,
          last_name: formData.lastName,
          company: formData.company,
          customer_type: formData.userType,
          organization_type: formData.organizationType,
          team_size_or_clients: formData.teamSizeOrClients,
          primary_role: formData.primaryRole,
          main_challenge: formData.mainChallenge,
          other_challenge: formData.otherChallenge || null,
          status: 'pending',
          demo_requested: false
        })
        .select('id')
        .single();

      if (error) {
        console.error('Registration error:', error);
        return {
          success: false,
          message: 'Failed to submit registration. Please try again.',
          error: error.message
        };
      }

      return {
        success: true,
        message: 'Registration submitted successfully! We\'ll review your application and get back to you soon.',
        registrationId: data.id
      };

    } catch (error) {
      console.error('Registration exception:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
        error: String(error)
      };
    }
  }

  /**
   * Validate an activation token
   */
  static async validateActivationToken(token: string): Promise<{
    valid: boolean;
    email?: string;
    firstName?: string;
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('account_activation_tokens')
        .select(`
          id,
          email,
          is_used,
          expires_at,
          member_id,
          organization_members!inner (
            first_name,
            last_name
          )
        `)
        .eq('token', token)
        .single();

      if (error || !data) {
        return { valid: false, error: 'Invalid activation token' };
      }

      if (data.is_used) {
        return { valid: false, error: 'This activation link has already been used' };
      }

      if (new Date(data.expires_at) < new Date()) {
        return { valid: false, error: 'This activation link has expired. Please contact support.' };
      }

      return {
        valid: true,
        email: data.email,
        firstName: (data.organization_members as any)?.first_name || 'User'
      };

    } catch (error) {
      console.error('Token validation error:', error);
      return { valid: false, error: 'Failed to validate token' };
    }
  }

  /**
   * Activate account and set new password
   */
  static async activateAccount(token: string, newPassword: string): Promise<ActivationResult> {
    try {
      // First validate the token
      const validation = await this.validateActivationToken(token);
      if (!validation.valid) {
        return {
          success: false,
          message: validation.error || 'Invalid token',
          error: validation.error
        };
      }

      // Get the token data including temporary password
      const { data: tokenData, error: tokenError } = await supabase
        .from('account_activation_tokens')
        .select('id, email, temporary_password, member_id')
        .eq('token', token)
        .single();

      if (tokenError || !tokenData) {
        return {
          success: false,
          message: 'Token not found',
          error: 'TOKEN_NOT_FOUND'
        };
      }

      // Sign in with the temporary password first
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: tokenData.email,
        password: tokenData.temporary_password
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        return {
          success: false,
          message: 'Failed to authenticate. Please contact support.',
          error: signInError.message
        };
      }

      // Update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        console.error('Password update error:', updateError);
        return {
          success: false,
          message: 'Failed to set new password. Please try again.',
          error: updateError.message
        };
      }

      // Mark token as used
      await supabase
        .from('account_activation_tokens')
        .update({ is_used: true })
        .eq('id', tokenData.id);

      // Update organization member status
      await supabase
        .from('organization_members')
        .update({ 
          is_active: true,
          invitation_accepted_at: new Date().toISOString()
        })
        .eq('id', tokenData.member_id);

      return {
        success: true,
        message: 'Account activated successfully! You can now login.',
        redirectUrl: '/login'
      };

    } catch (error) {
      console.error('Activation error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please contact support.',
        error: String(error)
      };
    }
  }

  /**
   * Request password reset (for existing users)
   */
  static async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        // Don't reveal if email exists or not for security
        console.error('Password reset error:', error);
      }

      // Always return success to not reveal email existence
      return {
        success: true,
        message: 'If an account exists with this email, you will receive password reset instructions.'
      };

    } catch (error) {
      console.error('Password reset exception:', error);
      return {
        success: true,
        message: 'If an account exists with this email, you will receive password reset instructions.'
      };
    }
  }
}

export const customerRegistration = CustomerRegistrationService;
