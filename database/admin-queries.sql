-- =============================================================================
-- PULSEFLOW ADMIN MANAGEMENT QUERIES
-- =============================================================================
-- Quick reference for checking and managing admin accounts in Supabase
-- Run these in: Supabase Dashboard → SQL Editor
-- =============================================================================

-- =============================================================================
-- ⚠️ IMPORTANT: RLS MUST BE DISABLED ON pulseflow_admins
-- =============================================================================
-- If admin login shows "Database error occurred", run this:
--
-- ALTER TABLE pulseflow_admins DISABLE ROW LEVEL SECURITY;
--
-- This is required because RLS policies conflict with the login flow.
-- Security is still maintained via Supabase Auth (password authentication).
-- =============================================================================

-- =============================================================================
-- 📋 CHECK CURRENT ADMINS
-- =============================================================================

-- View all admins (basic info)
SELECT 
  id,
  email,
  first_name,
  last_name,
  role,
  is_active,
  last_login_at,
  created_at
FROM pulseflow_admins
ORDER BY created_at DESC;

-- View active admins only
SELECT 
  email,
  first_name || ' ' || last_name AS full_name,
  role,
  last_login_at
FROM pulseflow_admins
WHERE is_active = true
ORDER BY role, last_name;

-- View super admins only
SELECT * FROM pulseflow_admins WHERE role = 'super_admin' AND is_active = true;

-- Count admins by role
SELECT role, COUNT(*) as count 
FROM pulseflow_admins 
WHERE is_active = true 
GROUP BY role;

-- =============================================================================
-- ➕ CREATE NEW ADMIN
-- =============================================================================
-- STEP 1: First create user in Supabase Auth
--   → Go to Authentication → Users → Add user
--   → Copy the User UID after creation
--
-- STEP 2: Run this query (replace values):

/*
INSERT INTO pulseflow_admins (
  auth_user_id,
  email,
  first_name,
  last_name,
  role,
  is_active
) VALUES (
  '00000000-0000-0000-0000-000000000000',  -- PASTE AUTH USER ID HERE
  'newadmin@pulseflowapp.com',              -- Same email as auth user
  'FirstName',                               -- First name
  'LastName',                                -- Last name
  'admin',                                   -- Role: super_admin, admin, sales, viewer
  true
);
*/

-- Available roles:
-- 'super_admin' = Full access, can access customer dashboards
-- 'admin'       = Manage customers, approve registrations  
-- 'sales'       = View customer data, handle leads
-- 'viewer'      = Read-only access

-- =============================================================================
-- ✏️ UPDATE ADMIN
-- =============================================================================

-- Change admin role
/*
UPDATE pulseflow_admins 
SET role = 'super_admin', updated_at = NOW()
WHERE email = 'admin@pulseflowapp.com';
*/

-- Update admin name
/*
UPDATE pulseflow_admins 
SET first_name = 'NewFirst', last_name = 'NewLast', updated_at = NOW()
WHERE email = 'admin@pulseflowapp.com';
*/

-- =============================================================================
-- 🔒 DEACTIVATE / REACTIVATE ADMIN
-- =============================================================================

-- Deactivate an admin (soft delete - recommended)
/*
UPDATE pulseflow_admins 
SET is_active = false, updated_at = NOW()
WHERE email = 'admin-to-remove@pulseflowapp.com';
*/

-- Reactivate an admin
/*
UPDATE pulseflow_admins 
SET is_active = true, updated_at = NOW()
WHERE email = 'admin@pulseflowapp.com';
*/

-- =============================================================================
-- 🗑️ DELETE ADMIN (Hard delete - use with caution)
-- =============================================================================

/*
-- Delete from pulseflow_admins table
DELETE FROM pulseflow_admins 
WHERE email = 'admin-to-delete@pulseflowapp.com';

-- Note: You should also delete from Supabase Auth:
-- Go to Authentication → Users → Find user → Delete
*/

-- =============================================================================
-- 🔍 AUDIT & TROUBLESHOOTING
-- =============================================================================

-- Find admin by email
SELECT * FROM pulseflow_admins WHERE email ILIKE '%search@%';

-- Check if email exists in auth.users
SELECT id, email, created_at, last_sign_in_at 
FROM auth.users 
WHERE email = 'admin@pulseflowapp.com';

-- Find admins not linked to auth.users (orphaned records)
SELECT pa.* 
FROM pulseflow_admins pa
LEFT JOIN auth.users au ON pa.auth_user_id = au.id
WHERE au.id IS NULL;

-- View recent admin logins
SELECT email, role, last_login_at 
FROM pulseflow_admins 
WHERE last_login_at IS NOT NULL 
ORDER BY last_login_at DESC 
LIMIT 10;

-- View admin audit logs (if you have this table)
SELECT * FROM admin_audit_logs ORDER BY created_at DESC LIMIT 20;

-- =============================================================================
-- 🚀 QUICK SETUP: Create First Super Admin
-- =============================================================================
-- Use this when setting up a new environment

/*
-- After creating auth user, run:
INSERT INTO pulseflow_admins (
  auth_user_id,
  email,
  first_name,
  last_name,
  role,
  is_active
) VALUES (
  'PASTE-AUTH-USER-ID-HERE',
  'emmanuel@pulseflowapp.com',
  'Emmanuel',
  'Okanlawon',
  'super_admin',
  true
);
*/

-- =============================================================================
-- 📊 ADMIN STATISTICS
-- =============================================================================

-- Dashboard summary
SELECT 
  (SELECT COUNT(*) FROM pulseflow_admins WHERE is_active = true) as total_active_admins,
  (SELECT COUNT(*) FROM pulseflow_admins WHERE role = 'super_admin' AND is_active = true) as super_admins,
  (SELECT COUNT(*) FROM pulseflow_admins WHERE role = 'admin' AND is_active = true) as admins,
  (SELECT COUNT(*) FROM pulseflow_admins WHERE role = 'sales' AND is_active = true) as sales,
  (SELECT COUNT(*) FROM pulseflow_admins WHERE role = 'viewer' AND is_active = true) as viewers;
