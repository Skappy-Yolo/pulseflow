# 🗄️ Database Setup for Customer-Admin Integration

## ✅ **Customer Data Integration Status**

The admin dashboard **IS ALREADY SET UP** to integrate with customer data! Here's what's implemented:

### 📊 **What the Admin Dashboard Shows**

1. **Customer Statistics**:
   - Total customers registered
   - Pending approvals 
   - Active (approved) customers
   - Suspended customers

2. **Recent Activity**:
   - Recent customer registrations (last 7 days)
   - Pending users awaiting approval
   - Customer management capabilities

3. **Admin Actions**:
   - View customer details
   - Approve/reject customer accounts
   - Suspend/activate customers
   - Audit logs for all actions

## 🔧 **Required Database Tables**

### **Option 1: Enhanced User Profiles (Recommended)**
Extend the existing `user_profiles` table to include admin status fields:

```sql
-- Add admin-specific columns to existing user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS notes text;

-- Create index for admin queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_status ON public.user_profiles(status);

-- Update RLS policies for admin access
CREATE POLICY "Admins can view all profiles" ON public.user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email IN ('admin@pulseflow.com', 'manager@pulseflow.com')
    )
  );

-- Add status constraint
ALTER TABLE public.user_profiles 
ADD CONSTRAINT check_status 
CHECK (status IN ('pending', 'approved', 'rejected', 'suspended'));
```

### **Option 2: Separate Customer Users Table** 
Create a dedicated `customer_users` table (what the code currently expects):

```sql
-- Create customer_users table that mirrors user_profiles with admin fields
CREATE TABLE public.customer_users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  first_name text not null,
  last_name text not null,
  company text not null,
  organization_type text,
  team_size_or_clients text,
  primary_role text,
  main_challenge text,
  other_challenge text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamp with time zone,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
ALTER TABLE public.customer_users ENABLE ROW LEVEL SECURITY;

-- Policies for customer access
CREATE POLICY "Users can view own data" ON public.customer_users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.customer_users
  FOR UPDATE USING (auth.uid() = id);

-- Policies for admin access  
CREATE POLICY "Admins can view all customers" ON public.customer_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email IN ('admin@pulseflow.com', 'manager@pulseflow.com')
    )
  );

-- Create indexes
CREATE INDEX idx_customer_users_status ON public.customer_users(status);
CREATE INDEX idx_customer_users_created_at ON public.customer_users(created_at);

-- Function to sync data from user_profiles to customer_users
CREATE OR REPLACE FUNCTION sync_to_customer_users()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.customer_users (
    id, email, first_name, last_name, company, 
    organization_type, team_size_or_clients, primary_role, 
    main_challenge, other_challenge, created_at, updated_at
  )
  VALUES (
    NEW.id, NEW.email, NEW.first_name, NEW.last_name, NEW.company,
    NEW.organization_type, NEW.team_size_or_clients, NEW.primary_role,
    NEW.main_challenge, NEW.other_challenge, NEW.created_at, NEW.updated_at
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    company = EXCLUDED.company,
    organization_type = EXCLUDED.organization_type,
    team_size_or_clients = EXCLUDED.team_size_or_clients,
    primary_role = EXCLUDED.primary_role,
    main_challenge = EXCLUDED.main_challenge,
    other_challenge = EXCLUDED.other_challenge,
    updated_at = EXCLUDED.updated_at;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to sync data
CREATE TRIGGER sync_user_profiles_to_customers
  AFTER INSERT OR UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION sync_to_customer_users();
```

## 🚀 **Setup Instructions**

### **Step 1: Choose Your Approach**
- **Option 1**: Simpler, extends existing table
- **Option 2**: More structured, separate customer management

### **Step 2: Run SQL in Supabase**
1. Go to your Supabase project dashboard
2. Navigate to "SQL Editor"
3. Run the SQL for your chosen option
4. Verify tables are created

### **Step 3: Create Admin Users**
```sql
-- Insert admin users (run after creating admin accounts in Supabase Auth)
-- Replace with actual admin user IDs from auth.users table
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES 
  ('admin@pulseflow.com', crypt('PulseFlow2024!', gen_salt('bf')), now()),
  ('manager@pulseflow.com', crypt('Manager2024!', gen_salt('bf')), now());
```

### **Step 4: Test Integration**
1. Deploy your app to Netlify
2. Register as a customer at `/signup`
3. Check if data appears in admin dashboard at `/admin/dashboard`
4. Test approval workflow

## 🔍 **Current Code Integration**

The admin dashboard already expects this data structure:

```typescript
// AdminAuth service queries these fields:
interface CustomerUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  created_at: string;
  // ... other fields
}
```

## 🛠️ **What Works Already**

✅ **Dashboard Stats**: Customer counts by status  
✅ **Recent Registrations**: Last 7 days of signups  
✅ **Pending Approvals**: Users awaiting admin review  
✅ **Customer Management**: Approve/reject/suspend actions  
✅ **Audit Logging**: Track all admin actions  

## 📝 **Next Steps**

1. **Choose database option** (Option 1 or 2)
2. **Run SQL setup** in your Supabase project  
3. **Test customer registration** flow
4. **Verify admin dashboard** shows customer data
5. **Test approval workflow** end-to-end

The customer-admin integration is **fully implemented in code** - you just need to set up the database tables! 🎉
