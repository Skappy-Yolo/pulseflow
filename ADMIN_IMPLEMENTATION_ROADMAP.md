# 🔧 Admin System Implementation Roadmap

## 📚 Component Creation Order (Follow This Sequence)

### **Phase 1: Foundation (Components 1-3)**

#### **1. Admin Types & Interfaces**
```typescript
// src/types/admin.ts
export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export interface AdminRole {
  id: string;
  name: 'super_admin' | 'admin' | 'viewer';
  permissions: {
    users: string[];
    admin: string[];
    settings: string[];
  };
}

export interface CustomerUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  registeredAt: string;
}
```

#### **2. Admin Authentication Service**
```typescript
// src/lib/admin-auth.ts
import { supabase } from './supabase';

export class AdminAuthService {
  async loginAdmin(email: string, password: string) {
    // Admin-specific login logic
  }
  
  async getAdminProfile() {
    // Get current admin user profile
  }
  
  async hasPermission(resource: string, action: string) {
    // Check admin permissions
  }
}
```

#### **3. Admin Login Component**
```typescript
// src/components/admin/auth/AdminLogin.tsx
import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  // Simple, clean admin login form
  // Dark theme, different from customer login
  // Admin-specific branding
};
```

### **Phase 2: Layout & Navigation (Components 4-6)**

#### **4. Admin Layout Component**
```typescript
// src/components/admin/layout/AdminLayout.tsx
export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sidebar navigation
  // Header with admin profile
  // Main content area
};
```

#### **5. Admin Sidebar Component**
```typescript
// src/components/admin/layout/AdminSidebar.tsx
export const AdminSidebar: React.FC = () => {
  // Navigation links based on permissions
  // Dashboard, Users, Settings sections
};
```

#### **6. Admin Protected Route**
```typescript
// src/components/admin/layout/AdminProtectedRoute.tsx
export const AdminProtectedRoute: React.FC<{ children: React.ReactNode; requiredPermissions?: string[] }> = ({ children, requiredPermissions }) => {
  // Check admin authentication
  // Verify permissions
  // Redirect to admin login if needed
};
```

### **Phase 3: Core Features (Components 7-10)**

#### **7. Admin Dashboard**
```typescript
// src/components/admin/dashboard/AdminDashboard.tsx
export const AdminDashboard: React.FC = () => {
  // Overview stats
  // Recent customer registrations
  // Pending approvals count
  // Quick actions
};
```

#### **8. Customer User Management**
```typescript
// src/components/admin/dashboard/CustomerUserManagement.tsx
export const CustomerUserManagement: React.FC = () => {
  // Table of all customer users
  // Approve/reject actions
  // Search and filter
  // Bulk operations
};
```

#### **9. Admin User Management**
```typescript
// src/components/admin/dashboard/AdminUserManagement.tsx
export const AdminUserManagement: React.FC = () => {
  // Manage admin users
  // Invite new admins
  // Role assignments
  // Deactivate admins
};
```

#### **10. User Detail Modal**
```typescript
// src/components/admin/dashboard/UserDetailModal.tsx
export const UserDetailModal: React.FC<{ user: CustomerUser; onClose: () => void }> = ({ user, onClose }) => {
  // View customer user details
  // Registration form data
  // Approval/rejection actions
  // Add notes/comments
};
```

## 🗄️ Database Setup Script

```sql
-- Run this in Supabase SQL Editor
-- Create admin_users table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  invited_by UUID REFERENCES admin_users(id),
  invitation_token VARCHAR(255),
  invitation_expires_at TIMESTAMPTZ,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create customer_users table for admin management
CREATE TABLE customer_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID, -- Links to Supabase auth.users
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company VARCHAR(255),
  organization_type VARCHAR(100),
  team_size_or_clients VARCHAR(50),
  primary_role VARCHAR(100),
  main_challenge VARCHAR(255),
  other_challenge TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'suspended'
  approved_by UUID REFERENCES admin_users(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create first super admin (replace with your email)
INSERT INTO admin_users (email, password_hash, role, first_name, last_name) 
VALUES ('your-email@company.com', 'temp-hash', 'super_admin', 'Your', 'Name');

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_users ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (expand as needed)
CREATE POLICY "Admins can view customer users" ON customer_users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );
```

## 🎨 Admin UI Theme Configuration

```typescript
// src/styles/admin-theme.ts
export const adminTheme = {
  colors: {
    primary: '#4338ca',
    primaryHover: '#3730a3',
    secondary: '#6366f1',
    background: '#f8fafc',
    sidebar: '#1e293b',
    sidebarHover: '#334155',
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
      light: '#94a3b8'
    },
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444'
  },
  spacing: {
    sidebar: '280px',
    header: '64px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  }
};
```

## 📋 Component Props Reference

### **AdminLogin Props**
```typescript
interface AdminLoginProps {
  onLoginSuccess: () => void;
  redirectTo?: string;
}
```

### **AdminDashboard Props**
```typescript
interface AdminDashboardProps {
  adminUser: AdminUser;
}
```

### **CustomerUserManagement Props**
```typescript
interface CustomerUserManagementProps {
  adminUser: AdminUser;
  onUserAction: (userId: string, action: string) => void;
}
```

## 🔐 Permission System Implementation

```typescript
// src/lib/admin-permissions.ts
export const PERMISSIONS = {
  USERS: {
    VIEW: 'users:view',
    APPROVE: 'users:approve',
    REJECT: 'users:reject',
    SUSPEND: 'users:suspend'
  },
  ADMIN: {
    VIEW: 'admin:view',
    CREATE: 'admin:create',
    UPDATE: 'admin:update',
    DELETE: 'admin:delete'
  },
  SETTINGS: {
    VIEW: 'settings:view',
    UPDATE: 'settings:update'
  }
} as const;

export const ROLE_PERMISSIONS = {
  super_admin: Object.values(PERMISSIONS).flatMap(p => Object.values(p)),
  admin: [
    PERMISSIONS.USERS.VIEW,
    PERMISSIONS.USERS.APPROVE,
    PERMISSIONS.USERS.REJECT,
    PERMISSIONS.ADMIN.VIEW
  ],
  viewer: [
    PERMISSIONS.USERS.VIEW,
    PERMISSIONS.ADMIN.VIEW
  ]
};
```

## 🧪 Testing Checklist

### **Before Each Component:**
- [ ] Customer pages still work perfectly
- [ ] No modifications to existing auth system
- [ ] Admin routes are completely separate
- [ ] Permissions properly checked

### **After Each Phase:**
- [ ] All admin features work as expected
- [ ] Security is properly implemented
- [ ] UI matches admin design system
- [ ] Database queries are optimized

### **Final Testing:**
- [ ] Super admin can manage everything
- [ ] Regular admin has limited permissions
- [ ] Viewer can only view (no actions)
- [ ] Customer registration still works
- [ ] Customer login still works

## 🚀 Deployment Strategy

### **Development:**
1. Build admin system locally
2. Test with local Supabase
3. Verify customer pages untouched

### **Staging:**
1. Create admin tables in production Supabase
2. Deploy admin system alongside existing app
3. Test admin functionality

### **Production:**
1. Create first super admin account
2. Invite additional admin users
3. Begin customer user management

---

## 📞 Claude.ai Workflow

### **Upload to Claude:**
1. This roadmap document
2. Current project structure
3. Existing component examples (for style reference)

### **Request Format:**
"Create Component X from the roadmap, following the exact specifications and maintaining separation from existing customer code."

### **Verification:**
- Each component should be completely self-contained
- No imports from existing customer auth components
- Proper TypeScript interfaces
- Admin theme consistency
