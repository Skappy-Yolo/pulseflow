# PULSEFLOW TESTING GUIDE

## 📋 Overview

This guide provides comprehensive test scenarios for the new multi-tenant Pulseflow authentication system. Follow these tests in order to ensure everything works correctly.

---

## 🧪 TEST ENVIRONMENT SETUP

### **Before Testing:**

1. ✅ Database schema deployed
2. ✅ Migration completed
3. ✅ At least one Pulseflow admin created
4. ✅ Application code deployed
5. ✅ Browser DevTools open (Console tab)

### **Test Users:**

You'll need these accounts for testing:

**Pulseflow Admins:**
- Super Admin: `your-email@nolum.be` 
- Regular Admin: `boss@nolum.be` (if created)

**Test Customers:**
- Will be created during testing

---

## 🔐 PHASE 1: ADMIN AUTHENTICATION TESTS

### **Test 1.1: Admin Login - Success**

**Steps:**
1. Navigate to `/admin/login`
2. Enter your super admin email
3. Enter correct password
4. Click "Sign in"

**Expected Result:**
- ✅ Redirected to `/admin/dashboard`
- ✅ See welcome message with your name
- ✅ Dashboard shows stats (all zeros initially)
- ✅ No errors in console

**If Failed:**
- Check Supabase logs
- Verify admin user exists in `pulseflow_admins` table
- Check browser console for errors

---

### **Test 1.2: Admin Login - Invalid Credentials**

**Steps:**
1. Navigate to `/admin/login`
2. Enter admin email
3. Enter **wrong** password
4. Click "Sign in"

**Expected Result:**
- ✅ Error message: "Invalid email or password"
- ✅ NOT redirected
- ✅ Still on login page

---

### **Test 1.3: Admin Login - Non-Admin User**

**Steps:**
1. Create a regular Supabase user (not in `pulseflow_admins`)
2. Try to login at `/admin/login` with these credentials

**Expected Result:**
- ✅ Error message: "You do not have admin access to this system"
- ✅ NOT logged in
- ✅ Cannot access admin dashboard

---

### **Test 1.4: Admin Session Persistence**

**Steps:**
1. Login as admin
2. Navigate to dashboard
3. Refresh page
4. Close browser tab
5. Reopen browser
6. Navigate to `/admin/dashboard`

**Expected Result:**
- ✅ Still logged in after refresh
- ✅ Session persists across tab closes
- ✅ Session persists for ~1 hour (Supabase default)

---

### **Test 1.5: Admin Logout**

**Steps:**
1. Login as admin
2. Navigate to dashboard
3. Click "Logout" button
4. Try to access `/admin/dashboard` directly

**Expected Result:**
- ✅ Logged out successfully
- ✅ Redirected to `/admin/login`
- ✅ Cannot access dashboard without logging in again

---

## 📝 PHASE 2: CUSTOMER REGISTRATION TESTS

### **Test 2.1: Customer Registration - Success**

**Steps:**
1. Navigate to `/signup` or customer registration page
2. Fill in form:
   - First Name: "Test"
   - Last Name: "Customer"
   - Email: "test@techcorp.com"
   - Company: "TechCorp Test"
   - Organization Type: "Company"
   - Team Size: "10-50 employees"
   - Role: "Manager"
   - Challenge: "Data quality"
3. Submit form

**Expected Result:**
- ✅ Success message displayed
- ✅ Registration added to queue
- ✅ No errors

**Verify in Database:**
```sql
SELECT * FROM customer_registration_queue 
WHERE email = 'test@techcorp.com';
```
Should show: `status = 'pending'`

---

### **Test 2.2: Customer Registration - Duplicate Email**

**Steps:**
1. Try to register again with `test@techcorp.com`

**Expected Result:**
- ✅ Error: "This email has already been registered"
- ✅ Registration NOT duplicated

---

### **Test 2.3: Customer Registration - Email Validation**

**Steps:**
1. Try to register with invalid emails:
   - `notanemail`
   - `@example.com`
   - `test@`

**Expected Result:**
- ✅ Form validation errors
- ✅ Cannot submit with invalid email

---

### **Test 2.4: Customer Registration - Required Fields**

**Steps:**
1. Try to submit form with empty required fields

