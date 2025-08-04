// src/lib/admin-auth.ts
// Component 2: Admin Authentication Service
// Handles admin login, permissions, and session management
// COMPLETELY SEPARATE from customer authentication

import { supabase } from './supabase';
import type { 
  AdminUser, 
  AdminLoginCredentials, 
  AdminAuthResponse, 
  AdminAuditLog,
  RequiredPermission,
  CustomerUser,
  AdminTableResponse,
  AdminPaginationParams,
  AdminTableFilters,
  AdminPermissions
} from '../types/admin';
import { PERMISSIONS } from '../types/admin';

// Admin session key - different from customer session
const ADMIN_SESSION_KEY = 'pulse_admin_session';
const ADMIN_TOKEN_KEY = 'pulse_admin_token';

export class AdminAuthService {
  private static instance: AdminAuthService;
  private currentAdmin: AdminUser | null = null;

  private constructor() {
    // Initialize admin session from localStorage on instantiation
    this.initializeSession();
  }

  public static getInstance(): AdminAuthService {
    if (!AdminAuthService.instance) {
      AdminAuthService.instance = new AdminAuthService();
    }
    return AdminAuthService.instance;
  }

  /**
   * Initialize admin session from stored data
   */
  private initializeSession(): void {
    try {
      const storedSession = localStorage.getItem(ADMIN_SESSION_KEY);
      if (storedSession) {
        const adminData = JSON.parse(storedSession);
        // Verify session is still valid (basic check)
        if (adminData.isActive && new Date(adminData.sessionExpiry) > new Date()) {
          this.currentAdmin = adminData;
        } else {
          this.clearSession();
        }
      }
    } catch (error) {
      console.error('Error initializing admin session:', error);
      this.clearSession();
    }
  }

  /**
   * Admin login - separate from customer login
   */
  async loginAdmin(credentials: AdminLoginCredentials): Promise<AdminAuthResponse> {
    try {
      console.log('🔍 Step 1: Attempting Supabase auth with:', credentials.email);
      // Step 1: Authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (authError || !authData.user) {
        console.log('❌ Step 1 failed:', authError);
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      console.log('✅ Step 1 success: Supabase auth worked');
      console.log('🔍 Auth user ID:', authData.user.id);

      // Step 2: Get admin user data from our admin_users table
      console.log('🔍 Step 2: Looking up admin user in admin_users table...');
      const { data: adminData, error: queryError } = await supabase
        .from('admin_users')
        .select(`
          id,
          auth_user_id,
          email,
          first_name,
          last_name,
          role,
          is_active,
          needs_password_reset,
          created_at,
          last_login_at
        `)
        .eq('auth_user_id', authData.user.id)
        .eq('is_active', true);

      console.log('🔍 Admin query result:', { adminData, queryError });
      console.log('🔍 Looking for auth_user_id:', authData.user.id);

      if (queryError) {
        console.log('❌ Database query error:', queryError);
        await supabase.auth.signOut();
        return {
          success: false,
          error: 'Database error occurred'
        };
      }

      if (!adminData || adminData.length === 0) {
        console.log('❌ No admin record found for auth_user_id:', authData.user.id);
        console.log('🔍 Let me check if the record exists with different criteria...');
        // Additional check: look by email instead
        const { data: emailCheck } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', credentials.email);
        console.log('🔍 Admin record by email:', emailCheck);
        await supabase.auth.signOut();
        return {
          success: false,
          error: 'You do not have admin access to this system'
        };
      }

      const adminRecord = adminData[0];
      console.log('✅ Step 2 success: Found admin record:', adminRecord);

      // Step 3: Check if password reset is required
      if (adminRecord.needs_password_reset) {
        console.log('⚠️ Password reset required');
        return {
          success: false,
          error: 'Password reset required. Please contact your administrator.'
        };
      }

      // Step 4: Create admin user object
      const adminUser: AdminUser = {
        id: adminRecord.id,
        email: adminRecord.email,
        firstName: adminRecord.first_name || '',
        lastName: adminRecord.last_name || '',
        role: {
          id: adminRecord.role,
          name: adminRecord.role as any,
          permissions: this.getPermissionsForRole(adminRecord.role)
        },
        isActive: adminRecord.is_active,
        lastLoginAt: adminRecord.last_login_at,
        createdAt: adminRecord.created_at
      };

      console.log('✅ Created admin user object:', adminUser);

      // Store session
      const sessionExpiry = new Date();
      sessionExpiry.setHours(sessionExpiry.getHours() + 24);
      const sessionData = {
        ...adminUser,
        sessionExpiry: sessionExpiry.toISOString()
      };
      localStorage.setItem('pulse_admin_session', JSON.stringify(sessionData));
      this.currentAdmin = adminUser;

      console.log('✅ Login successful!');

      return {
        success: true,
        user: adminUser,
        token: authData.session?.access_token
      };

    } catch (error) {
      console.error('💥 Login error:', error);
      return {
        success: false,
        error: 'Login failed. Please try again.'
      };
    }
  }

