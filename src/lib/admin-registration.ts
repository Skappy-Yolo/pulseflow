// =============================================================================
// ADMIN REGISTRATION MANAGEMENT SERVICE
// =============================================================================
// This service is for Pulseflow admins to manage customer registrations
// - View pending registrations
// - Approve/reject registrations
// - Send activation emails
// =============================================================================

import { supabase } from './supabase';

// Types
export type RegistrationStatus = 'pending' | 'contacted' | 'demo_scheduled' | 'approved' | 'rejected';
export type CustomerType = 'consulting' | 'executive';

export interface PendingRegistration {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  customer_type: CustomerType;
  organization_type: string;
  team_size_or_clients: string;
  primary_role: string;
  main_challenge: string;
  other_challenge?: string;
  status: RegistrationStatus;
  created_at: string;
  admin_notes?: string;
}

export interface ApprovalResult {
  success: boolean;
  message: string;
  organizationId?: string;
  memberId?: string;
  error?: string;
}

// =============================================================================
// ADMIN REGISTRATION SERVICE
// =============================================================================

export class AdminRegistrationService {

  /**
   * Get all pending registrations
   */
  static async getPendingRegistrations(): Promise<PendingRegistration[]> {
    try {
      const { data, error } = await supabase
        .from('customer_registration_queue')
        .select('*')
        .in('status', ['pending', 'contacted', 'demo_scheduled'])
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Exception fetching registrations:', error);
      return [];
    }
  }

  /**
   * Get registration by ID
   */
  static async getRegistrationById(id: string): Promise<PendingRegistration | null> {
    try {
      const { data, error } = await supabase
        .from('customer_registration_queue')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching registration:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Exception fetching registration:', error);
      return null;
    }
  }