**Expected Result:**
- ✅ Form shows validation errors
- ✅ Cannot submit incomplete form

---

## ✅ PHASE 3: CUSTOMER APPROVAL WORKFLOW TESTS

### **Test 3.1: View Registration Queue**

**Steps:**
1. Login as Pulseflow admin
2. Navigate to registration queue or customer management page

**Expected Result:**
- ✅ See pending registration from Test 2.1
- ✅ Shows: name, email, company, status = "pending"
- ✅ Shows action buttons: "Approve" / "Reject"

---

### **Test 3.2: Approve Customer Registration**

**Steps:**
1. In admin dashboard, find Test Customer registration
2. Click "Approve" button
3. Select subscription tier: "Basic" or "Trial"
4. Optionally add notes
5. Confirm approval

**Expected Result:**
- ✅ Success message displayed
- ✅ Registration status changes to "approved"
- ✅ New organization created
- ✅ New organization member created
- ✅ New auth.users entry created

**Verify in Database:**
```sql
-- Check registration updated
SELECT status, organization_id 
FROM customer_registration_queue 
WHERE email = 'test@techcorp.com';
-- Should show: status = 'approved', organization_id = UUID

-- Check organization created
SELECT * FROM customer_organizations 
WHERE company_email = 'test@techcorp.com';
-- Should show: status = 'active', subscription_status = 'trial'

-- Check member created
SELECT * FROM organization_members 
WHERE email = 'test@techcorp.com';
-- Should show: role = 'org_admin', is_active = true

-- Check auth user created
SELECT * FROM auth.users 
WHERE email = 'test@techcorp.com';
-- Should exist
```

**Important:** Save the temporary password displayed after approval!

---

### **Test 3.3: Reject Customer Registration**

**Steps:**
1. Create another test registration: `test2@startup.com`
2. In admin dashboard, click "Reject" on this registration
3. Enter rejection reason: "Does not meet criteria"
4. Confirm rejection

**Expected Result:**
- ✅ Registration status = "rejected"
- ✅ Rejection reason saved
- ✅ NO organization created
- ✅ NO auth user created

**Verify in Database:**
```sql
SELECT status, rejection_reason 
FROM customer_registration_queue 
WHERE email = 'test2@startup.com';
-- Should show: status = 'rejected', rejection_reason filled
```

---

### **Test 3.4: Admin Audit Log**

**Steps:**
1. Check admin audit logs

**Expected Result:**
- ✅ Log entry for customer approval
- ✅ Log entry for customer rejection
- ✅ Shows admin who performed action
- ✅ Shows timestamp

**Verify in Database:**
```sql
SELECT * FROM admin_audit_logs 
ORDER BY created_at DESC 
LIMIT 10;
-- Should show recent approval/rejection actions
```

---

## 🔓 PHASE 4: CUSTOMER LOGIN TESTS

### **Test 4.1: Customer Login - Success**

**Steps:**
1. Navigate to `/login` (customer login page)
2. Enter: `test@techcorp.com`
3. Enter: temporary password from approval step
4. Click "Sign in"

**Expected Result:**
- ✅ Logged in successfully
- ✅ Redirected to customer dashboard
- ✅ See organization name: "TechCorp Test"
- ✅ See user role: "Org Admin"

---

### **Test 4.2: Customer Login - Before Approval**

**Steps:**
1. Create new registration: `test3@newco.com`
2. DO NOT approve it yet
3. Try to login with `test3@newco.com`

**Expected Result:**
- ✅ Error: "Invalid email or password" 
- ✅ Cannot login (no auth user exists yet)

---

### **Test 4.3: Customer Password Change**

**Steps:**
1. Login as `test@techcorp.com` (using temp password)
2. Navigate to profile/settings
3. Change password to new secure password
4. Logout
5. Login again with new password

**Expected Result:**
- ✅ Password changed successfully
- ✅ Can login with new password
- ✅ Cannot login with old temp password

---

### **Test 4.4: Customer Session Isolation**

**Steps:**
1. Login as `test@techcorp.com` in Browser 1
2. Open incognito/different browser (Browser 2)
3. Login as admin in Browser 2
4. Both should stay logged in separately

