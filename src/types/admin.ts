// src/types/admin.ts
// Component 1: Admin Types & Interfaces
// Foundation types for the entire admin system

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt?: string;
  invitedBy?: string;
  invitationToken?: string;
  invitationExpiresAt?: string;
}

export interface AdminRole {
  id: string;
  name: 'super_admin' | 'admin' | 'viewer';
  permissions: AdminPermissions;
  description?: string;
}

export interface AdminPermissions {
  users: UserPermission[];
  admin: AdminPermission[];
  settings: SettingsPermission[];
}

// Granular permission types for precise control
export type UserPermission = 
  | 'users:view'
  | 'users:approve' 
  | 'users:reject'
  | 'users:suspend'
  | 'users:export'
  | 'users:bulk_actions';

export type AdminPermission = 
  | 'admin:view'
  | 'admin:create'
  | 'admin:update'
  | 'admin:delete'
  | 'admin:invite'
  | 'admin:deactivate';

export type SettingsPermission = 
  | 'settings:view'
  | 'settings:update'
  | 'settings:system_config'
  | 'settings:security';

// Customer user interface for admin management
export interface CustomerUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  organizationType?: string;
  teamSizeOrClients?: string;
  primaryRole?: string;
  mainChallenge?: string;
  otherChallenge?: string;
  status: CustomerStatus;
  registeredAt: string;
  approvedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
  lastLoginAt?: string;
  authUserId?: string; // Links to Supabase auth.users
}

export type CustomerStatus = 
  | 'pending' 
  | 'approved' 
  | 'rejected' 
  | 'suspended'
  | 'active'
  | 'inactive';

// Admin authentication related types
export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminAuthResponse {
  success: boolean;
  user?: AdminUser;
  error?: string;
  token?: string;
}

export interface AdminInvitation {
  id: string;
  email: string;
  role: AdminRole['name'];
  invitedBy: string;
  invitationToken: string;
  expiresAt: string;
  isUsed: boolean;
  createdAt: string;
}

// Admin dashboard data types
export interface AdminDashboardStats {
  totalCustomers: number;
  pendingApprovals: number;
  activeCustomers: number;
  suspendedCustomers: number;
  totalAdminUsers: number;
  recentRegistrations: CustomerUser[];
  pendingUsers: CustomerUser[];
}

// Audit trail for admin actions
export interface AdminAuditLog {
  id: string;
  adminUserId: string;
  adminEmail: string;
  action: AdminAction;
  targetType: 'customer_user' | 'admin_user' | 'settings';
  targetId: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export type AdminAction = 
  | 'user_approved'
  | 'user_rejected' 
  | 'user_suspended'
  | 'user_reactivated'
  | 'admin_invited'
  | 'admin_created'
  | 'admin_deactivated'
  | 'settings_updated'
  | 'login_success'
  | 'login_failed'
  | 'password_changed';

// API response types for admin operations
export interface AdminApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Filter and pagination types for admin tables
export interface AdminTableFilters {
  status?: CustomerStatus[];
  role?: AdminRole['name'][];
  dateRange?: {
    from: string;
    to: string;
  };
  search?: string;
}

export interface AdminPaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AdminTableResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form types for admin operations
export interface CustomerApprovalForm {
  userId: string;
  action: 'approve' | 'reject';
  reason?: string;
  notes?: string;
}

export interface AdminInviteForm {
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole['name'];
  sendEmail: boolean;
  customMessage?: string;
}

// Constants for admin system
export const ADMIN_ROLES = {
  SUPER_ADMIN: 'super_admin' as const,
  ADMIN: 'admin' as const,
  VIEWER: 'viewer' as const
} as const;

export const CUSTOMER_STATUSES = {
  PENDING: 'pending' as const,
  APPROVED: 'approved' as const,
  REJECTED: 'rejected' as const,
  SUSPENDED: 'suspended' as const,
  ACTIVE: 'active' as const,
  INACTIVE: 'inactive' as const
} as const;

// Permission constants for easy reference
export const PERMISSIONS = {
  USERS: {
    VIEW: 'users:view' as const,
    APPROVE: 'users:approve' as const,
    REJECT: 'users:reject' as const,
    SUSPEND: 'users:suspend' as const,
    EXPORT: 'users:export' as const,
    BULK_ACTIONS: 'users:bulk_actions' as const
  },
  ADMIN: {
    VIEW: 'admin:view' as const,
    CREATE: 'admin:create' as const,
    UPDATE: 'admin:update' as const,
    DELETE: 'admin:delete' as const,
    INVITE: 'admin:invite' as const,
    DEACTIVATE: 'admin:deactivate' as const
  },
  SETTINGS: {
    VIEW: 'settings:view' as const,
    UPDATE: 'settings:update' as const,
    SYSTEM_CONFIG: 'settings:system_config' as const,
    SECURITY: 'settings:security' as const
  }
} as const;

// Default role permissions - used for role creation and validation
export const DEFAULT_ROLE_PERMISSIONS: Record<AdminRole['name'], AdminPermissions> = {
  super_admin: {
    users: [
      PERMISSIONS.USERS.VIEW,
      PERMISSIONS.USERS.APPROVE,
      PERMISSIONS.USERS.REJECT,
      PERMISSIONS.USERS.SUSPEND,
      PERMISSIONS.USERS.EXPORT,
      PERMISSIONS.USERS.BULK_ACTIONS
    ],
    admin: [
      PERMISSIONS.ADMIN.VIEW,
      PERMISSIONS.ADMIN.CREATE,
      PERMISSIONS.ADMIN.UPDATE,
      PERMISSIONS.ADMIN.DELETE,
      PERMISSIONS.ADMIN.INVITE,
      PERMISSIONS.ADMIN.DEACTIVATE
    ],
    settings: [
      PERMISSIONS.SETTINGS.VIEW,
      PERMISSIONS.SETTINGS.UPDATE,
      PERMISSIONS.SETTINGS.SYSTEM_CONFIG,
      PERMISSIONS.SETTINGS.SECURITY
    ]
  },
  admin: {
    users: [
      PERMISSIONS.USERS.VIEW,
      PERMISSIONS.USERS.APPROVE,
      PERMISSIONS.USERS.REJECT,
      PERMISSIONS.USERS.SUSPEND
    ],
    admin: [
      PERMISSIONS.ADMIN.VIEW
    ],
    settings: [
      PERMISSIONS.SETTINGS.VIEW
    ]
  },
  viewer: {
    users: [
      PERMISSIONS.USERS.VIEW
    ],
    admin: [
      PERMISSIONS.ADMIN.VIEW
    ],
    settings: [
      PERMISSIONS.SETTINGS.VIEW
    ]
  }
};

// Utility type for checking permissions
export type RequiredPermission = UserPermission | AdminPermission | SettingsPermission;
