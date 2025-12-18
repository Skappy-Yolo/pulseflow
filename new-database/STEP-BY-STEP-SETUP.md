# 🚀 PULSEFLOW MULTI-TENANT SETUP - STEP BY STEP

**Follow these steps IN ORDER. Do not skip any step.**

---

## 📋 OVERVIEW

| Step | What | Time |
|------|------|------|
| 1 | Backup current data | 5 min |
| 2 | Run migration SQL | 10 min |
| 3 | Create your admin account | 5 min |
| 4 | Setup Resend.com (FREE) | 10 min |
| 5 | Deploy Edge Function | 15 min |
| 6 | Test everything | 10 min |

**Total: ~55 minutes**

---

## STEP 1: BACKUP YOUR CURRENT DATA (5 min)

### 1.1 Go to Supabase Dashboard
- Open your project: **PulseFlow** (Production)
- Go to **SQL Editor**

### 1.2 Run this backup query
Copy and paste this, then click **Run**:

```sql
-- BACKUP: Export current data to JSON
-- Run this and save the results somewhere safe!

SELECT 'admin_users' as table_name, json_agg(t) as data FROM admin_users t
UNION ALL
SELECT 'customer_users', json_agg(t) FROM customer_users t
UNION ALL
SELECT 'profiles', json_agg(t) FROM profiles t;
```

### 1.3 Save the results
- Click on the results
- Copy and save to a text file on your computer
- Name it: `pulseflow-backup-2024-12-15.json`

✅ **Checkpoint:** You have a backup of your data

---

## STEP 2: RUN THE MIGRATION SQL (10 min)

### 2.1 Go to SQL Editor in Supabase

### 2.2 Run the schema in parts
**IMPORTANT:** Run each part separately, wait for success, then run the next.

---

### PART 1: Create New Tables (Copy & Run)

