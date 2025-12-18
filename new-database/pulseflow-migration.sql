-- =============================================================================
-- PULSEFLOW DATABASE MIGRATION SCRIPT
-- =============================================================================
-- This script migrates from the old simple user_profiles system to the new
-- multi-tenant architecture. Run this AFTER running pulseflow-complete-schema.sql
-- =============================================================================

-- =============================================================================
-- STEP 1: BACKUP EXISTING DATA
-- =============================================================================

-- Create backup of old user_profiles table
CREATE TABLE IF NOT EXISTS old_user_profiles_backup AS 
SELECT * FROM public.user_profiles;

SELECT 'Backed up existing user_profiles to old_user_profiles_backup' as message;

-- =============================================================================
-- STEP 2: DROP OLD USER_PROFILES TABLE
-- =============================================================================

-- Drop the old user_profiles table (we'll recreate it with new structure)
DROP TABLE IF EXISTS public.user_profiles CASCADE;

SELECT 'Dropped old user_profiles table' as message;

-- =============================================================================
-- STEP 3: MIGRATE EXISTING USERS (IF ANY)
-- =============================================================================

-- Note: Since you said there are no users yet, this section won't do anything.
-- But it's here in case you run this later when you have test users.

DO $$
DECLARE
  user_record RECORD;
  new_org_id UUID;
  new_member_id UUID;
BEGIN
  -- Loop through backed up users
  FOR user_record IN 
    SELECT * FROM old_user_profiles_backup
  LOOP
    -- Create an organization for this user's company
    -- Note: customer_type defaults to NULL for migrated users (can be updated manually)
    INSERT INTO customer_organizations (
      company_name,
      company_email,
      customer_type,  -- Will be NULL for migrated users
      organization_type,
      team_size_or_clients,
      primary_role,
      main_challenge,
      other_challenge,
      status,
      subscription_status,
      created_at,
      updated_at
    )
    VALUES (
      user_record.company,
      user_record.email,
      NULL,  -- customer_type unknown for legacy users
      user_record.organization_type,
      user_record.team_size_or_clients,
      user_record.primary_role,
      user_record.main_challenge,
      user_record.other_challenge,
      'active', -- Auto-approve migrated users
      'active',
      user_record.created_at,
      user_record.updated_at
    )
    RETURNING id INTO new_org_id;
    
    -- Create organization member for this user (as org_admin)
    INSERT INTO organization_members (
      auth_user_id,
      organization_id,
      email,
      first_name,
      last_name,
      role,
      is_active,
      created_at,
      updated_at
    )
    VALUES (
      user_record.id, -- auth_user_id from old table
      new_org_id,
      user_record.email,
      user_record.first_name,
      user_record.last_name,
      'org_admin', -- Make them admin of their org
      true,
      user_record.created_at,
      user_record.updated_at
    )
    RETURNING id INTO new_member_id;
    
    -- Create user profile (extended info)
    INSERT INTO user_profiles (
      id,
      created_at,
      updated_at
    )
    VALUES (
      new_member_id,
      user_record.created_at,
      user_record.updated_at
    );
    
    RAISE NOTICE 'Migrated user: % (Org: %)', user_record.email, new_org_id;
  END LOOP;
  
  IF NOT FOUND THEN
    RAISE NOTICE 'No existing users to migrate';
  END IF;
END $$;

-- =============================================================================
-- STEP 4: CREATE YOUR FIRST PULSEFLOW ADMIN
-- =============================================================================

-- ⚠️ IMPORTANT: You must create the Supabase auth user FIRST via the dashboard!
-- Then update the auth_user_id below with the UUID from Supabase Auth

DO $$
DECLARE
  emmanuel_auth_id UUID;
  boss_auth_id UUID;
BEGIN
  -- Get Emmanuel's auth user ID (if exists)
  -- Replace 'emmanuel@nolum.be' with your actual email
  SELECT id INTO emmanuel_auth_id 
  FROM auth.users 
  WHERE email = 'emmanuel@nolum.be' 
  LIMIT 1;
  
  -- If Emmanuel's auth user exists, create admin profile
  IF emmanuel_auth_id IS NOT NULL THEN
    INSERT INTO pulseflow_admins (
      auth_user_id,
      email,
      first_name,
      last_name,
      role,
      is_active
    )
    VALUES (
      emmanuel_auth_id,
      'emmanuel@nolum.be',
      'Emmanuel',
      'Okanlawon',
      'super_admin',
      true
    )
    ON CONFLICT (auth_user_id) DO NOTHING;
    
    RAISE NOTICE 'Created super admin for: emmanuel@nolum.be';
  ELSE
    RAISE NOTICE 'WARNING: No auth.users entry found for emmanuel@nolum.be';
    RAISE NOTICE 'You must create the user in Supabase Dashboard → Authentication → Users first!';
  END IF;
  
  -- Repeat for boss if needed
  -- Get Boss auth user ID (if exists)
  SELECT id INTO boss_auth_id 
  FROM auth.users 
  WHERE email = 'boss@nolum.be'  -- Replace with boss's actual email
  LIMIT 1;
  
  IF boss_auth_id IS NOT NULL THEN
    INSERT INTO pulseflow_admins (
      auth_user_id,
      email,
      first_name,
      last_name,
      role,
      is_active
    )
    VALUES (
      boss_auth_id,
      'boss@nolum.be', -- Replace with boss's actual email
      'Boss',          -- Replace with boss's first name
      'Name',          -- Replace with boss's last name
      'super_admin',
      true
    )
    ON CONFLICT (auth_user_id) DO NOTHING;
    
    RAISE NOTICE 'Created super admin for: boss@nolum.be';
  ELSE
    RAISE NOTICE 'WARNING: No auth.users entry found for boss@nolum.be';
  END IF;
END $$;

-- =============================================================================
-- STEP 5: CREATE TEST DATA (OPTIONAL - FOR DEVELOPMENT)
-- =============================================================================

-- Uncomment this section if you want to create test data for development

/*
DO $$
DECLARE
  test_org_id UUID;
  test_member_id UUID;
BEGIN
  -- Create test organization
  INSERT INTO customer_organizations (
    company_name,
    company_email,
    organization_type,
    team_size_or_clients,
    status,
    subscription_status,
    subscription_tier
  )
  VALUES (
    'Test Tech Corp',
    'admin@testtechcorp.com',
    'Company',
    '10-50 employees',
    'active',
    'active',
    'pro'
  )
  RETURNING id INTO test_org_id;
  
  RAISE NOTICE 'Created test organization: Test Tech Corp (ID: %)', test_org_id;
  
  -- Note: You still need to create auth.users entries in Supabase Dashboard
  -- Then link them as organization members using their auth_user_id
  
END $$;
*/

-- =============================================================================
-- STEP 6: VERIFICATION QUERIES
-- =============================================================================

-- Check migration results
SELECT 'Pulseflow Admins:' as check_type, COUNT(*) as count FROM pulseflow_admins
UNION ALL
SELECT 'Customer Organizations:', COUNT(*) FROM customer_organizations
UNION ALL
SELECT 'Organization Members:', COUNT(*) FROM organization_members
UNION ALL
SELECT 'User Profiles:', COUNT(*) FROM user_profiles
UNION ALL
SELECT 'Registration Queue:', COUNT(*) FROM customer_registration_queue;

-- =============================================================================
-- STEP 7: CLEANUP (OPTIONAL)
-- =============================================================================

-- After verifying everything works, you can optionally drop the backup table
-- UNCOMMENT ONLY AFTER VERIFYING MIGRATION SUCCESS:
-- DROP TABLE IF EXISTS old_user_profiles_backup;

-- =============================================================================
-- ✅ MIGRATION COMPLETE
-- =============================================================================

SELECT '
=============================================================================
✅ MIGRATION COMPLETE!
=============================================================================

NEXT STEPS:
1. Create Pulseflow admin users in Supabase Dashboard → Authentication → Users
   - emmanuel@nolum.be
   - boss@nolum.be (or actual email)
   
2. Re-run this migration script to link those auth users to pulseflow_admins
   
3. Update your application code to use the new table structure
   
4. Test customer registration flow
   
5. Test admin login and customer approval workflow

For detailed implementation instructions, see:
- pulseflow-implementation-guide.md
- pulseflow-typescript-types.ts
- pulseflow-admin-auth-service.ts
- pulseflow-customer-auth-service.ts
=============================================================================
' as message;
