# PulseFlow Testing Checklist

## 🧪 Complete Testing Guide

Use this checklist to verify everything works correctly after the migration.

---

## 1️⃣ Basic Navigation Tests

### Consultant Dashboard
- [ ] Visit `/consultant` - Should show Consuela's dashboard
- [ ] Visit `/consultant/clients` - Should show clients list page
- [ ] Visit `/` - Should redirect to `/consultant`
- [ ] Click "Overview" in sidebar - Should navigate to `/consultant`
- [ ] Click "Clients" in sidebar - Should navigate to `/consultant/clients`

### Executive Dashboard
- [ ] Visit `/executive` - Should show Delphine's dashboard
- [ ] Visit `/executive/integrations` - Should show integrations page
- [ ] Visit `/executive/team` - Should show team management page
- [ ] Visit `/executive/analytics` - Should show data analytics page
- [ ] Visit `/executive/reports` - Should show reports page
- [ ] Click each sidebar item - Should navigate to correct page

---

## 2️⃣ Dashboard Switching Tests

### From Consultant to Executive
- [ ] Start on consultant dashboard
- [ ] Click profile dropdown (top right)
- [ ] Click "Switch to Executive View"
- [ ] Should navigate to `/executive`
- [ ] Should see Delphine's name in header
- [ ] Executive sidebar should be visible

### From Executive to Consultant
- [ ] Start on executive dashboard
- [ ] Click profile dropdown (top right)
- [ ] Click "Switch to Consultant View"
- [ ] Should navigate to `/consultant`
- [ ] Should see Consuela's name in header
- [ ] Consultant sidebar should be visible

---

## 3️⃣ Browser Navigation Tests

### Back Button
- [ ] Navigate: `/consultant` → `/consultant/clients` → `/executive`
- [ ] Press back button - Should go to `/consultant/clients`
- [ ] Press back button again - Should go to `/consultant`

### Forward Button
- [ ] After pressing back twice (from above)
- [ ] Press forward button - Should go to `/consultant/clients`
- [ ] Press forward button again - Should go to `/executive`

### Direct URL Access
- [ ] Open new tab, type `/consultant` - Should work
- [ ] Open new tab, type `/executive/reports` - Should work
- [ ] Open new tab, type `/invalid-url` - Should redirect to `/consultant`

### Page Refresh
- [ ] Navigate to `/consultant` and refresh - Should stay on `/consultant`
- [ ] Navigate to `/executive/reports` and refresh - Should stay on reports page
- [ ] Navigate to `/consultant/clients` and refresh - Should stay on clients page

---

## 4️⃣ Mobile Responsive Tests

### Consultant Dashboard Mobile
- [ ] Resize browser to mobile width (< 768px)
- [ ] Hamburger menu should be visible
- [ ] Click hamburger - Sidebar opens from left
- [ ] Click outside sidebar - Sidebar closes
- [ ] Navigation items work on mobile
- [ ] Statistics cards stack vertically
- [ ] Client cards stack vertically
- [ ] Charts are readable on mobile

### Executive Dashboard Mobile
- [ ] Resize browser to mobile width
- [ ] Hamburger menu should be visible
- [ ] Click hamburger - Sidebar opens from left
- [ ] Click outside sidebar - Sidebar closes
- [ ] All pages are mobile responsive
- [ ] Charts and cards stack properly
- [ ] Modals work on mobile

---

## 5️⃣ Sidebar Navigation Tests

### Consultant Sidebar
- [ ] "Overview" highlights when on `/consultant`
- [ ] "Clients" highlights when on `/consultant/clients`
- [ ] Expandable menus work (Cross-Client Insights, etc.)
- [ ] Sidebar collapses on mobile after clicking item
- [ ] Logo links to home (if implemented)

### Executive Sidebar
- [ ] "Overview" highlights when on `/executive`
- [ ] "Integrations" highlights when on integrations page
- [ ] "Team Management" highlights when on team page
- [ ] "Data Analytics" highlights when on analytics page
- [ ] "Reports" highlights when on reports page
- [ ] Sidebar stays visible on desktop (280px wide)

---

## 6️⃣ Client Details Page Tests

### Navigation to Client Details
- [ ] Go to `/consultant/clients`
- [ ] Click on a client card
- [ ] Should navigate to `/consultant/clients/:clientId`
- [ ] URL should show client ID
- [ ] Client details should load

### Client Details Functionality
- [ ] Back button returns to `/consultant/clients`
- [ ] Breadcrumb navigation works
- [ ] All tabs work (Overview, Activity, Team, Documents)
- [ ] Charts render correctly
- [ ] Contact information displays
- [ ] Team members list displays

---

## 7️⃣ Interactive Component Tests

### Consultant Dashboard
- [ ] Client cards display correctly
- [ ] Score badges show correct colors
- [ ] Trend indicators work (up/down/stable)
- [ ] Charts render (Comparative Chart, Pie Chart)
- [ ] Product lifecycles display
- [ ] Statistics cards show data
- [ ] Footer displays

### Executive Dashboard Overview
- [ ] Funnel performance card displays
- [ ] Monthly goal progress shows
- [ ] Critical insights cards display
- [ ] Color-coded backgrounds work (red/amber/green)
- [ ] Charts render correctly
- [ ] All metrics display

### Executive Integrations Page
- [ ] Integration cards display
- [ ] Connect/Disconnect buttons work
- [ ] Status badges show correctly
- [ ] Search/filter works (if implemented)

### Executive Team Management Page
- [ ] Team members list displays
- [ ] "Add Team Member" button works
- [ ] Modal opens with form
- [ ] Permission toggles work
- [ ] Form validation works
- [ ] Can add/edit team members

