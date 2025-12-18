# PULSEFLOW COMPLETE IMPLEMENTATION GUIDE

## 📋 Overview

This guide walks you through integrating the new multi-tenant authentication system into your existing Pulseflow application. Follow these steps **in order** to ensure a smooth transition.

---

## ⚠️ BEFORE YOU BEGIN

**Critical Prerequisites:**
- ✅ Backup your Supabase database
- ✅ No active users (confirmed by you)
- ✅ Git commit all current changes
- ✅ Test locally before deploying to production

---

## 🗂️ FILE STRUCTURE

After implementing, your project structure will look like:

```
pulseflow/
├── src/
│   ├── lib/
│   │   ├── supabase.ts (existing)
│   │   ├── admin-auth-service.ts (NEW)
│   │   └── customer-auth-service.ts (NEW)
│   ├── types/
│   │   ├── pulseflow.ts (NEW)
│   │   └── index.ts (existing)
│   ├── contexts/
│   │   ├── AuthContext.tsx (UPDATE)
│   │   ├── AdminAuthContext.tsx (NEW)
│   │   └── CustomerAuthContext.tsx (NEW)
│   ├── components/
│   │   ├── auth/ (existing - keep as-is)
│   │   ├── admin/ (NEW)
│   │   │   ├── auth/
│   │   │   │   └── AdminLogin.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── CustomerManagement.tsx
│   │   │   │   └── RegistrationQueue.tsx
│   │   │   └── layout/
│   │   │       ├── AdminLayout.tsx
│   │   │       └── AdminSidebar.tsx
│   │   └── customer/ (NEW)
│   │       ├── dashboard/
│   │       │   ├── CustomerDashboard.tsx
│   │       │   └── MemberManagement.tsx
│   │       └── layout/
│   │           └── CustomerLayout.tsx
│   └── pages/ or routes/ (depending on your setup)
│       ├── admin/
│       │   ├── login.tsx
│       │   ├── dashboard.tsx
│       │   └── customers.tsx
│       └── customer/
│           ├── login.tsx
│           └── dashboard.tsx
├── database/
│   ├── pulseflow-complete-schema.sql (NEW)
│   └── pulseflow-migration.sql (NEW)
└── docs/
    ├── pulseflow-implementation-guide.md (THIS FILE)
    ├── pulseflow-testing-guide.md
    └── pulseflow-typescript-types.ts
```

---

## 🚀 STEP-BY-STEP IMPLEMENTATION

### **PHASE 1: DATABASE SETUP (1-2 hours)**

#### **Step 1.1: Backup Existing Data**

```sql
-- Run in Supabase SQL Editor
CREATE TABLE old_user_profiles_backup AS 
SELECT * FROM public.user_profiles;
```

#### **Step 1.2: Run Complete Schema**

1. Open Supabase Dashboard → SQL Editor
2. Copy entire contents of `pulseflow-complete-schema.sql`
3. Click "Run"
4. Wait for "Schema created successfully!" message

**Expected Result:** 11 new tables created

#### **Step 1.3: Run Migration Script**

1. Copy entire contents of `pulseflow-migration.sql`
2. Paste in SQL Editor
3. Click "Run"

**Expected Result:** Migration complete message with next steps

#### **Step 1.4: Create Your Admin User**

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add user"
3. Fill in:
   - Email: `your-email@nolum.be`
   - Password: (create secure password)
   - Auto Confirm User: ✅ CHECK THIS BOX
4. Click "Create user"
5. **COPY THE USER ID** (UUID)

6. Run this SQL (replace values):

```sql
-- Replace auth_user_id with UUID from step 5
INSERT INTO pulseflow_admins (
  auth_user_id,
  email,
  first_name,
  last_name,
  role,
  is_active
)
VALUES (
  'PASTE-UUID-HERE',
  'your-email@nolum.be',
  'Your First Name',
  'Your Last Name',
  'super_admin',
  true
);
```

7. Repeat for your boss

#### **Step 1.5: Verify Database**

```sql
SELECT * FROM pulseflow_admins;
-- Should show your admin user(s)

SELECT * FROM customer_organizations;
-- Should be empty (no customers yet)
```

---

### **PHASE 2: TYPESCRIPT TYPES (30 minutes)**

#### **Step 2.1: Add Type Definitions**

