# PulseFlow Deployment Guide

## 🚀 Quick Start

Your PulseFlow dashboard has been successfully migrated from hash-based routing to React Router with URL-based navigation.

### New URLs

**Consultant Dashboard (Consuela N.)**
- Overview: `http://yourapp.com/consultant`
- Clients Page: `http://yourapp.com/consultant/clients`
- Client Details: `http://yourapp.com/consultant/clients/:clientId`

**Executive Dashboard (Delphine C.)**
- Overview: `http://yourapp.com/executive`
- Integrations: `http://yourapp.com/executive/integrations`
- Team Management: `http://yourapp.com/executive/team`
- Data Analytics: `http://yourapp.com/executive/analytics`
- Reports: `http://yourapp.com/executive/reports`

---

## 📦 What Changed

### Created Files
- `/pages/ConsultantDashboard.tsx` - Consultant dashboard with nested routing
- `/pages/ExecutiveDashboard.tsx` - Executive dashboard with nested routing
- `/vercel.json` - Vercel deployment configuration
- `/_redirects` - Netlify deployment configuration
- `/.htaccess` - Apache server configuration
- `/nginx.conf` - Nginx server configuration example

### Updated Files
- `/App.tsx` - Now uses React Router instead of hash routing
- `/components/executive/ExecutiveNavigation.tsx` - Uses `useNavigate()` hook
- `/components/dashboard/InteractiveNavigation.tsx` - Uses `useNavigate()` hook
- `/components/dashboard/ClientDetailsPage.tsx` - Uses `useParams()` hook for route parameters

### Dependencies
React Router DOM is automatically imported via CDN when you use:
```tsx
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
```

---

## 🧪 Testing Locally

### 1. Start Development Server
```bash
npm run dev
# or
yarn dev
```

### 2. Test Navigation
Visit these URLs and verify they work:

**Consultant Dashboard:**
- `http://localhost:5173/consultant` ✅ Should show Consuela's overview
- `http://localhost:5173/consultant/clients` ✅ Should show clients page
- `http://localhost:5173/` ✅ Should redirect to `/consultant`

**Executive Dashboard:**
- `http://localhost:5173/executive` ✅ Should show Delphine's overview
- `http://localhost:5173/executive/integrations` ✅ Should show integrations
- `http://localhost:5173/executive/team` ✅ Should show team management
- `http://localhost:5173/executive/analytics` ✅ Should show data analytics
- `http://localhost:5173/executive/reports` ✅ Should show reports

### 3. Test Dashboard Switching
- [ ] In Consultant dashboard, click profile dropdown → "Switch to Executive View"
- [ ] Should navigate to Executive dashboard
- [ ] In Executive dashboard, click profile dropdown → "Switch to Consultant View"
- [ ] Should navigate back to Consultant dashboard

### 4. Test Browser Navigation
- [ ] Click through various pages
- [ ] Press browser back button - should work correctly
- [ ] Press browser forward button - should work correctly
- [ ] Refresh the page - should stay on the same page (not 404)

### 5. Test Mobile Responsive
- [ ] Open mobile view (resize browser or use dev tools)
- [ ] Hamburger menu opens/closes correctly
- [ ] All pages render properly on mobile
- [ ] Navigation works on mobile

---

## 🌐 Deployment

### Option 1: Vercel (Recommended - Easiest)

#### Deploy via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Build the project
npm run build

# Deploy
vercel --prod
```

#### Deploy via GitHub Integration
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will automatically detect `vercel.json` and configure routing ✅
6. Click "Deploy"

**Configuration is automatic!** The `vercel.json` file handles all routing.

---

### Option 2: Netlify

#### Deploy via CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### Deploy via Drag & Drop
1. Build your project: `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag and drop the `dist` folder
4. Netlify will automatically detect `_redirects` file ✅

**Configuration is automatic!** The `_redirects` file handles all routing.

---

### Option 3: Traditional Server (Nginx)

#### Step 1: Build the Project
```bash
npm run build
```

#### Step 2: Upload Build Files
Upload the contents of the `dist` folder to your server:
```bash
# Example with SCP
scp -r dist/* user@yourserver.com:/var/www/pulseflow/
```

#### Step 3: Configure Nginx
Copy the provided `nginx.conf` to your server:
```bash
sudo nano /etc/nginx/sites-available/pulseflow
```

Paste the contents from `/nginx.conf` and update:
- `server_name yourapp.com` → Your actual domain
- `root /var/www/pulseflow/dist` → Your actual path

#### Step 4: Enable the Site
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/pulseflow /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