```sql
-- =============================================================================
-- PART 1: CREATE NEW TABLES
-- =============================================================================

-- 1.1 Pulseflow admin users (replaces admin_users)
CREATE TABLE IF NOT EXISTS public.pulseflow_admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'sales', 'viewer')),
  is_active BOOLEAN DEFAULT true,
  invited_by UUID REFERENCES public.pulseflow_admins(id),
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.2 Super admin access logs
CREATE TABLE IF NOT EXISTS public.super_admin_access_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES public.pulseflow_admins(id) ON DELETE SET NULL,
  admin_email VARCHAR(255) NOT NULL,
  organization_id UUID,
  action VARCHAR(100) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.3 Admin audit logs (enhanced version)
CREATE TABLE IF NOT EXISTS public.pulseflow_admin_audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES public.pulseflow_admins(id) ON DELETE SET NULL,
  admin_email VARCHAR(255),
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50),
  target_id UUID,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

✅ Click **Run** and wait for "Success"

---

### PART 2: Customer Organizations (Copy & Run)

```sql
-- =============================================================================
-- PART 2: CUSTOMER ORGANIZATIONS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.customer_organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  company_email VARCHAR(255),
  subscription_status VARCHAR(50) DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'suspended', 'cancelled')),
  subscription_tier VARCHAR(50),
  
  -- Customer type from registration
  customer_type VARCHAR(50) CHECK (customer_type IN ('consulting', 'executive')),
  organization_type VARCHAR(100),
  team_size_or_clients VARCHAR(50),
  primary_role VARCHAR(100),
  main_challenge VARCHAR(255),
  other_challenge TEXT,
  primary_use_case VARCHAR(255),
  
  -- Approval workflow
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended', 'active')),
  approved_by UUID REFERENCES public.pulseflow_admins(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  
  -- Sales/support
  assigned_to UUID REFERENCES public.pulseflow_admins(id),
  demo_date TIMESTAMPTZ,
  notes TEXT,
  
  -- SSO
  sso_enabled BOOLEAN DEFAULT false,
  allowed_sso_providers JSONB DEFAULT '[]',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

✅ Click **Run** and wait for "Success"

---

### PART 3: Organization Members (Copy & Run)

```sql
-- =============================================================================
-- PART 3: ORGANIZATION MEMBERS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  organization_id UUID REFERENCES public.customer_organizations(id) ON DELETE CASCADE NOT NULL,
  
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  
  role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('org_admin', 'manager', 'member', 'viewer')),
  permissions JSONB DEFAULT '{}',
  
  is_active BOOLEAN DEFAULT true,
  invited_by UUID REFERENCES public.organization_members(id),
  invitation_accepted_at TIMESTAMPTZ,
  last_login_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(organization_id, email)
);

-- Member profiles
CREATE TABLE IF NOT EXISTS public.member_profiles (
  id UUID REFERENCES public.organization_members(id) ON DELETE CASCADE PRIMARY KEY,
  job_title VARCHAR(100),
  department VARCHAR(100),
  phone VARCHAR(50),
  timezone VARCHAR(50),
  language VARCHAR(10) DEFAULT 'en',
  notification_preferences JSONB DEFAULT '{}',
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

✅ Click **Run** and wait for "Success"

---

### PART 4: Registration Queue & Activation (Copy & Run)

```sql
-- =============================================================================
-- PART 4: REGISTRATION QUEUE & ACTIVATION TOKENS
-- =============================================================================

-- Registration queue for pending customers
CREATE TABLE IF NOT EXISTS public.customer_registration_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company VARCHAR(255) NOT NULL,
  customer_type VARCHAR(50) CHECK (customer_type IN ('consulting', 'executive')),
  organization_type VARCHAR(100),
  team_size_or_clients VARCHAR(50),
  primary_role VARCHAR(100),
  main_challenge VARCHAR(255),
  other_challenge TEXT,
  
  demo_requested BOOLEAN DEFAULT false,
  preferred_demo_date TIMESTAMPTZ,
  
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'demo_scheduled', 'approved', 'rejected')),
  
  reviewed_by UUID REFERENCES public.pulseflow_admins(id),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  admin_notes TEXT,
  
  organization_id UUID REFERENCES public.customer_organizations(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activation tokens for email verification
CREATE TABLE IF NOT EXISTS public.account_activation_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES public.organization_members(id) ON DELETE CASCADE NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  temporary_password VARCHAR(255) NOT NULL,
  is_used BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_activation_tokens_token ON public.account_activation_tokens(token);
CREATE INDEX IF NOT EXISTS idx_activation_tokens_email ON public.account_activation_tokens(email);
CREATE INDEX IF NOT EXISTS idx_registration_queue_status ON public.customer_registration_queue(status);
CREATE INDEX IF NOT EXISTS idx_registration_queue_email ON public.customer_registration_queue(email);
```

✅ Click **Run** and wait for "Success"

---

### PART 5: SSO & Indexes (Copy & Run)

```sql
-- =============================================================================
-- PART 5: SSO CONNECTIONS & ADDITIONAL INDEXES
-- =============================================================================

-- SSO connections
CREATE TABLE IF NOT EXISTS public.sso_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.customer_organizations(id) ON DELETE CASCADE NOT NULL,
  member_id UUID REFERENCES public.organization_members(id) ON DELETE CASCADE NOT NULL,
  
  provider VARCHAR(50) NOT NULL CHECK (provider IN ('slack', 'microsoft', 'google')),
  provider_user_id VARCHAR(255) NOT NULL,
  provider_email VARCHAR(255),
  
  is_enabled BOOLEAN DEFAULT true,
  enabled_by UUID REFERENCES public.organization_members(id),
  
  provider_metadata JSONB DEFAULT '{}',
  last_used_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(member_id, provider),
  UNIQUE(organization_id, provider, provider_user_id)
);

