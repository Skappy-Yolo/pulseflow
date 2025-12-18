-- =============================================================================
-- PULSEFLOW COMPLETE MULTI-TENANT DATABASE SCHEMA
-- =============================================================================
-- This replaces the simple user_profiles system with a full multi-tenant
-- architecture supporting:
-- 1. Pulseflow/Nolum admin system
-- 2. Customer organizations (each paying company)
-- 3. Organization-level role management
-- 4. SSO connections (Slack/Microsoft)
-- 5. Super admin audit logging
-- =============================================================================

-- =============================================================================
-- STEP 1: PULSEFLOW/NOLUM ADMIN SYSTEM
-- =============================================================================

-- Pulseflow admin users (you, your boss, internal team)
CREATE TABLE IF NOT EXISTS public.pulseflow_admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'sales', 'viewer')),
  is_active BOOLEAN DEFAULT true,
  invited_by UUID REFERENCES pulseflow_admins(id),
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Super admin access logs (when super_admin logs into customer dashboard)
CREATE TABLE IF NOT EXISTS public.super_admin_access_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES pulseflow_admins(id) ON DELETE SET NULL,
  admin_email VARCHAR(255) NOT NULL,
  organization_id UUID, -- Which customer company they accessed
  action VARCHAR(100) NOT NULL, -- 'logged_in', 'modified_data', etc.
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin audit logs (all admin actions)
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES pulseflow_admins(id) ON DELETE SET NULL,
  admin_email VARCHAR(255),
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50), -- 'customer_org', 'customer_user', 'settings'
  target_id UUID,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- STEP 2: CUSTOMER ORGANIZATIONS (Each Paying Company)
-- =============================================================================

-- Each customer company (TechCorp, StartupXYZ, etc.)
CREATE TABLE IF NOT EXISTS public.customer_organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  company_email VARCHAR(255), -- Main contact email
  subscription_status VARCHAR(50) DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'suspended', 'cancelled')),
  subscription_tier VARCHAR(50), -- 'basic', 'pro', 'enterprise'
  
  -- Registration info (from signup form)
  customer_type VARCHAR(50) CHECK (customer_type IN ('consulting', 'executive')), -- Consulting Team vs Company Executive
  organization_type VARCHAR(100), -- 'Product/Digital Consulting Firm', 'SaaS/Software Company', etc.
  team_size_or_clients VARCHAR(50),
  primary_role VARCHAR(100),
  main_challenge VARCHAR(255),
  other_challenge TEXT,
  primary_use_case VARCHAR(255),
  
  -- Approval workflow
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended', 'active')),
  approved_by UUID REFERENCES pulseflow_admins(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  
  -- Sales/support
  assigned_to UUID REFERENCES pulseflow_admins(id), -- Sales rep assigned
  demo_date TIMESTAMPTZ,
  notes TEXT, -- Internal notes for Pulseflow admins
  
  -- SSO Configuration
  sso_enabled BOOLEAN DEFAULT false,
  allowed_sso_providers JSONB DEFAULT '[]', -- ['slack', 'microsoft']
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- STEP 3: ORGANIZATION MEMBERS (Users within each customer company)
-- =============================================================================

-- Users belonging to customer organizations
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  organization_id UUID REFERENCES customer_organizations(id) ON DELETE CASCADE NOT NULL,
  
  -- User info
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  
  -- Role within their organization
  role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('org_admin', 'manager', 'member', 'viewer')),
  
  -- Permissions (what they can see/do in their org's dashboard)
  permissions JSONB DEFAULT '{}', -- Custom permissions set by org admin
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  invited_by UUID REFERENCES organization_members(id), -- Who invited them
  invitation_accepted_at TIMESTAMPTZ,
  last_login_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure email is unique within organization
  UNIQUE(organization_id, email)
);

-- =============================================================================
-- STEP 4: USER PROFILES (Extended info for organization members)
-- =============================================================================