  /**
   * Get current admin user
   */
  getCurrentAdmin(): AdminUser | null {
    try {
      const storedSession = localStorage.getItem(ADMIN_SESSION_KEY);
      if (!storedSession) return null;
      const adminData = JSON.parse(storedSession);
      if (adminData.isActive && new Date(adminData.sessionExpiry) > new Date()) {
        return adminData;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if user is authenticated as admin
   */
  isAdminAuthenticated(): boolean {
    return this.currentAdmin !== null && this.currentAdmin.isActive;
  }

  /**
   * Check if admin has specific permission
   */
  hasPermission(permission: RequiredPermission): boolean {
    if (!this.currentAdmin) return false;

    const { role } = this.currentAdmin;
    const [resource] = permission.split(':') as [string, string];

    switch (resource) {
      case 'users':
        return role.permissions.users.includes(permission as any);
      case 'admin':
        return role.permissions.admin.includes(permission as any);
      case 'settings':
        return role.permissions.settings.includes(permission as any);
      default:
        return false;
    }
  }

  /**
   * Check if admin has any of the required permissions
   */
  hasAnyPermission(permissions: RequiredPermission[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  /**
   * Check if admin has all required permissions
   */
  hasAllPermissions(permissions: RequiredPermission[]): boolean {
    return permissions.every(permission => this.hasPermission(permission));
  }

  /**
   * Logout admin user
   */
  async logoutAdmin(): Promise<void> {
    try {
      if (this.currentAdmin) {
        await this.logAdminAction('logout', 'admin_user', this.currentAdmin.id, {
          email: this.currentAdmin.email
        });
      }

      // Sign out from Supabase auth
      await supabase.auth.signOut();
      
      // Clear admin session
      this.clearSession();

    } catch (error) {
      console.error('Admin logout error:', error);
      // Still clear session even if logging fails
      this.clearSession();
    }
  }

  /**
   * Clear admin session data
   */
  private clearSession(): void {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    this.currentAdmin = null;
  }

  /**
   * Get all customer users (for admin management)
   */
  async getCustomerUsers(
    filters: AdminTableFilters = {},
    pagination: AdminPaginationParams = { page: 1, limit: 50 }
  ): Promise<AdminTableResponse<CustomerUser>> {
    if (!this.hasPermission(PERMISSIONS.USERS.VIEW)) {
      throw new Error('Insufficient permissions to view users');
    }

    try {
      let query = supabase
        .from('customer_users')
        .select('*', { count: 'exact' });

      // Apply filters
      if (filters.status?.length) {
        query = query.in('status', filters.status);
      }

      if (filters.search) {
        query = query.or(`email.ilike.%${filters.search}%,first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%`);
      }

      if (filters.dateRange) {
        query = query
          .gte('created_at', filters.dateRange.from)
          .lte('created_at', filters.dateRange.to);
      }

      // Apply pagination and sorting
      const from = (pagination.page - 1) * pagination.limit;
      const to = from + pagination.limit - 1;

      if (pagination.sortBy) {
        const ascending = pagination.sortOrder === 'asc';
        query = query.order(pagination.sortBy, { ascending });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: data || [],
        total: count || 0,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: Math.ceil((count || 0) / pagination.limit)
      };

    } catch (error) {
      console.error('Error fetching customer users:', error);
      throw error;
    }
  }

  /**
   * Approve customer user
   */
  async approveCustomerUser(userId: string, reason?: string): Promise<boolean> {
    if (!this.hasPermission(PERMISSIONS.USERS.APPROVE)) {
      throw new Error('Insufficient permissions to approve users');
    }

    try {
      const { error } = await supabase
        .from('customer_users')
        .update({
          status: 'approved',
          approved_by: this.currentAdmin!.id,
          approved_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;

      await this.logAdminAction('user_approved', 'customer_user', userId, {
        reason,
        approved_by: this.currentAdmin!.email
      });

      return true;
    } catch (error) {
      console.error('Error approving user:', error);
      return false;
    }
  }

  /**
   * Reject customer user
   */
  async rejectCustomerUser(userId: string, reason: string): Promise<boolean> {
    if (!this.hasPermission(PERMISSIONS.USERS.REJECT)) {
      throw new Error('Insufficient permissions to reject users');
    }

    try {
      const { error } = await supabase
        .from('customer_users')
        .update({
          status: 'rejected',
          rejection_reason: reason,
          approved_by: this.currentAdmin!.id,
          approved_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;

      await this.logAdminAction('user_rejected', 'customer_user', userId, {
        reason,
        rejected_by: this.currentAdmin!.email
      });

      return true;
    } catch (error) {
      console.error('Error rejecting user:', error);
      return false;
    }
  }

  /**
   * Suspend customer user
   */
  async suspendCustomerUser(userId: string, reason: string): Promise<boolean> {
    if (!this.hasPermission(PERMISSIONS.USERS.SUSPEND)) {
      throw new Error('Insufficient permissions to suspend users');
    }

    try {
      const { error } = await supabase
        .from('customer_users')
        .update({ status: 'suspended' })
        .eq('id', userId);

      if (error) throw error;

      await this.logAdminAction('user_suspended', 'customer_user', userId, {
        reason,
        suspended_by: this.currentAdmin!.email
      });

      return true;
    } catch (error) {
      console.error('Error suspending user:', error);
      return false;
    }
  }

  /**
   * Log admin action for audit trail
   */
  private async logAdminAction(
    action: string,
    targetType: string,
    targetId: string,
    details: Record<string, any> = {}
  ): Promise<void> {
    try {
      const auditLog: Partial<AdminAuditLog> = {
        adminUserId: this.currentAdmin?.id || 'system',
        adminEmail: this.currentAdmin?.email || 'system',
        action: action as any,
        targetType: targetType as any,
        targetId,
        details,
        createdAt: new Date().toISOString()
      };

      await supabase
        .from('admin_audit_logs')
        .insert(auditLog);

    } catch (error) {
      console.error('Error logging admin action:', error);
      // Don't throw - audit logging shouldn't break operations
    }
  }

  /**
   * Get admin dashboard stats
   */
  async getDashboardStats() {
    if (!this.hasPermission(PERMISSIONS.USERS.VIEW)) {
      throw new Error('Insufficient permissions to view dashboard');
    }

    try {
      // Get customer user counts by status
      const { data: statusCounts } = await supabase
        .from('customer_users')
        .select('status')
        .then(({ data }) => {
          const counts = {
            total: data?.length || 0,
            pending: data?.filter(u => u.status === 'pending').length || 0,
            approved: data?.filter(u => u.status === 'approved').length || 0,
            rejected: data?.filter(u => u.status === 'rejected').length || 0,
            suspended: data?.filter(u => u.status === 'suspended').length || 0
          };
          return { data: counts };
        });

      // Get recent registrations (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: recentUsers } = await supabase
        .from('customer_users')
        .select('*')
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(10);

      // Get pending users for quick actions
      const { data: pendingUsers } = await supabase
        .from('customer_users')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(5);

      return {
        totalCustomers: statusCounts?.total || 0,
        pendingApprovals: statusCounts?.pending || 0,
        activeCustomers: statusCounts?.approved || 0,
        suspendedCustomers: statusCounts?.suspended || 0,
        totalAdminUsers: 0, // TODO: Implement admin user count
        recentRegistrations: recentUsers || [],
        pendingUsers: pendingUsers || []
      };

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  /**
   * Get permissions for role - helper method
   */
  private getPermissionsForRole(role: string): AdminPermissions {
    switch (role) {
      case 'super_admin':
        return {
          users: ['users:view', 'users:approve', 'users:reject', 'users:suspend', 'users:export', 'users:bulk_actions'],
          admin: ['admin:view', 'admin:create', 'admin:update', 'admin:delete', 'admin:invite', 'admin:deactivate'],
          settings: ['settings:view', 'settings:update', 'settings:system_config', 'settings:security']
        };
      case 'admin':
        return {
          users: ['users:view', 'users:approve', 'users:reject', 'users:suspend'],
          admin: ['admin:view'],
          settings: ['settings:view']
        };
      case 'viewer':
        return {
          users: ['users:view'],
          admin: ['admin:view'],
          settings: ['settings:view']
        };
      default:
        return {
          users: [],
          admin: [],
          settings: []
        };
    }
  }
}

// Export singleton instance
export const adminAuth = AdminAuthService.getInstance();

// Utility functions for common admin operations
export const AdminUtils = {
  /**
   * Check if current user can perform action
   */
  canPerform: (permission: RequiredPermission): boolean => {
    return adminAuth.hasPermission(permission);
  },

  /**
   * Get current admin user safely
   */
  getCurrentAdmin: (): AdminUser | null => {
    return adminAuth.getCurrentAdmin();
  },

  /**
   * Require admin authentication
   */
  requireAuth: (): AdminUser => {
    const admin = adminAuth.getCurrentAdmin();
    if (!admin) {
      throw new Error('Admin authentication required');
    }
    return admin;
  },

  /**
   * Require specific permission
   */
  requirePermission: (permission: RequiredPermission): void => {
    if (!adminAuth.hasPermission(permission)) {
      throw new Error(`Permission required: ${permission}`);
    }
  }
};