-- More indexes for performance
CREATE INDEX IF NOT EXISTS idx_org_members_org_id ON public.organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_members_auth_user ON public.organization_members(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_customer_orgs_status ON public.customer_organizations(status);
CREATE INDEX IF NOT EXISTS idx_pulseflow_admins_auth_user ON public.pulseflow_admins(auth_user_id);
```

✅ Click **Run** and wait for "Success"

---

### PART 6: Row Level Security (Copy & Run)

```sql
-- =============================================================================
-- PART 6: ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all new tables
ALTER TABLE public.pulseflow_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.super_admin_access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pulseflow_admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sso_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_registration_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.account_activation_tokens ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- RLS POLICIES
-- =============================================================================

-- Pulseflow Admins: Only admins can see admin data
CREATE POLICY "Admins can view all admin data" ON public.pulseflow_admins
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_user_id FROM public.pulseflow_admins WHERE is_active = true)
  );

CREATE POLICY "Super admins can manage admins" ON public.pulseflow_admins
  FOR ALL USING (
    auth.uid() IN (SELECT auth_user_id FROM public.pulseflow_admins WHERE role = 'super_admin' AND is_active = true)
  );

-- Customer Organizations: Admins see all, members see their own
CREATE POLICY "Admins see all organizations" ON public.customer_organizations
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_user_id FROM public.pulseflow_admins WHERE is_active = true)
  );

CREATE POLICY "Members see own organization" ON public.customer_organizations
  FOR SELECT USING (
    id IN (SELECT organization_id FROM public.organization_members WHERE auth_user_id = auth.uid())
  );

CREATE POLICY "Admins manage organizations" ON public.customer_organizations
  FOR ALL USING (
    auth.uid() IN (SELECT auth_user_id FROM public.pulseflow_admins WHERE role IN ('super_admin', 'admin', 'sales') AND is_active = true)
  );

-- Organization Members: Members see colleagues in their org
CREATE POLICY "Members see own org members" ON public.organization_members
  FOR SELECT USING (
    organization_id IN (SELECT organization_id FROM public.organization_members WHERE auth_user_id = auth.uid())
  );

CREATE POLICY "Admins see all members" ON public.organization_members
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_user_id FROM public.pulseflow_admins WHERE is_active = true)
  );

CREATE POLICY "Org admins manage their members" ON public.organization_members
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.organization_members 
      WHERE auth_user_id = auth.uid() AND role = 'org_admin'
    )
  );

CREATE POLICY "Pulseflow admins manage all members" ON public.organization_members
  FOR ALL USING (
    auth.uid() IN (SELECT auth_user_id FROM public.pulseflow_admins WHERE role IN ('super_admin', 'admin') AND is_active = true)
  );

-- Registration Queue: Only Pulseflow admins
CREATE POLICY "Only admins see registration queue" ON public.customer_registration_queue
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_user_id FROM public.pulseflow_admins WHERE is_active = true)
  );

CREATE POLICY "Anyone can insert to registration queue" ON public.customer_registration_queue
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins manage registration queue" ON public.customer_registration_queue
  FOR UPDATE USING (
    auth.uid() IN (SELECT auth_user_id FROM public.pulseflow_admins WHERE role IN ('super_admin', 'admin', 'sales') AND is_active = true)
  );

-- Activation Tokens: Only system and the user themselves
CREATE POLICY "Users see own activation token" ON public.account_activation_tokens
  FOR SELECT USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Admins manage activation tokens" ON public.account_activation_tokens
  FOR ALL USING (
    auth.uid() IN (SELECT auth_user_id FROM public.pulseflow_admins WHERE is_active = true)
  );

-- Audit Logs: Only admins
CREATE POLICY "Admins view audit logs" ON public.pulseflow_admin_audit_logs
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_user_id FROM public.pulseflow_admins WHERE is_active = true)
  );

CREATE POLICY "System inserts audit logs" ON public.pulseflow_admin_audit_logs
  FOR INSERT WITH CHECK (true);

-- Super Admin Access Logs: Only super admins
CREATE POLICY "Super admins view access logs" ON public.super_admin_access_logs
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_user_id FROM public.pulseflow_admins WHERE role = 'super_admin' AND is_active = true)
  );

CREATE POLICY "System inserts access logs" ON public.super_admin_access_logs
  FOR INSERT WITH CHECK (true);