1. Create file: `src/types/pulseflow.ts`
2. Copy contents from `pulseflow-typescript-types.ts`
3. Save

#### **Step 2.2: Update Supabase Types**

Update `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export types
export type { 
  PulseflowAdmin,
  CustomerOrganization,
  OrganizationMember,
  UserProfile,
} from '../types/pulseflow';
```

---

### **PHASE 3: AUTHENTICATION SERVICES (1 hour)**

#### **Step 3.1: Add Admin Auth Service**

1. Create file: `src/lib/admin-auth-service.ts`
2. Copy contents from `pulseflow-admin-auth-service.ts`
3. Save

#### **Step 3.2: Add Customer Auth Service**

1. Create file: `src/lib/customer-auth-service.ts`
2. Copy contents from `pulseflow-customer-auth-service.ts`
3. Save

#### **Step 3.3: Test Services**

Create test file: `src/lib/__tests__/auth-services.test.ts`

```typescript
import { PulseflowAdminAuthService } from '../admin-auth-service';
import { CustomerAuthService } from '../customer-auth-service';

// Test admin login
async function testAdminLogin() {
  const result = await PulseflowAdminAuthService.loginAdmin({
    email: 'your-email@nolum.be',
    password: 'your-password',
  });
  
  console.log('Admin login result:', result);
}

testAdminLogin();
```

---

### **PHASE 4: AUTHENTICATION CONTEXTS (1-2 hours)**

#### **Step 4.1: Create Admin Auth Context**

Create `src/contexts/AdminAuthContext.tsx`:

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PulseflowAdminAuthService } from '../lib/admin-auth-service';
import type { PulseflowAdmin } from '../types/pulseflow';

interface AdminAuthContextType {
  admin: PulseflowAdmin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<PulseflowAdmin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const currentAdmin = await PulseflowAdminAuthService.getCurrentAdmin();
    setAdmin(currentAdmin);
    setLoading(false);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const result = await PulseflowAdminAuthService.loginAdmin({ email, password });
    
    if (result.success && result.admin) {
      setAdmin(result.admin);
      return true;
    }
    
    return false;
  };

  const logout = async () => {
    await PulseflowAdminAuthService.logoutAdmin();
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
```

#### **Step 4.2: Create Customer Auth Context**

Create `src/contexts/CustomerAuthContext.tsx`:

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerAuthService } from '../lib/customer-auth-service';
import type { OrganizationMember, CustomerOrganization } from '../types/pulseflow';

interface CustomerAuthContextType {
  member: OrganizationMember | null;
  organization: CustomerOrganization | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export const CustomerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [member, setMember] = useState<OrganizationMember | null>(null);
  const [organization, setOrganization] = useState<CustomerOrganization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const currentMember = await CustomerAuthService.getCurrentMember();
    setMember(currentMember);
    if (currentMember) {
      // Organization is included in member query
      setOrganization(currentMember.organization);
    }
    setLoading(false);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const result = await CustomerAuthService.loginCustomer(email, password);
    
    if (result.success && result.member) {
      setMember(result.member);
      setOrganization(result.organization || null);
      return true;
    }
    
    return false;
  };

  const logout = async () => {
    await CustomerAuthService.logoutCustomer();
    setMember(null);
    setOrganization(null);
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        member,
        organization,
        loading,
        login,
        logout,
        isAuthenticated: !!member,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error('useCustomerAuth must be used within CustomerAuthProvider');
  }
  return context;
};
```

#### **Step 4.3: Update App.tsx to Wrap with Providers**

```typescript
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { CustomerAuthProvider } from './contexts/CustomerAuthContext';

function App() {
  return (
    <AdminAuthProvider>
      <CustomerAuthProvider>
        {/* Your existing app content */}
      </CustomerAuthProvider>
    </AdminAuthProvider>
  );
}
```

---

### **PHASE 5: ADMIN COMPONENTS (3-4 hours)**

#### **Step 5.1: Create Admin Login**

Create `src/components/admin/auth/AdminLogin.tsx`:

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../../contexts/AdminAuthContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Pulseflow Admin</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your admin account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};
```

#### **Step 5.2: Create Admin Dashboard**

Create `src/components/admin/dashboard/AdminDashboard.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '../../../contexts/AdminAuthContext';
import { PulseflowAdminAuthService } from '../../../lib/admin-auth-service';
import type { DashboardStats } from '../../../types/pulseflow';

