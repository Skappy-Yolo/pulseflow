# PulseFlow Migration Guide
## Separating Executive & Consultant Dashboards to Different URLs

---

## 📋 Current Architecture

### Current Setup (Hash-based Routing)
- **Consultant Dashboard**: `http://yourapp.com/#consultant`
- **Executive Dashboard**: `http://yourapp.com/#executive`
- **Single Entry Point**: `/App.tsx` handles routing logic
- **Shared Components**: `/components/ui/*` (RadixUI components, buttons, badges, etc.)
- **Consultant Components**: `/components/*` (DashboardCard, ClientCard, etc.)
- **Executive Components**: `/components/executive/*` (ExecutiveOverview, ReportsPage, etc.)

### File Structure
```
/
├── App.tsx                           # Main router (hash-based)
├── main.tsx                          # Entry point
├── index.html                        # HTML template
├── styles/
│   └── globals.css                   # Global styles & design tokens
├── components/
│   ├── ui/                           # Shared UI components (RadixUI)
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── figma/                        # Figma-specific utilities
│   │   └── ImageWithFallback.tsx
│   ├── executive/                    # Executive dashboard pages
│   │   ├── ExecutiveSidebar.tsx
│   │   ├── ExecutiveHeader.tsx
│   │   ├── ExecutiveOverview.tsx
│   │   ├── IntegrationsPage.tsx
│   │   ├── TeamManagementPage.tsx
│   │   ├── DataAnalyticsPage.tsx
│   │   └── ReportsPage.tsx
│   ├── Sidebar.tsx                   # Consultant sidebar
│   ├── Header.tsx                    # Consultant header
│   ├── DashboardCard.tsx             # Consultant components
│   ├── ClientCard.tsx
│   ├── ClientsPage.tsx
│   ├── ClientDetailsPage.tsx
│   └── NotificationPanel.tsx
└── imports/                          # Figma assets & SVGs
    └── svg-*.ts
```

---

## 🎯 Migration Options

### Option 1: React Router (Recommended)
**Best for**: Production apps with proper routing, SEO, and separate URLs

### Option 2: Separate Deployments
**Best for**: Complete isolation, different teams managing each dashboard

### Option 3: Keep Hash Routing (Current)
**Best for**: Quick prototyping, no server configuration needed

---

## 🚀 OPTION 1: Migrate to React Router (Recommended)

### Step 1: Install React Router
```bash
npm install react-router-dom
```

### Step 2: Create Route Components

#### Create `/pages/ConsultantDashboard.tsx`
Move consultant dashboard logic from App.tsx to this file:
- Import Sidebar, Header, and all consultant components
- Handle consultant page routing (overview, clients, client-details, notifications)

#### Create `/pages/ExecutiveDashboard.tsx`
Move executive dashboard logic from App.tsx to this file:
- Import ExecutiveSidebar, ExecutiveHeader, and all executive components
- Handle executive page routing (executive-overview, integrations, team, data-analytics, reports)