**Expected Result:**
- ✅ Customer session in Browser 1 still active
- ✅ Admin session in Browser 2 active
- ✅ Sessions are completely separate
- ✅ No cross-contamination

---

## 👥 PHASE 5: ORGANIZATION MEMBER MANAGEMENT TESTS

### **Test 5.1: Invite New Member (Org Admin)**

**Steps:**
1. Login as `test@techcorp.com` (org admin)
2. Navigate to team/members page
3. Click "Invite Member"
4. Fill in:
   - Email: `manager@techcorp.com`
   - First Name: "John"
   - Last Name: "Manager"
   - Role: "Manager"
5. Send invitation

**Expected Result:**
- ✅ Invitation sent successfully
- ✅ New member created with temporary password
- ✅ Member status: active
- ✅ Member role: "manager"

**Verify in Database:**
```sql
SELECT * FROM organization_members 
WHERE email = 'manager@techcorp.com';
-- Should exist with role = 'manager'
```

---

### **Test 5.2: Member Login After Invitation**

**Steps:**
1. Get temporary password for `manager@techcorp.com`
2. Login at `/login` with these credentials

**Expected Result:**
- ✅ Login successful
- ✅ See same organization: "TechCorp Test"
- ✅ See role: "Manager"
- ✅ Limited permissions compared to org admin

---

### **Test 5.3: Member Permission Tests**

**As Manager (`manager@techcorp.com`):**
- ✅ Can view organization members
- ✅ Can invite new members
- ✅ Cannot change org admin's role
- ✅ Cannot deactivate org admin

**As Org Admin (`test@techcorp.com`):**
- ✅ Can do everything manager can
- ✅ Can change member roles
- ✅ Can deactivate members
- ✅ Can manage organization settings

---

### **Test 5.4: Update Member Role**

**Steps:**
1. Login as org admin (`test@techcorp.com`)
2. Navigate to members page
3. Find `manager@techcorp.com`
4. Change role to "Viewer"
5. Save

**Expected Result:**
- ✅ Role updated successfully
- ✅ Manager now has viewer permissions
- ✅ Can only view data, not edit

---

### **Test 5.5: Deactivate Member**

**Steps:**
1. As org admin, deactivate `manager@techcorp.com`
2. Try to login as manager

**Expected Result:**
- ✅ Member deactivated
- ✅ Cannot login anymore
- ✅ Error: "Account is not active"

---

## 🔐 PHASE 6: SUPER ADMIN SPECIAL POWERS TESTS

### **Test 6.1: Super Admin Views All Organizations**

**Steps:**
1. Login as super admin
2. Navigate to customer organizations page

**Expected Result:**
- ✅ See ALL organizations (not just assigned ones)
- ✅ See organization stats
- ✅ Can filter by status, subscription, etc.

---

### **Test 6.2: Reset Customer Password**

**Steps:**
1. As super admin, find TechCorp organization
2. Find member `test@techcorp.com`
3. Click "Reset Password"
4. Confirm action

**Expected Result:**
- ✅ New temporary password generated
- ✅ Password displayed to admin
- ✅ Action logged in audit logs
- ✅ Customer can login with new password

**Verify in Audit Log:**
```sql
SELECT * FROM admin_audit_logs 
WHERE action = 'customer_password_reset' 
ORDER BY created_at DESC 
LIMIT 1;
```

---

### **Test 6.3: Suspend Organization**

**Steps:**
1. As super admin, suspend TechCorp
2. Try to login as `test@techcorp.com`

**Expected Result:**
- ✅ Organization status = "suspended"
- ✅ Customer cannot login
- ✅ Error: "Organization account is not active"

**To Restore:**
1. As super admin, reactivate TechCorp
2. Customer can login again

---

### **Test 6.4: Login As Customer (Audit Trail)**

**Steps:**
1. As super admin, click "Login as Customer" for TechCorp
2. Confirm action
3. Redirected to customer dashboard

**Expected Result:**
- ✅ Now viewing customer dashboard AS TechCorp
- ✅ Banner shows: "Viewing as TechCorp - You are Super Admin"
- ✅ Can see customer data
- ✅ Action logged in `super_admin_access_logs`