export const AdminDashboard: React.FC = () => {
  const { admin } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const dashboardStats = await PulseflowAdminAuthService.getDashboardStats();
    setStats(dashboardStats);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Welcome, {admin?.first_name}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Organizations</h3>
          <p className="text-3xl font-bold mt-2">{stats?.total_organizations}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Active Organizations</h3>
          <p className="text-3xl font-bold mt-2">{stats?.active_organizations}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Pending Approvals</h3>
          <p className="text-3xl font-bold mt-2">{stats?.pending_approvals}</p>
        </div>
      </div>
    </div>
  );
};
```

#### **Step 5.3: Add Admin Routes**

Update your router configuration:

```typescript
import { AdminLogin } from './components/admin/auth/AdminLogin';
import { AdminDashboard } from './components/admin/dashboard/AdminDashboard';

// In your routes:
{
  path: '/admin',
  children: [
    {
      path: 'login',
      element: <AdminLogin />,
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedAdminRoute>
          <AdminDashboard />
        </ProtectedAdminRoute>
      ),
    },
  ],
}
```

---

### **PHASE 6: CUSTOMER COMPONENTS (2-3 hours)**

#### **Step 6.1: Update Customer Registration**

Update `src/components/auth/PulseFlowAuth.tsx` to use new service:

```typescript
import { CustomerAuthService } from '../../lib/customer-auth-service';

// In your signup handler:
const handleSignup = async (formData) => {
  const result = await CustomerAuthService.registerCustomer({
    email: formData.workEmail,
    first_name: formData.firstName,
    last_name: formData.lastName,
    company: formData.company,
    organization_type: formData.organizationType,
    team_size_or_clients: formData.teamSize,
    primary_role: formData.role,
    main_challenge: formData.challenge,
    demo_requested: formData.demoRequested,
  });

  if (result.success) {
    // Show success message
    setMessage(result.message);
  } else {
    setError(result.error);
  }
};
```

---

### **PHASE 7: TESTING (2 hours)**

See `pulseflow-testing-guide.md` for comprehensive testing procedures.

---

## 🔧 CONFIGURATION CHECKLIST

### **Environment Variables**

Verify these are set in `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Supabase Configuration**

1. ✅ Database tables created
2. ✅ RLS policies enabled
3. ✅ Admin users created
4. ✅ Email templates configured (optional)

### **Application Configuration**

1. ✅ TypeScript types added
2. ✅ Authentication services added
3. ✅ Auth contexts created
4. ✅ Components created
5. ✅ Routes configured

---

## 🚨 TROUBLESHOOTING

### **Issue: "Admin not found" after login**

**Solution:** Check pulseflow_admins table:

```sql
SELECT * FROM pulseflow_admins WHERE email = 'your-email@nolum.be';
```

If empty, run the INSERT statement from Step 1.4 again.

### **Issue: RLS policy errors**

**Solution:** Verify RLS policies are created:

```sql
SELECT * FROM pg_policies WHERE tablename = 'pulseflow_admins';
```

Should show 2 policies. If not, re-run the schema script.

### **Issue: Customer registration not working**

**Solution:** Check registration queue:

```sql
SELECT * FROM customer_registration_queue ORDER BY created_at DESC LIMIT 5;
```

Should show recent registrations. If not, check browser console for errors.

---

## 📚 NEXT STEPS

After successful implementation:

1. **Test everything** (use testing guide)
2. **Create more admin users** (invite your boss)
3. **Test customer approval flow**
4. **Configure email templates** (for welcome emails, invitations)
5. **Set up SSO** (if needed immediately)
6. **Deploy to production**

---

## 📞 SUPPORT

If you encounter issues:

1. Check the troubleshooting section
2. Review error messages in browser console
3. Check Supabase logs
4. Verify all steps were completed in order

---

## ✅ COMPLETION CHECKLIST

- [ ] Phase 1: Database setup complete
- [ ] Phase 2: TypeScript types added
- [ ] Phase 3: Auth services implemented
- [ ] Phase 4: Auth contexts created
- [ ] Phase 5: Admin components built
- [ ] Phase 6: Customer components updated
- [ ] Phase 7: Testing completed
- [ ] Admin login working
- [ ] Customer registration working
- [ ] Approval workflow tested
- [ ] Ready for production

**Congratulations! Your multi-tenant authentication system is now complete! 🎉**