### Step 3: Update `/App.tsx`
Replace hash routing with React Router:

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ConsultantDashboard from './pages/ConsultantDashboard';
import ExecutiveDashboard from './pages/ExecutiveDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/consultant/*" element={<ConsultantDashboard />} />
        <Route path="/executive/*" element={<ExecutiveDashboard />} />
        <Route path="/" element={<Navigate to="/consultant" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Step 4: Update Navigation Links
Update all hash-based navigation to use React Router:

**Before:**
```tsx
<a href="#consultant">Switch to Consultant</a>
<a href="#executive">Switch to Executive</a>
```

**After:**
```tsx
import { Link } from 'react-router-dom';

<Link to="/consultant">Switch to Consultant</Link>
<Link to="/executive">Switch to Executive</Link>
```

### Step 5: Configure Server (CRITICAL!)
Add URL rewrite rules to handle client-side routing:

**For Vite (development):**
Already configured by default ✅

**For Production (Nginx):**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**For Production (Apache):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**For Vercel:**
Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**For Netlify:**
Create `_redirects`:
```
/*    /index.html   200
```

### New URLs After Migration:
- Consultant Dashboard: `http://yourapp.com/consultant`
- Executive Dashboard: `http://yourapp.com/executive`
- Clients Page: `http://yourapp.com/consultant/clients`
- Reports Page: `http://yourapp.com/executive/reports`

---

## 🔥 OPTION 2: Separate Deployments

### Architecture
Deploy two completely independent applications:
- **Consultant App**: `https://consultant.yourapp.com`
- **Executive App**: `https://executive.yourapp.com`

### Steps

1. **Duplicate the entire project twice:**
```bash
cp -r pulseflow pulseflow-consultant
cp -r pulseflow pulseflow-executive
```

2. **Clean up Consultant app:**
```bash
cd pulseflow-consultant
# Delete executive components
rm -rf components/executive
# Update App.tsx to only show consultant dashboard
# Remove all executive imports and routing
```

3. **Clean up Executive app:**
```bash
cd pulseflow-executive
# Delete consultant-specific components (keep shared UI)
rm components/ClientsPage.tsx
rm components/ClientDetailsPage.tsx
rm components/DashboardCard.tsx
# etc.
# Update App.tsx to only show executive dashboard
```

4. **Deploy separately:**
- Deploy consultant app to `consultant.yourapp.com`
- Deploy executive app to `executive.yourapp.com`

### Pros:
- ✅ Complete isolation
- ✅ Independent scaling
- ✅ Different teams can work independently
- ✅ Smaller bundle sizes

### Cons:
- ❌ Duplicate shared components (need to sync manually)
- ❌ More infrastructure to manage
- ❌ More deployment pipelines

---

## ⚠️ CRITICAL PRECAUTIONS

### 1. **Backup Everything First**
```bash
# Create a git branch
git checkout -b pre-migration-backup
git add .
git commit -m "Backup before routing migration"

# Or create a full copy
cp -r pulseflow pulseflow-backup
```

### 2. **Shared Components - DO NOT BREAK**
These components are used by BOTH dashboards:

**Critical Shared Files:**
- `/components/ui/*` - All RadixUI components
- `/components/figma/ImageWithFallback.tsx` - Used for images
- `/styles/globals.css` - Global styles & design tokens
- `/imports/*` - SVG assets and Figma imports

**⚠️ WARNING:** If you delete or modify these, BOTH dashboards will break!

### 3. **Import Path Changes**
When separating into `/pages`, update relative imports:

**Before (in App.tsx):**
```tsx
import { Sidebar } from './components/Sidebar';
```

**After (in /pages/ConsultantDashboard.tsx):**
```tsx
import { Sidebar } from '../components/Sidebar';
```

### 4. **State Management**
Currently, each dashboard manages its own state independently. If you need shared state (user authentication, theme, etc.):
- Consider using Context API or Zustand
- Be careful not to leak state between dashboards

### 5. **CSS & Styling**
The `/styles/globals.css` file contains:
- Brand colors (#005CE8)
- Typography tokens
- Custom CSS variables

**⚠️ DO NOT MODIFY** unless you want to change BOTH dashboards!

### 6. **Build & Bundle Size**
Current setup bundles everything together. After migration:
- React Router: Same bundle size (code splitting optional)
- Separate deployments: Smaller bundles (but duplicated shared code)

### 7. **Testing Checklist**
Before deploying, test:
- [ ] All navigation links work
- [ ] Browser back/forward buttons work
- [ ] Direct URL access works (e.g., `/executive/reports`)
- [ ] Mobile menu toggles work
- [ ] Page refreshes don't cause 404s
- [ ] All images/SVGs load correctly
- [ ] Notifications panel works
- [ ] Client cards load data
- [ ] Charts render properly
- [ ] Modals open/close correctly

---

## 📝 Recommended Migration Path

### Phase 1: Preparation (1-2 hours)
1. ✅ Backup current codebase
2. ✅ Create migration branch
3. ✅ Review all file dependencies
4. ✅ Document current functionality

### Phase 2: Code Restructure (3-4 hours)
1. ✅ Install React Router
2. ✅ Create `/pages/ConsultantDashboard.tsx`
3. ✅ Create `/pages/ExecutiveDashboard.tsx`
4. ✅ Move routing logic from App.tsx to page components
5. ✅ Update App.tsx to use React Router

### Phase 3: Update Navigation (1-2 hours)
1. ✅ Replace all `href="#..."` with React Router `<Link>`
2. ✅ Update sidebar navigation
3. ✅ Update header user dropdown
4. ✅ Test all navigation flows

### Phase 4: Testing (2-3 hours)
1. ✅ Test all routes manually
2. ✅ Test browser back/forward
3. ✅ Test direct URL access
4. ✅ Test mobile responsive
5. ✅ Test all interactive features

### Phase 5: Deploy (1 hour)
1. ✅ Configure server rewrites
2. ✅ Deploy to staging
3. ✅ Final testing on staging
4. ✅ Deploy to production

**Total Estimated Time: 8-12 hours**

---

## 🛠️ Quick Start: React Router Migration

If you want to proceed with React Router migration, here's what I can help you build:

1. **Create `/pages/ConsultantDashboard.tsx`** - Extract consultant logic
2. **Create `/pages/ExecutiveDashboard.tsx`** - Extract executive logic
3. **Update `/App.tsx`** - Implement React Router
4. **Update navigation components** - Replace hash links

Just let me know and I'll implement the full migration for you! 🚀

---

## 📞 Support & Questions

**Before migrating, consider:**
- Do you need SEO? → Use React Router
- Do you need shareable URLs? → Use React Router
- Is this just a prototype? → Keep hash routing
- Do you have separate teams? → Consider separate deployments
- Do you need authentication? → Plan auth routing strategy

**Common Issues:**
- **404 on refresh**: Configure server rewrites
- **Images not loading**: Check relative paths after moving files
- **Styles broken**: Verify globals.css is still imported
- **Navigation broken**: Update all hash links to React Router

---

## 📦 What NOT to Touch

**Protected Files (DO NOT DELETE OR MODIFY):**
- `/components/figma/ImageWithFallback.tsx` - System protected
- `/styles/globals.css` - Contains critical design tokens
- `/components/ui/*` - Shared across both dashboards
- `/imports/*` - Figma assets referenced throughout

**Safe to Modify:**
- `/App.tsx` - Will be replaced with React Router
- Individual page components
- Navigation components (Sidebar, ExecutiveSidebar)

---

## ✅ Final Checklist

Before going live:
- [ ] All tests passing
- [ ] Server rewrites configured
- [ ] Browser back/forward works
- [ ] All URLs shareable
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Images/assets loading
- [ ] Authentication works (if applicable)
- [ ] Analytics tracking updated (if applicable)
- [ ] Documentation updated

---

**Need help with the migration? I can implement it for you step-by-step!**

Just say: "Implement React Router migration" and I'll do it safely without breaking anything. 🚀
