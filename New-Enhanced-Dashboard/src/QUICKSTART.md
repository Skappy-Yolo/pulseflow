# 🚀 PulseFlow Quick Start Guide

## Get Started in 5 Minutes

---

## 1️⃣ Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## 2️⃣ Start Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

The app will open at: `http://localhost:5173`

---

## 3️⃣ Visit Your Dashboards

### Consultant Dashboard (Consuela N.)
```
http://localhost:5173/consultant
```

Features:
- Portfolio overview with statistics
- Client cards with health scores
- Performance charts
- Client management

### Executive Dashboard (Delphine C.)
```
http://localhost:5173/executive
```

Features:
- Executive overview with KPIs
- Team management
- Data analytics
- Reports center
- Integrations

---

## 4️⃣ Test Navigation

### Switch Between Dashboards
1. Click on your profile picture (top right)
2. Select "Switch to Executive View" or "Switch to Consultant View"

### Navigate Pages
- Use the sidebar menu to navigate
- All links work with proper URLs
- Browser back/forward buttons work

---

## 5️⃣ Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

---

## 📱 Available URLs

### Consultant Routes
- `/consultant` - Dashboard overview
- `/consultant/clients` - All clients
- `/consultant/clients/:id` - Specific client details

### Executive Routes
- `/executive` - Executive overview
- `/executive/integrations` - Integration management
- `/executive/team` - Team management
- `/executive/analytics` - Data analytics
- `/executive/reports` - Reports center

---

## 🎨 Project Structure

```
pulseflow/
├── App.tsx                          # Main router (React Router)
├── pages/
│   ├── ConsultantDashboard.tsx     # Consultant dashboard
│   └── ExecutiveDashboard.tsx      # Executive dashboard
├── components/
│   ├── dashboard/                   # Consultant components
│   │   ├── InteractiveSidebar.tsx
│   │   ├── InteractiveNavigation.tsx
│   │   ├── ClientsPage.tsx
│   │   └── ClientDetailsPage.tsx
│   ├── executive/                   # Executive components
│   │   ├── ExecutiveSidebar.tsx
│   │   ├── ExecutiveNavigation.tsx
│   │   ├── ExecutiveOverview.tsx
│   │   ├── IntegrationsPage.tsx
│   │   ├── TeamManagementPage.tsx
│   │   ├── DataAnalyticsPage.tsx
│   │   └── ReportsPage.tsx
│   └── ui/                          # Shared UI components (RadixUI)
├── styles/
│   └── globals.css                  # Global styles & design tokens
└── imports/                         # Figma assets & SVGs
```

---

## 🎯 Key Features

### ✅ Two Complete Dashboards
- **Consultant Dashboard** for portfolio managers
- **Executive Dashboard** for C-level executives

### ✅ Professional UI
- Built with RadixUI components
- Tailwind CSS for styling
- Motion animations
- Responsive design

### ✅ Real Routing
- URL-based navigation (no hash routing)
- Browser back/forward support
- Shareable links
- Direct URL access

### ✅ Rich Components
- Interactive client cards
- Performance charts (Recharts)
- Data tables
- Modal dialogs
- Notification panel
- Team management
- Reports system

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter (if configured)
npm run lint
```

---

## 📦 Deploy in 30 Seconds

### Vercel (Easiest)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**Note**: Server configuration is already included!
- `vercel.json` - For Vercel
- `_redirects` - For Netlify
- `.htaccess` - For Apache
- `nginx.conf` - For Nginx

---

## 🎨 Customization

### Change Brand Colors
Edit `/styles/globals.css`:
```css
:root {
  --primary: #005CE8;  /* Your brand color */
  --secondary: #0e5fd9;
  /* ... more colors */
}
```

### Add New Pages
1. Create component in `/components/dashboard/` or `/components/executive/`
2. Add route in `ConsultantDashboard.tsx` or `ExecutiveDashboard.tsx`
3. Add navigation item in sidebar component

### Modify Layouts
- Consultant: Edit `/pages/ConsultantDashboard.tsx`
- Executive: Edit `/pages/ExecutiveDashboard.tsx`

---

## 📚 Documentation

### Full Guides Available
- `MIGRATION_COMPLETE.md` - What changed and why
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `TESTING_CHECKLIST.md` - Comprehensive testing guide
- `MIGRATION_GUIDE.md` - Technical migration details

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
```bash
# Check for TypeScript errors
npm run build -- --verbose

# Check for linting errors
npm run lint
```

### Routes Don't Work Locally
Make sure you're using `npm run dev` (Vite handles routing automatically in dev mode).

---

## ⚡ Performance Tips

### Development
- Use Chrome DevTools for debugging
- React DevTools extension helps debug components
- Network tab shows slow requests

### Production
- Always run `npm run build` for optimized bundle
- Enable gzip compression on server
- Use CDN for static assets (optional)
- Monitor with Vercel Analytics or similar

---

## 🔐 Environment Variables (If Needed)

Create `.env.local`:
```env
VITE_API_URL=https://api.yourapp.com
VITE_ANALYTICS_ID=your-analytics-id
```

Use in code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 👥 User Roles

### Consuela N. - Portfolio Manager
- Access: `/consultant`
- Role: Manages client portfolios
- Views: Clients, projects, metrics

### Delphine C. - Chief Product Officer
- Access: `/executive`
- Role: Executive oversight
- Views: Team, analytics, reports, integrations

---

## 🎓 Learn More

### Technologies Used
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **RadixUI** - Component primitives
- **Motion** - Animations
- **Recharts** - Charts

### Helpful Links
- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [RadixUI](https://www.radix-ui.com/)
- [Motion](https://motion.dev/)

---

## ✅ Quick Checklist

Before you start:
- [ ] Node.js installed (v16 or higher)
- [ ] npm or yarn installed
- [ ] Code editor ready (VS Code recommended)

After installation:
- [ ] Dependencies installed
- [ ] Dev server starts
- [ ] Both dashboards load
- [ ] Navigation works
- [ ] No console errors

Ready to deploy:
- [ ] Build succeeds
- [ ] Preview looks good
- [ ] All tests pass
- [ ] Documentation read

---

## 🎉 You're Ready!

Start developing with:
```bash
npm run dev
```

Visit:
- Consultant: `http://localhost:5173/consultant`
- Executive: `http://localhost:5173/executive`

**Happy coding! 🚀**

---

## 📞 Need Help?

1. Check console for errors (F12)
2. Read `DEPLOYMENT_GUIDE.md`
3. Review `TESTING_CHECKLIST.md`
4. Check React Router docs

---

**Pro Tip**: Keep this guide open while developing. It has all the URLs and commands you'll need!