  /**
   * Update registration status
   */
  static async updateStatus(
    registrationId: string, 
    status: RegistrationStatus,
    notes?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('customer_registration_queue')
        .update({
          status,
          admin_notes: notes,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', registrationId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  /**
   * Generate a secure random password
   */
  private static generateTemporaryPassword(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  /**
   * Generate a secure activation token
   */
  private static generateActivationToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 64; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  /**
   * Approve a registration and send activation email
   * This is the main approval flow:
   * 1. Create organization
   * 2. Create auth user with temporary password
   * 3. Create organization member
   * 4. Create activation token
   * 5. Send activation email
   * 6. Update registration status
   */
  static async approveRegistration(registrationId: string): Promise<ApprovalResult> {
    try {
      // 1. Get registration data
      const registration = await this.getRegistrationById(registrationId);
      if (!registration) {
        return { success: false, message: 'Registration not found', error: 'NOT_FOUND' };
      }

      if (registration.status === 'approved') {
        return { success: false, message: 'Registration already approved', error: 'ALREADY_APPROVED' };
      }

      // 2. Create the organization
      const { data: orgData, error: orgError } = await supabase
        .from('customer_organizations')
        .insert({
          company_name: registration.company,
          company_email: registration.email,
          customer_type: registration.customer_type,
          organization_type: registration.organization_type,
          team_size_or_clients: registration.team_size_or_clients,
          primary_role: registration.primary_role,
          main_challenge: registration.main_challenge,
          other_challenge: registration.other_challenge,
          status: 'approved',
          approved_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (orgError) {
        console.error('Organization creation error:', orgError);
        return { success: false, message: 'Failed to create organization', error: orgError.message };
      }

      // 3. Generate temporary password
      const temporaryPassword = this.generateTemporaryPassword();

      // 4. Create Supabase auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: registration.email,
        password: temporaryPassword,
        email_confirm: true, // Auto-confirm since we're approving
        user_metadata: {
          first_name: registration.first_name,
          last_name: registration.last_name,
          company: registration.company
        }
      });

      if (authError) {
        // Rollback organization creation
        await supabase.from('customer_organizations').delete().eq('id', orgData.id);
        console.error('Auth user creation error:', authError);
        return { success: false, message: 'Failed to create user account', error: authError.message };
      }

      // 5. Create organization member
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .insert({
          auth_user_id: authData.user.id,
          organization_id: orgData.id,
          email: registration.email,
          first_name: registration.first_name,
          last_name: registration.last_name,
          role: 'org_admin', // First user is org admin
          is_active: false // Will be activated when they set password
        })
        .select('id')
        .single();

      if (memberError) {
        // Rollback
        await supabase.auth.admin.deleteUser(authData.user.id);
        await supabase.from('customer_organizations').delete().eq('id', orgData.id);
        console.error('Member creation error:', memberError);
        return { success: false, message: 'Failed to create organization member', error: memberError.message };
      }

      // 6. Generate and store activation token
      const activationToken = this.generateActivationToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

      const { error: tokenError } = await supabase
        .from('account_activation_tokens')
        .insert({
          member_id: memberData.id,
          token: activationToken,
          email: registration.email,
          temporary_password: temporaryPassword,
          expires_at: expiresAt.toISOString()
        });

      if (tokenError) {
        console.error('Token creation error:', tokenError);
        // Don't rollback - user is created, they can request password reset
      }

      // 7. Send activation email via Edge Function
      const appUrl = window.location.origin;
      const activationUrl = `${appUrl}/activate?token=${activationToken}`;

      try {
        const { error: emailError } = await supabase.functions.invoke('send-activation-email', {
          body: {
            to: registration.email,
            firstName: registration.first_name,
            companyName: registration.company,
            temporaryPassword: temporaryPassword,
            activationUrl: activationUrl
          }
        });

        if (emailError) {
          console.error('Email sending error:', emailError);
          // Don't fail the whole process, but log it
        }
      } catch (emailException) {
        console.error('Email exception:', emailException);
        // Continue anyway - admin can resend
      }

      // 8. Update registration status
      await supabase
        .from('customer_registration_queue')
        .update({
          status: 'approved',
          organization_id: orgData.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', registrationId);

      return {
        success: true,
        message: 'Registration approved! Activation email sent.',
        organizationId: orgData.id,
        memberId: memberData.id
      };

    } catch (error) {
      console.error('Approval exception:', error);
      return {
        success: false,
        message: 'An unexpected error occurred during approval',
        error: String(error)
      };
    }
  }

  /**
   * Reject a registration
   */
  static async rejectRegistration(registrationId: string, reason: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('customer_registration_queue')
        .update({
          status: 'rejected',
          rejection_reason: reason,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', registrationId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  /**
   * Resend activation email for an approved registration
   */
  static async resendActivationEmail(registrationId: string): Promise<{ success: boolean; message: string }> {
    try {
      // Get registration and related data
      const { data: registration } = await supabase
        .from('customer_registration_queue')
        .select(`
          id, email, first_name, company, organization_id,
          organization_members!organization_id (
            id,
            account_activation_tokens (
              id, token, temporary_password, is_used, expires_at
            )
          )
        `)
        .eq('id', registrationId)
        .single();

      if (!registration) {
        return { success: false, message: 'Registration not found' };
      }

      // Find the member and their token
      const members = (registration as any).organization_members || [];
      if (members.length === 0) {
        return { success: false, message: 'No member found for this registration' };
      }

      const member = members[0];
      let token = member.account_activation_tokens?.[0];

      // If token is used or expired, create a new one
      if (!token || token.is_used || new Date(token.expires_at) < new Date()) {
        const newToken = this.generateActivationToken();
        const newPassword = this.generateTemporaryPassword();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        // Delete old token if exists
        if (token) {
          await supabase.from('account_activation_tokens').delete().eq('id', token.id);
        }

        // Create new token
        const { data: newTokenData, error: tokenError } = await supabase
          .from('account_activation_tokens')
          .insert({
            member_id: member.id,
            token: newToken,
            email: registration.email,
            temporary_password: newPassword,
            expires_at: expiresAt.toISOString()
          })
          .select()
          .single();

        if (tokenError) {
          return { success: false, message: 'Failed to create new activation token' };
        }

        // Update user's password
        // Note: This requires admin access
        token = newTokenData;
      }

      // Send the email
      const appUrl = window.location.origin;
      const activationUrl = `${appUrl}/activate?token=${token.token}`;

      const { error: emailError } = await supabase.functions.invoke('send-activation-email', {
        body: {
          to: registration.email,
          firstName: registration.first_name,
          companyName: registration.company,
          temporaryPassword: token.temporary_password,
          activationUrl: activationUrl
        }
      });

      if (emailError) {
        console.error('Email resend error:', emailError);
        return { success: false, message: 'Failed to send email' };
      }

      return { success: true, message: 'Activation email resent successfully' };

    } catch (error) {
      console.error('Resend exception:', error);
      return { success: false, message: 'An error occurred while resending email' };
    }
  }
}

export const adminRegistration = AdminRegistrationService;