-- Additional profile information for organization members
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES organization_members(id) ON DELETE CASCADE PRIMARY KEY,
  
  -- Professional info
  job_title VARCHAR(100),
  department VARCHAR(100),
  phone VARCHAR(50),
  
  -- Preferences
  timezone VARCHAR(50),
  language VARCHAR(10) DEFAULT 'en',
  notification_preferences JSONB DEFAULT '{}',
  
  -- Profile
  avatar_url TEXT,
  bio TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- STEP 5: SSO CONNECTIONS (Slack/Microsoft logins)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.sso_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES customer_organizations(id) ON DELETE CASCADE NOT NULL,
  member_id UUID REFERENCES organization_members(id) ON DELETE CASCADE NOT NULL,
  
  -- SSO Provider info
  provider VARCHAR(50) NOT NULL CHECK (provider IN ('slack', 'microsoft', 'google')),
  provider_user_id VARCHAR(255) NOT NULL, -- Their ID in Slack/Microsoft
  provider_email VARCHAR(255), -- Email from SSO provider
  
  -- Status
  is_enabled BOOLEAN DEFAULT true,
  enabled_by UUID REFERENCES organization_members(id), -- Who enabled it
  
  -- Metadata
  provider_metadata JSONB DEFAULT '{}', -- Store provider-specific data
  last_used_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- One SSO connection per provider per user
  UNIQUE(member_id, provider),
  -- Provider user ID must be unique per organization
  UNIQUE(organization_id, provider, provider_user_id)
);

-- =============================================================================
-- STEP 6: CUSTOMER REGISTRATION QUEUE (Before approval)
-- =============================================================================

-- Temporary table for customer registrations before approval
CREATE TABLE IF NOT EXISTS public.customer_registration_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Registration form data
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company VARCHAR(255) NOT NULL,
  customer_type VARCHAR(50) CHECK (customer_type IN ('consulting', 'executive')), -- Consulting Team vs Company Executive
  organization_type VARCHAR(100),
  team_size_or_clients VARCHAR(50),
  primary_role VARCHAR(100),
  main_challenge VARCHAR(255),
  other_challenge TEXT,
  
  -- Demo booking
  demo_requested BOOLEAN DEFAULT false,
  preferred_demo_date TIMESTAMPTZ,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'demo_scheduled', 'approved', 'rejected')),
  
  -- Approval workflow
  reviewed_by UUID REFERENCES pulseflow_admins(id),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  admin_notes TEXT,
  
  -- If approved, link to created organization
  organization_id UUID REFERENCES customer_organizations(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- STEP 7: ACCOUNT ACTIVATION TOKENS (For new approved customers)
-- =============================================================================

-- Tokens for account activation and password setup
CREATE TABLE IF NOT EXISTS public.account_activation_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES organization_members(id) ON DELETE CASCADE NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  temporary_password VARCHAR(255) NOT NULL, -- Encrypted temporary password
  is_used BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for token lookup
CREATE INDEX IF NOT EXISTS idx_activation_tokens_token ON account_activation_tokens(token);
CREATE INDEX IF NOT EXISTS idx_activation_tokens_email ON account_activation_tokens(email);
CREATE INDEX IF NOT EXISTS idx_activation_tokens_expires ON account_activation_tokens(expires_at);

-- =============================================================================
-- STEP 8: INDEXES FOR PERFORMANCE
-- =============================================================================

-- Pulseflow admin indexes
CREATE INDEX IF NOT EXISTS idx_pulseflow_admins_email ON pulseflow_admins(email);
CREATE INDEX IF NOT EXISTS idx_pulseflow_admins_role ON pulseflow_admins(role);
CREATE INDEX IF NOT EXISTS idx_pulseflow_admins_auth_user_id ON pulseflow_admins(auth_user_id);

-- Organization indexes
CREATE INDEX IF NOT EXISTS idx_customer_orgs_status ON customer_organizations(status);
CREATE INDEX IF NOT EXISTS idx_customer_orgs_subscription ON customer_organizations(subscription_status);
CREATE INDEX IF NOT EXISTS idx_customer_orgs_assigned_to ON customer_organizations(assigned_to);

-- Member indexes
CREATE INDEX IF NOT EXISTS idx_org_members_org_id ON organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_members_email ON organization_members(email);
CREATE INDEX IF NOT EXISTS idx_org_members_role ON organization_members(role);
CREATE INDEX IF NOT EXISTS idx_org_members_auth_user_id ON organization_members(auth_user_id);

-- SSO indexes
CREATE INDEX IF NOT EXISTS idx_sso_connections_member_id ON sso_connections(member_id);
CREATE INDEX IF NOT EXISTS idx_sso_connections_org_id ON sso_connections(organization_id);
CREATE INDEX IF NOT EXISTS idx_sso_connections_provider ON sso_connections(provider);

-- Registration queue indexes
CREATE INDEX IF NOT EXISTS idx_registration_queue_status ON customer_registration_queue(status);
CREATE INDEX IF NOT EXISTS idx_registration_queue_email ON customer_registration_queue(email);
CREATE INDEX IF NOT EXISTS idx_registration_queue_created_at ON customer_registration_queue(created_at);

-- Audit log indexes
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_admin_id ON admin_audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at ON admin_audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_super_admin_access_logs_admin_id ON super_admin_access_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_super_admin_access_logs_org_id ON super_admin_access_logs(organization_id);

-- =============================================================================
-- STEP 9: ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE pulseflow_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE super_admin_access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sso_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_registration_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_activation_tokens ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- RLS POLICIES: PULSEFLOW ADMINS
-- =============================================================================

-- Admins can view all admin profiles
CREATE POLICY "Admins can view admin profiles" ON pulseflow_admins
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pulseflow_admins 
      WHERE auth_user_id = auth.uid() 
      AND is_active = true
    )
  );