#### Step 5: Add SSL (Recommended)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourapp.com
```

---

### Option 4: Apache Server

#### Step 1: Build the Project
```bash
npm run build
```

#### Step 2: Upload Build Files
Upload the contents of the `dist` folder including `.htaccess`:
```bash
scp -r dist/* user@yourserver.com:/var/www/pulseflow/
scp .htaccess user@yourserver.com:/var/www/pulseflow/
```

#### Step 3: Enable mod_rewrite
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

#### Step 4: Update Apache Config
Edit your virtual host configuration:
```bash
sudo nano /etc/apache2/sites-available/pulseflow.conf
```

Add:
```apache
<VirtualHost *:80>
    ServerName yourapp.com
    DocumentRoot /var/www/pulseflow
    
    <Directory /var/www/pulseflow>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/pulseflow-error.log
    CustomLog ${APACHE_LOG_DIR}/pulseflow-access.log combined
</VirtualHost>
```

#### Step 5: Enable Site and Restart
```bash
sudo a2ensite pulseflow.conf
sudo systemctl restart apache2
```

---

### Option 5: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
# Build image
docker build -t pulseflow .

# Run container
docker run -d -p 80:80 pulseflow
```

---

## ⚙️ Environment Variables

If you need environment variables for API endpoints:

### Create `.env` file:
```env
VITE_API_URL=https://api.yourapp.com
VITE_ANALYTICS_ID=your-analytics-id
```

### Use in your code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

### For Production:
- **Vercel**: Add environment variables in Project Settings → Environment Variables
- **Netlify**: Add in Site Settings → Build & deploy → Environment
- **Other servers**: Create `.env.production` file

---

## 🔍 Troubleshooting

### Problem: 404 on Page Refresh

**Cause:** Server is not configured to redirect all requests to `index.html`

**Solution:**
- Vercel: Check `vercel.json` exists
- Netlify: Check `_redirects` exists
- Nginx: Check `try_files` directive in config
- Apache: Check `.htaccess` exists and `mod_rewrite` is enabled

---

### Problem: Routes Not Working

**Symptom:** Clicking links doesn't navigate

**Check:**
1. React Router DOM is imported correctly
2. `<BrowserRouter>` wraps your app in `App.tsx`
3. Console for JavaScript errors
4. Network tab for failed requests

---

### Problem: Images Not Loading

**Cause:** Image paths may have changed after deployment

**Solution:**
Check that Figma assets are correctly imported:
```tsx
// Correct
import img from "figma:asset/abc123.png";

// Wrong
import img from "./figma:asset/abc123.png";
```

---

### Problem: CSS Not Applied

**Check:**
1. `globals.css` is imported in your entry point
2. Tailwind directives are present
3. Build output includes CSS files
4. No console errors about missing stylesheets

---

## 📊 Performance Optimization

### Code Splitting (Optional)
Add lazy loading for routes:
```tsx
import { lazy, Suspense } from "react";

const ConsultantDashboard = lazy(() => import("./pages/ConsultantDashboard"));
const ExecutiveDashboard = lazy(() => import("./pages/ExecutiveDashboard"));

// In your routes:
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/consultant/*" element={<ConsultantDashboard />} />
    <Route path="/executive/*" element={<ExecutiveDashboard />} />
  </Routes>
</Suspense>
```

### Enable Compression
Already configured in `nginx.conf` for gzip compression.

### CDN (Optional)
Upload static assets (images, fonts) to a CDN for faster loading.

---

## 🔒 Security Best Practices

### 1. Enable HTTPS
Always use SSL in production:
- Vercel/Netlify: Automatic ✅
- Custom server: Use Let's Encrypt (see Nginx section)

### 2. Set Security Headers
Already included in `nginx.conf`:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection

### 3. Environment Variables
Never commit sensitive data. Use:
- `.env.local` for local development
- Platform environment variables for production

---

## 📈 Monitoring

### Add Analytics (Optional)

#### Google Analytics
```tsx
// In App.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  
  useEffect(() => {
    // Track page views
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
  
  return (
    // ... your routes
  );
}
```

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] All URLs are accessible
- [ ] Dashboard switching works
- [ ] Browser back/forward buttons work
- [ ] Page refresh doesn't cause 404
- [ ] Mobile responsive works
- [ ] All images load
- [ ] Charts render correctly
- [ ] Modals open/close properly
- [ ] Forms submit correctly
- [ ] Console has no errors
- [ ] HTTPS is enabled
- [ ] Performance is acceptable (< 3s load time)

---

## 🆘 Support

### Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint
```

### Need Help?

1. Check browser console for errors
2. Check network tab for failed requests
3. Verify server configuration
4. Check deployment platform logs

---

## 🎉 Success!

Your PulseFlow dashboard is now ready for production with:
- ✅ URL-based routing
- ✅ Shareable links
- ✅ SEO-friendly URLs
- ✅ Browser navigation support
- ✅ Clean separation between dashboards

**Consultant Dashboard**: `/consultant`
**Executive Dashboard**: `/executive`

Enjoy your new professional routing system! 🚀