**Verify in Database:**
```sql
SELECT * FROM super_admin_access_logs 
ORDER BY created_at DESC 
LIMIT 1;
-- Should show admin_id, organization_id, action = 'logged_in_as_customer'
```

---

## 📊 PHASE 7: DASHBOARD & STATS TESTS

### **Test 7.1: Admin Dashboard Stats**

**Steps:**
1. Login as admin
2. View dashboard

**Expected Result:**
- ✅ Total Organizations: 1 (TechCorp)
- ✅ Active Organizations: 1 (or 0 if suspended)
- ✅ Pending Approvals: 0 (if all processed)
- ✅ Total Members: 2 (test@techcorp + manager@techcorp)

---

### **Test 7.2: Recent Activity**

**Expected Result:**
- ✅ Shows recent registrations (last 7 days)
- ✅ Shows recent approvals/rejections
- ✅ Shows latest organization signups

---

## 🔒 PHASE 8: SECURITY TESTS

### **Test 8.1: RLS Policy - Customer Isolation**

**Steps:**
1. Create second organization: "StartupXYZ"
2. Login as TechCorp user
3. Try to query StartupXYZ data via API

**Expected Result:**
- ✅ Cannot see StartupXYZ data
- ✅ Only see own organization data
- ✅ RLS policies enforcing isolation

---

### **Test 8.2: RLS Policy - Admin Access**

**Steps:**
1. Login as Pulseflow admin
2. Query organizations table

**Expected Result:**
- ✅ Can see ALL organizations
- ✅ Can see all members across all orgs
- ✅ Admin RLS policies working

---

### **Test 8.3: Direct API Access Blocked**

**Steps:**
1. Logout completely
2. Try to access `/admin/dashboard` directly
3. Try to call API endpoints directly

**Expected Result:**
- ✅ Redirected to login
- ✅ API returns 401 Unauthorized
- ✅ Cannot bypass authentication

---

### **Test 8.4: SQL Injection Prevention**

**Steps:**
1. Try to login with:
   - Email: `admin@test.com' OR '1'='1`
   - Password: `anything`

**Expected Result:**
- ✅ Login fails
- ✅ No SQL injection vulnerability
- ✅ Supabase properly sanitizes inputs

---

## 🧹 CLEANUP AFTER TESTING

After successful testing:

```sql
-- Remove test data
DELETE FROM organization_members WHERE email LIKE '%test%';
DELETE FROM customer_organizations WHERE company_name LIKE '%Test%';
DELETE FROM customer_registration_queue WHERE email LIKE '%test%';
DELETE FROM admin_audit_logs WHERE created_at < NOW() - INTERVAL '1 hour';
```

---

## ✅ FINAL CHECKLIST

### **Authentication:**
- [ ] Admin login works
- [ ] Customer login works
- [ ] Logout works for both
- [ ] Sessions persist correctly

### **Registration & Approval:**
- [ ] Customer can register
- [ ] Admin can view queue
- [ ] Admin can approve/reject
- [ ] Approved customers can login

### **Permissions:**
- [ ] Org admin can invite members
- [ ] Members have correct permissions
- [ ] Super admin has all powers
- [ ] RLS policies enforcing isolation

### **Security:**
- [ ] Cannot access admin without credentials
- [ ] Organizations are isolated
- [ ] Audit logs working
- [ ] No security vulnerabilities

### **User Experience:**
- [ ] Error messages are clear
- [ ] Success messages display
- [ ] UI is responsive
- [ ] No console errors

---

## 🐛 BUG REPORTING TEMPLATE

If you find issues during testing:

```
**Test Case:** Test X.X name
**Expected:** What should happen
**Actual:** What actually happened
**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Error Messages:** 
[Paste console errors here]

**Database State:**
[Paste relevant SQL query results]

**Browser:** Chrome/Firefox/Safari version
**Environment:** Development/Staging/Production
```

---

## 🎉 SUCCESS CRITERIA

Your system is **production-ready** when:

✅ All Phase 1-7 tests pass
✅ All Phase 8 security tests pass  
✅ No errors in console
✅ Database audit logs working
✅ Multi-tenancy working correctly
✅ Performance is acceptable (<2s page loads)

**Congratulations! Your authentication system is fully tested and ready! 🚀**