-- Only super admins can modify admin profiles
CREATE POLICY "Super admins can manage admins" ON pulseflow_admins
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM pulseflow_admins 
      WHERE auth_user_id = auth.uid() 
      AND role = 'super_admin' 
      AND is_active = true
    )
  );

-- =============================================================================
-- RLS POLICIES: CUSTOMER ORGANIZATIONS
-- =============================================================================

-- Members can view their own organization
CREATE POLICY "Members can view own organization" ON customer_organizations
  FOR SELECT USING (
    -- User is a member of this organization
    EXISTS (
      SELECT 1 FROM organization_members 
      WHERE organization_id = customer_organizations.id 
      AND auth_user_id = auth.uid()
    )
    OR
    -- OR user is a Pulseflow admin
    EXISTS (
      SELECT 1 FROM pulseflow_admins 
      WHERE auth_user_id = auth.uid() 
      AND is_active = true
    )
  );

-- Org admins can update their organization
CREATE POLICY "Org admins can update organization" ON customer_organizations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM organization_members 
      WHERE organization_id = customer_organizations.id 
      AND auth_user_id = auth.uid()
      AND role = 'org_admin'
    )
  );

-- Pulseflow admins can manage all organizations
CREATE POLICY "Pulseflow admins can manage organizations" ON customer_organizations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM pulseflow_admins 
      WHERE auth_user_id = auth.uid() 
      AND role IN ('super_admin', 'admin', 'sales')
      AND is_active = true
    )
  );

-- =============================================================================
-- RLS POLICIES: ORGANIZATION MEMBERS
-- =============================================================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON organization_members
  FOR SELECT USING (auth.uid() = auth_user_id);

-- Users can view members in their organization
CREATE POLICY "Users can view org members" ON organization_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM organization_members om 
      WHERE om.organization_id = organization_members.organization_id 
      AND om.auth_user_id = auth.uid()
    )
  );

-- Org admins can manage members in their organization
CREATE POLICY "Org admins can manage members" ON organization_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM organization_members 
      WHERE organization_id = organization_members.organization_id 
      AND auth_user_id = auth.uid()
      AND role = 'org_admin'
    )
  );

-- Pulseflow admins can view all members
CREATE POLICY "Pulseflow admins can view all members" ON organization_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pulseflow_admins 
      WHERE auth_user_id = auth.uid() 
      AND is_active = true
    )
  );

-- =============================================================================
-- RLS POLICIES: USER PROFILES
-- =============================================================================

-- Users can view/update their own profile
CREATE POLICY "Users can manage own profile" ON user_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM organization_members 
      WHERE id = user_profiles.id 
      AND auth_user_id = auth.uid()
    )
  );

-- =============================================================================
-- RLS POLICIES: SSO CONNECTIONS
-- =============================================================================

-- Users can view their own SSO connections
CREATE POLICY "Users can view own SSO" ON sso_connections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM organization_members 
      WHERE id = sso_connections.member_id 
      AND auth_user_id = auth.uid()
    )
  );

-- Org admins can manage SSO in their organization
CREATE POLICY "Org admins can manage SSO" ON sso_connections
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM organization_members 
      WHERE organization_id = sso_connections.organization_id 
      AND auth_user_id = auth.uid()
      AND role = 'org_admin'
    )
  );

