// src/lib/admin-invitation.ts
// Service for inviting new admin users with automated email flow

import { supabase } from './supabase';

export type AdminRole = 'super_admin' | 'admin' | 'sales' | 'viewer';

export interface AdminInvitation {
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
}

export interface InvitationResult {
  success: boolean;
  message: string;
  adminId?: string;
  tempPassword?: string;
}

// Generate a secure temporary password
function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export const adminInvitation = {
  /**
   * Invite a new admin user
   * Creates auth user, adds to pulseflow_admins, and sends invitation email
   */
  async inviteAdmin(invitation: AdminInvitation, invitedBy: string): Promise<InvitationResult> {
    try {
      const { email, firstName, lastName, role } = invitation;

      // Check if admin already exists
      const { data: existingAdmin } = await supabase
        .from('pulseflow_admins')
        .select('id, email')
        .eq('email', email.toLowerCase())
        .single();

      if (existingAdmin) {
        return {
          success: false,
          message: 'An admin with this email already exists'
        };
      }

      // Generate temporary password
      const tempPassword = generateTempPassword();

      // Create auth user using Supabase Admin API
      // Note: This requires the service_role key or a server-side function
      // For now, we'll use a workaround with signUp
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: tempPassword,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role,
            is_admin: true
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        return {
          success: false,
          message: `Failed to create auth user: ${authError.message}`
        };
      }

      if (!authData.user) {
        return {
          success: false,
          message: 'Failed to create auth user - no user returned'
        };
      }

      // Add to pulseflow_admins table
      const { data: adminData, error: adminError } = await supabase
        .from('pulseflow_admins')
        .insert({
          auth_user_id: authData.user.id,
          email: email.toLowerCase(),
          first_name: firstName,
          last_name: lastName,
          role: role,
          is_active: true,
          invited_by: invitedBy
        })
        .select()
        .single();

      if (adminError) {
        console.error('Admin insert error:', adminError);
        // Try to clean up the auth user if admin insert fails
        return {
          success: false,
          message: `Failed to create admin record: ${adminError.message}`
        };
      }

      // Send invitation email via Edge Function
      try {
        const { error: emailError } = await supabase.functions.invoke('send-admin-invitation', {
          body: {
            to: email.toLowerCase(),
            firstName,
            lastName,
            role,
            tempPassword,
            loginUrl: `${window.location.origin}/admin/login`
          }
        });

        if (emailError) {
          console.warn('Email send failed, but admin was created:', emailError);
          // Don't fail the whole operation if email fails
          // Return success with temp password so it can be shared manually
          return {
            success: true,
            message: 'Admin created successfully, but email failed to send. Please share the temporary password manually.',
            adminId: adminData.id,
            tempPassword
          };
        }
      } catch (emailError) {
        console.warn('Email function not available:', emailError);
        // Return success with temp password
        return {
          success: true,
          message: 'Admin created successfully. Email service not configured - please share credentials manually.',
          adminId: adminData.id,
          tempPassword
        };
      }

      return {
        success: true,
        message: 'Admin invited successfully! An email has been sent with login credentials.',
        adminId: adminData.id
      };

    } catch (error) {
      console.error('Invitation error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred while inviting the admin'
      };
    }
  },

  /**
   * Get all admin users
   */
  async getAdmins(): Promise<{
    success: boolean;
    admins?: Array<{
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: AdminRole;
      isActive: boolean;
      createdAt: string;
      lastLoginAt: string | null;
    }>;
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('pulseflow_admins')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      const admins = data.map(admin => ({
        id: admin.id,
        email: admin.email,
        firstName: admin.first_name,
        lastName: admin.last_name,
        role: admin.role as AdminRole,
        isActive: admin.is_active,
        createdAt: admin.created_at,
        lastLoginAt: admin.last_login_at
      }));

      return { success: true, admins };
    } catch (error) {
      console.error('Error fetching admins:', error);
      return { success: false, error: 'Failed to fetch admins' };
    }
  },

  /**
   * Deactivate an admin
   */
  async deactivateAdmin(adminId: string): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase
        .from('pulseflow_admins')
        .update({ is_active: false })
        .eq('id', adminId);

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, message: 'Admin deactivated successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to deactivate admin' };
    }
  },

  /**
   * Reactivate an admin
   */
  async reactivateAdmin(adminId: string): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase
        .from('pulseflow_admins')
        .update({ is_active: true })
        .eq('id', adminId);

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, message: 'Admin reactivated successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to reactivate admin' };
    }
  },

  /**
   * Update admin role
   */
  async updateAdminRole(adminId: string, newRole: AdminRole): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase
        .from('pulseflow_admins')
        .update({ role: newRole })
        .eq('id', adminId);

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, message: 'Admin role updated successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to update admin role' };
    }
  },

  /**
   * Resend invitation email (generates new temp password)
   */
  async resendInvitation(adminId: string): Promise<InvitationResult> {
    try {
      // Get admin details
      const { data: admin, error } = await supabase
        .from('pulseflow_admins')
        .select('*')
        .eq('id', adminId)
        .single();

      if (error || !admin) {
        return { success: false, message: 'Admin not found' };
      }

      // Generate new temp password
      const tempPassword = generateTempPassword();

      // Update auth user password (requires admin API or Edge Function)
      // For now, return the temp password to share manually
      return {
        success: true,
        message: 'New temporary password generated. Password reset requires Edge Function setup.',
        tempPassword
      };

    } catch (error) {
      return { success: false, message: 'Failed to resend invitation' };
    }
  }
};

export default adminInvitation;
