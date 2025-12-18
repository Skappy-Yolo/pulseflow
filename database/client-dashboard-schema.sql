-- =============================================================================
-- CLIENT DASHBOARD DATA SCHEMA
-- =============================================================================
-- Tables for storing client-specific dashboard data
-- Each client (consultant or executive) gets their own data
-- =============================================================================

-- =============================================================================
-- 1. CLIENT INTEGRATIONS (API connections per organization)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.client_integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES customer_organizations(id) ON DELETE CASCADE NOT NULL,
  
  -- Integration type
  integration_type VARCHAR(50) NOT NULL CHECK (integration_type IN (
    'jira', 'hubspot', 'salesforce', 'slack', 'microsoft_teams',
    'google_analytics', 'mixpanel', 'amplitude', 'stripe', 'quickbooks'
  )),
  
  -- Connection status
  is_connected BOOLEAN DEFAULT false,
  connected_at TIMESTAMPTZ,
  last_sync_at TIMESTAMPTZ,
  sync_status VARCHAR(20) DEFAULT 'never' CHECK (sync_status IN ('never', 'syncing', 'success', 'failed')),
  
  -- API credentials (encrypted in production)
  api_key_encrypted TEXT,
  api_secret_encrypted TEXT,
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  webhook_url TEXT,
  
  -- Settings
  sync_frequency VARCHAR(20) DEFAULT 'daily' CHECK (sync_frequency IN ('hourly', 'daily', 'weekly', 'manual')),
  settings JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(organization_id, integration_type)
);

-- =============================================================================
-- 2. CONSULTANT CLIENTS (For consulting firms - their client companies)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.consultant_clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES customer_organizations(id) ON DELETE CASCADE NOT NULL,
  
  -- Client info
  client_name VARCHAR(255) NOT NULL,
  client_logo_url TEXT,
  industry VARCHAR(100),
  contact_email VARCHAR(255),
  contact_name VARCHAR(255),
  
  -- Status
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'at_risk', 'churned')),
  health_score INTEGER DEFAULT 0 CHECK (health_score >= 0 AND health_score <= 100),
  
  -- Contract info
  contract_start_date DATE,
  contract_end_date DATE,
  monthly_revenue DECIMAL(12, 2),
  
  -- Metrics (summary from integrations)
  total_projects INTEGER DEFAULT 0,
  active_projects INTEGER DEFAULT 0,
  total_tickets INTEGER DEFAULT 0,
  open_tickets INTEGER DEFAULT 0,
  
  -- Notes
  notes TEXT,
  tags JSONB DEFAULT '[]',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 3. DASHBOARD METRICS (Aggregated metrics per organization)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.dashboard_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES customer_organizations(id) ON DELETE CASCADE NOT NULL,
  
  -- Metric identification
  metric_type VARCHAR(50) NOT NULL, -- 'revenue', 'projects', 'tickets', 'health', etc.
  metric_name VARCHAR(100) NOT NULL,
  metric_category VARCHAR(50), -- 'financial', 'operational', 'customer', 'product'
  
  -- Values
  current_value DECIMAL(15, 2),
  previous_value DECIMAL(15, 2),
  target_value DECIMAL(15, 2),
  
  -- Change tracking
  change_percentage DECIMAL(5, 2),
  change_direction VARCHAR(10) CHECK (change_direction IN ('up', 'down', 'stable')),
  
  -- Time period
  period_type VARCHAR(20) DEFAULT 'monthly' CHECK (period_type IN ('daily', 'weekly', 'monthly', 'quarterly', 'yearly')),
  period_start DATE,
  period_end DATE,
  
  -- Source
  source_integration VARCHAR(50),
  last_updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 4. EXECUTIVE DEPARTMENTS (For executive dashboard - department metrics)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.executive_departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES customer_organizations(id) ON DELETE CASCADE NOT NULL,
  
  -- Department info
  department_name VARCHAR(100) NOT NULL,
  department_head VARCHAR(255),
  
  -- Metrics
  health_score INTEGER DEFAULT 0 CHECK (health_score >= 0 AND health_score <= 100),
  budget_used DECIMAL(12, 2),
  budget_total DECIMAL(12, 2),
  headcount INTEGER DEFAULT 0,
  
  -- KPIs (flexible JSON for different metrics per department)
  kpis JSONB DEFAULT '[]',
  
  -- Status
  status VARCHAR(20) DEFAULT 'on_track' CHECK (status IN ('on_track', 'at_risk', 'behind', 'ahead')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 5. ACTIVITY LOG (Recent activities for dashboard feed)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.dashboard_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES customer_organizations(id) ON DELETE CASCADE NOT NULL,
  
  -- Activity info
  activity_type VARCHAR(50) NOT NULL, -- 'client_added', 'metric_updated', 'integration_connected', etc.
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Related entities
  related_client_id UUID REFERENCES consultant_clients(id) ON DELETE SET NULL,
  related_integration VARCHAR(50),
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_client_integrations_org ON client_integrations(organization_id);
CREATE INDEX IF NOT EXISTS idx_consultant_clients_org ON consultant_clients(organization_id);
CREATE INDEX IF NOT EXISTS idx_consultant_clients_status ON consultant_clients(organization_id, status);
CREATE INDEX IF NOT EXISTS idx_dashboard_metrics_org ON dashboard_metrics(organization_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_metrics_type ON dashboard_metrics(organization_id, metric_type);
CREATE INDEX IF NOT EXISTS idx_executive_departments_org ON executive_departments(organization_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_activities_org ON dashboard_activities(organization_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_activities_recent ON dashboard_activities(organization_id, created_at DESC);

-- =============================================================================
-- ROW LEVEL SECURITY (Each org only sees their own data)
-- =============================================================================
ALTER TABLE client_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultant_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE executive_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_activities ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access data for their organization
-- (Requires organization_members table to be set up with auth.uid())

CREATE POLICY "Users can view own org integrations" ON client_integrations
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own org clients" ON consultant_clients
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own org metrics" ON dashboard_metrics
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own org departments" ON executive_departments
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own org activities" ON dashboard_activities
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE auth_user_id = auth.uid()
    )
  );