-- =============================================================================
-- RLS POLICIES: CUSTOMER REGISTRATION QUEUE
-- =============================================================================

-- Only Pulseflow admins can view registration queue
CREATE POLICY "Admins can view registration queue" ON customer_registration_queue
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pulseflow_admins 
      WHERE auth_user_id = auth.uid() 
      AND is_active = true
    )
  );

-- Only Pulseflow admins/sales can manage registration queue
CREATE POLICY "Admins can manage registration queue" ON customer_registration_queue
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM pulseflow_admins 
      WHERE auth_user_id = auth.uid() 
      AND role IN ('super_admin', 'admin', 'sales')
      AND is_active = true
    )
  );

-- Public insert for new registrations (from website)
CREATE POLICY "Anyone can register" ON customer_registration_queue
  FOR INSERT WITH CHECK (true);

-- =============================================================================
-- RLS POLICIES: AUDIT LOGS
-- =============================================================================

-- Admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON admin_audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pulseflow_admins 
      WHERE auth_user_id = auth.uid() 
      AND is_active = true
    )
  );

-- System can insert audit logs
CREATE POLICY "System can insert audit logs" ON admin_audit_logs
  FOR INSERT WITH CHECK (true);

-- Super admins can view access logs
CREATE POLICY "Super admins can view access logs" ON super_admin_access_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pulseflow_admins 
      WHERE auth_user_id = auth.uid() 
      AND role = 'super_admin'
      AND is_active = true
    )
  );

-- System can insert access logs
CREATE POLICY "System can insert access logs" ON super_admin_access_logs
  FOR INSERT WITH CHECK (true);

-- =============================================================================
-- RLS POLICIES: ACCOUNT ACTIVATION TOKENS
-- =============================================================================

-- Admins can view activation tokens
CREATE POLICY "Admins can view activation tokens" ON account_activation_tokens
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pulseflow_admins 
      WHERE auth_user_id = auth.uid() 
      AND is_active = true
    )
  );

-- System/Admins can create activation tokens
CREATE POLICY "Admins can create activation tokens" ON account_activation_tokens
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM pulseflow_admins 
      WHERE auth_user_id = auth.uid() 
      AND role IN ('super_admin', 'admin', 'sales')
      AND is_active = true
    )
  );

-- Users can update their own token (mark as used during activation)
CREATE POLICY "Users can activate own token" ON account_activation_tokens
  FOR UPDATE USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Public select for token validation during activation
CREATE POLICY "Anyone can validate activation token" ON account_activation_tokens
  FOR SELECT USING (true);

-- =============================================================================
-- STEP 10: HELPER FUNCTIONS
-- =============================================================================

-- Function to check if user is Pulseflow admin
CREATE OR REPLACE FUNCTION is_pulseflow_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM pulseflow_admins
    WHERE auth_user_id = auth.uid()
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM pulseflow_admins
    WHERE auth_user_id = auth.uid()
    AND role = 'super_admin'
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is org admin
CREATE OR REPLACE FUNCTION is_org_admin(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM organization_members
    WHERE organization_id = org_id
    AND auth_user_id = auth.uid()
    AND role = 'org_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's organization
CREATE OR REPLACE FUNCTION get_user_organization()
RETURNS UUID AS $$
DECLARE
  org_id UUID;
BEGIN
  SELECT organization_id INTO org_id
  FROM organization_members
  WHERE auth_user_id = auth.uid()
  LIMIT 1;
  
  RETURN org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- STEP 11: TRIGGERS
-- =============================================================================

-- Update timestamps on all tables
CREATE TRIGGER update_pulseflow_admins_updated_at
  BEFORE UPDATE ON pulseflow_admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_customer_organizations_updated_at
  BEFORE UPDATE ON customer_organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_organization_members_updated_at
  BEFORE UPDATE ON organization_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_sso_connections_updated_at
  BEFORE UPDATE ON sso_connections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_registration_queue_updated_at
  BEFORE UPDATE ON customer_registration_queue
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- STEP 12: GRANT PERMISSIONS
-- =============================================================================

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- =============================================================================
-- ✅ SCHEMA SETUP COMPLETE
-- =============================================================================

SELECT 'Pulseflow multi-tenant database schema created successfully!' as message;