### Executive Data Analytics Page
- [ ] All analytics charts render
- [ ] Date filters work
- [ ] Metrics display correctly
- [ ] Export buttons work (if implemented)

### Executive Reports Page
- [ ] Report cards display
- [ ] Status management works
- [ ] Filter system works
- [ ] Download buttons work (if implemented)
- [ ] Can create new reports (if implemented)

---

## 8️⃣ Notification Tests

### Consultant Dashboard
- [ ] Bell icon shows notification badge
- [ ] Click bell - Notification panel opens
- [ ] Notifications display correctly
- [ ] Click outside - Panel closes
- [ ] Mark as read works
- [ ] Notification links work

---

## 9️⃣ Search Functionality Tests

### Consultant Search
- [ ] Search bar visible on desktop
- [ ] Can type in search bar
- [ ] Search icon visible on mobile
- [ ] Search functionality works (if implemented)

### Executive Search
- [ ] Search bar visible in header
- [ ] Can type in search bar
- [ ] Placeholder text shows
- [ ] Search results display (if implemented)

---

## 🔟 Performance Tests

### Load Times
- [ ] Initial page load < 3 seconds
- [ ] Route transitions < 500ms
- [ ] No visible lag when navigating
- [ ] Images load progressively
- [ ] Charts render smoothly

### Console Checks
- [ ] Open browser console (F12)
- [ ] No JavaScript errors in red
- [ ] No 404 errors for assets
- [ ] No warnings about deprecated features
- [ ] React DevTools shows no issues

---

## 1️⃣1️⃣ Data Display Tests

### Consultant Dashboard Data
- [ ] "Total Clients" shows: 12
- [ ] "Active Projects" shows: 34
- [ ] "Revenue" shows: $47.2K
- [ ] "Team Members" shows: 8
- [ ] ENIES score: 45 (red)
- [ ] Bunqqi score: 94 (green)
- [ ] Tripids score: 78 (orange)

### Executive Dashboard Data
- [ ] Monthly goal: $2.1M / $3M
- [ ] Progress bar shows correct percentage
- [ ] Critical insights display
- [ ] All charts show data
- [ ] No "undefined" or "NaN" values

---

## 1️⃣2️⃣ Cross-Browser Tests

Test on multiple browsers:

### Chrome/Edge
- [ ] All features work
- [ ] Layout correct
- [ ] Performance good

### Firefox
- [ ] All features work
- [ ] Layout correct
- [ ] Performance good

### Safari (if available)
- [ ] All features work
- [ ] Layout correct
- [ ] Performance good

---

## 1️⃣3️⃣ Styling Tests

### Global Styles
- [ ] Brand colors correct (#005CE8)
- [ ] Typography consistent
- [ ] Spacing consistent
- [ ] Borders and shadows correct
- [ ] Hover states work

### Dark Mode (if implemented)
- [ ] Toggle works
- [ ] All pages support dark mode
- [ ] Colors readable
- [ ] Images/icons visible

---

## 1️⃣4️⃣ Accessibility Tests

### Keyboard Navigation
- [ ] Can tab through navigation
- [ ] Can press Enter to activate buttons
- [ ] Can Escape to close modals
- [ ] Focus indicators visible
- [ ] No keyboard traps

### Screen Reader (Basic)
- [ ] Buttons have aria-labels
- [ ] Images have alt text
- [ ] Forms have labels
- [ ] Landmarks are semantic

---

## 1️⃣5️⃣ Edge Cases

### Empty States
- [ ] What happens with no clients?
- [ ] What happens with no notifications?
- [ ] What happens with no team members?

### Error States
- [ ] Try invalid URL: `/invalid-route`
- [ ] Should redirect gracefully
- [ ] No crash or blank page

### Long Content
- [ ] Long client names display properly
- [ ] Long descriptions don't break layout
- [ ] Tables with many rows scroll correctly

---

## ✅ Final Verification

### Before Deployment
- [ ] All above tests passed
- [ ] No console errors
- [ ] All features working
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Ready for production

### After Deployment
- [ ] Test on production URL
- [ ] Verify HTTPS works
- [ ] Test from different locations
- [ ] Test on real mobile devices
- [ ] Monitor for 24 hours

---

## 📝 Test Results Template

```
Testing Date: _______________
Tester Name: _______________

Tests Passed: ____ / ____
Tests Failed: ____ / ____

Critical Issues Found:
1. ________________________________
2. ________________________________
3. ________________________________

Minor Issues Found:
1. ________________________________
2. ________________________________
3. ________________________________

Notes:
_____________________________________
_____________________________________
_____________________________________

Ready for Deployment: [ ] Yes  [ ] No
```

---

## 🐛 Bug Report Template

If you find issues, report them with:

```markdown
### Bug Description
Clear description of what went wrong

### Steps to Reproduce
1. Go to...
2. Click on...
3. See error...

### Expected Behavior
What should have happened

### Actual Behavior
What actually happened

### Browser & Device
- Browser: Chrome 120
- OS: Windows 11
- Device: Desktop
- Screen size: 1920x1080

### Screenshots
[Attach screenshots if relevant]

### Console Errors
[Paste any console errors]
```

---

## 🎯 Priority Levels

**P0 - Critical (Must Fix Before Deploy)**
- App crashes
- Routes don't work
- Data doesn't load
- Major security issues

**P1 - High (Fix Soon)**
- Layout breaks on mobile
- Charts don't render
- Navigation inconsistent

**P2 - Medium (Fix Eventually)**
- Minor styling issues
- Slow performance
- Missing tooltips

**P3 - Low (Nice to Have)**
- Cosmetic improvements
- Enhanced animations
- Additional features

---

**Happy Testing! 🚀**