-- Member Profiles: Members see own org, can update own
CREATE POLICY "Members view own org profiles" ON public.member_profiles
  FOR SELECT USING (
    id IN (
      SELECT om.id FROM public.organization_members om
      WHERE om.organization_id IN (
        SELECT organization_id FROM public.organization_members WHERE auth_user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Members update own profile" ON public.member_profiles
  FOR UPDATE USING (
    id IN (SELECT id FROM public.organization_members WHERE auth_user_id = auth.uid())
  );

-- SSO Connections: Members see own org
CREATE POLICY "Members view own org SSO" ON public.sso_connections
  FOR SELECT USING (
    organization_id IN (SELECT organization_id FROM public.organization_members WHERE auth_user_id = auth.uid())
  );

CREATE POLICY "Org admins manage SSO" ON public.sso_connections
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.organization_members 
      WHERE auth_user_id = auth.uid() AND role = 'org_admin'
    )
  );
```

✅ Click **Run** and wait for "Success"

---

### PART 7: Triggers for updated_at (Copy & Run)

```sql
-- =============================================================================
-- PART 7: TRIGGERS FOR UPDATED_AT (Safe to run multiple times)
-- =============================================================================

-- Create or replace the trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to new tables (DROP IF EXISTS first for safety)
DROP TRIGGER IF EXISTS update_pulseflow_admins_updated_at ON public.pulseflow_admins;
CREATE TRIGGER update_pulseflow_admins_updated_at
  BEFORE UPDATE ON public.pulseflow_admins
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_customer_organizations_updated_at ON public.customer_organizations;
CREATE TRIGGER update_customer_organizations_updated_at
  BEFORE UPDATE ON public.customer_organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_organization_members_updated_at ON public.organization_members;
CREATE TRIGGER update_organization_members_updated_at
  BEFORE UPDATE ON public.organization_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_member_profiles_updated_at ON public.member_profiles;
CREATE TRIGGER update_member_profiles_updated_at
  BEFORE UPDATE ON public.member_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_sso_connections_updated_at ON public.sso_connections;
CREATE TRIGGER update_sso_connections_updated_at
  BEFORE UPDATE ON public.sso_connections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_registration_queue_updated_at ON public.customer_registration_queue;
CREATE TRIGGER update_registration_queue_updated_at
  BEFORE UPDATE ON public.customer_registration_queue
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

✅ Click **Run** and wait for "Success"

---

## STEP 3: CREATE YOUR ADMIN ACCOUNT (5 min)

### 3.1 Check if you already have an auth user
Go to **Authentication** → **Users** in Supabase dashboard.

If you see your email there, copy the **User UID** (the long ID).

If not, click **Add user** → Enter your email and password → Check "Auto Confirm" → Click **Create user** → Copy the **User UID**.

### 3.2 Add yourself as Super Admin

```sql
-- Replace these values with your actual data!
INSERT INTO public.pulseflow_admins (
  auth_user_id,
  email,
  first_name,
  last_name,
  role,
  is_active
) VALUES (
  'YOUR-USER-UUID-HERE',  -- Paste your User UID here
  'your-email@nolum.be',   -- Your email
  'Your',                   -- Your first name
  'Name',                   -- Your last name
  'super_admin',
  true
);
```

✅ Click **Run** - You are now a Super Admin!

---

## STEP 4: SETUP RESEND.COM - FREE (10 min)

### 4.1 Create Resend Account
1. Go to **https://resend.com**
2. Click **Get Started** (top right)
3. Sign up with GitHub or email
4. Verify your email

### 4.2 Get Your API Key
1. In Resend dashboard, click **API Keys** (left sidebar)
2. Click **Create API Key**
3. Name: `pulseflow-activation`
4. Permission: **Full Access**
5. Click **Create**
6. **COPY THE KEY NOW** - You won't see it again!
7. Save it somewhere safe

### 4.3 (Optional) Add Your Domain
For production, you want emails from `noreply@pulseflow.com`:
1. Go to **Domains** → **Add Domain**
2. Enter: `pulseflow.com` (or your domain)
3. Add the DNS records shown to your domain provider
4. Wait for verification (can take 24-48 hours)

**For testing**, you can skip this - Resend lets you send to any email from their test domain.

✅ **Checkpoint:** You have a Resend API key saved

---

## STEP 5: DEPLOY EDGE FUNCTION (15 min)

### 5.1 Install Supabase CLI
Open a terminal and run:

**Windows (PowerShell):**
```powershell
npx supabase login
```

It will open a browser to authenticate - click **Authorize**.

### 5.2 Link Your Project
```powershell
cd "c:\Users\Emmanuel Okanlawon\Desktop\NOLUM\pulseflow-app"
npx supabase link --project-ref YOUR_PROJECT_REF
```

Find your project ref in Supabase Dashboard → Settings → General → Reference ID
(It looks like: `abcdefghijklmnop`)

### 5.3 Create Edge Function Folder
```powershell
mkdir supabase
mkdir supabase\functions
mkdir supabase\functions\send-activation-email
```

### 5.4 Create the Edge Function
Create file: `supabase/functions/send-activation-email/index.ts`

Copy the content from `new-database/send-activation-email-edge-function.ts`

### 5.5 Deploy the Function
```powershell
npx supabase functions deploy send-activation-email
```

### 5.6 Set Environment Variables
In Supabase Dashboard → Edge Functions → send-activation-email → **Settings**:

Add these secrets:
- `RESEND_API_KEY` = (your Resend API key from step 4)
- `FROM_EMAIL` = `noreply@pulseflow.com` (or your email)
- `FROM_NAME` = `PulseFlow`
- `APP_URL` = `https://pulseflow.com` (or your URL)

✅ **Checkpoint:** Edge function deployed!

---

## STEP 6: TEST EVERYTHING (10 min)

### 6.1 Test Admin Login
1. Go to your app's admin login page
2. Login with your credentials
3. Should see admin dashboard

### 6.2 Test Registration Queue
Run this SQL to insert a test registration:

```sql
INSERT INTO public.customer_registration_queue (
  email, first_name, last_name, company, customer_type,
  organization_type, team_size_or_clients, primary_role, main_challenge
) VALUES (
  'test@example.com', 'Test', 'User', 'Test Company', 'consulting',
  'SaaS/Software Company', '11-50', 'CEO/Founder', 'Team Performance'
);
```

### 6.3 Check the Queue
```sql
SELECT * FROM public.customer_registration_queue;
```

You should see the test registration with status = 'pending'.

### 6.4 Test Edge Function (Optional)
In Supabase Dashboard → Edge Functions → send-activation-email → **Logs**

You can invoke the function manually to test it.

---

## ✅ DONE!

Your multi-tenant system is now set up with:

- ✅ New database tables
- ✅ Row Level Security
- ✅ Your Super Admin account
- ✅ Email service (Resend)
- ✅ Activation email function

---

## 🔧 NEXT STEPS

1. **Update your frontend** to use the new auth services
2. **Build admin UI** to manage registration queue
3. **Test the full flow**: Register → Approve → Activation Email → Login

---

## 📞 TROUBLESHOOTING

**"Table already exists"**
- That's fine! `CREATE TABLE IF NOT EXISTS` won't create duplicates.

**"Policy already exists"**
- Run: `DROP POLICY IF EXISTS "policy_name" ON table_name;` first

**"Function deployment failed"**
- Check you're logged in: `npx supabase login`
- Check project is linked: `npx supabase link`

**"Resend API error"**
- Verify your API key is correct
- Check you're not on a blocked email (use a real email)

---

## 📁 FILES REFERENCE

| File | Description |
|------|-------------|
| `pulseflow-complete-schema.sql` | Full schema (reference only, use parts above) |
| `pulseflow-admin-auth-service.ts` | Admin auth TypeScript service |
| `pulseflow-customer-auth-service.ts` | Customer auth TypeScript service |
| `send-activation-email-edge-function.ts` | Edge function for emails |
| `CustomerRegistrationHelper.ts` | Form helper for your UI |
| `consultant-auth-integration.ts` | Demo login preservation |

