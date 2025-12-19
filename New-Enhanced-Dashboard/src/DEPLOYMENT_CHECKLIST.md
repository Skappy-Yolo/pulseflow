# 📋 PulseFlow Deployment Checklist

Use this checklist to ensure a smooth deployment to production.

---

## ✅ Pre-Deployment Checklist

### 1. Code Quality
- [ ] All TypeScript errors resolved
- [ ] No console errors in development
- [ ] No console warnings (or documented)
- [ ] All ESLint warnings addressed
- [ ] Code reviewed and approved
- [ ] Git repository is clean (committed)

### 2. Functionality Testing
- [ ] All routes work in development
- [ ] Dashboard switching works
- [ ] Browser back/forward buttons work
- [ ] Page refresh doesn't break
- [ ] All forms work correctly
- [ ] All modals open/close properly
- [ ] All charts render correctly
- [ ] All images load correctly

### 3. Responsive Testing
- [ ] Tested on mobile (< 768px)
- [ ] Tested on tablet (768px - 1024px)
- [ ] Tested on desktop (> 1024px)
- [ ] Hamburger menu works on mobile
- [ ] All pages are readable on mobile
- [ ] Touch interactions work

### 4. Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, if available)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### 5. Performance
- [ ] Build completes without errors
- [ ] Bundle size is acceptable (< 2MB)
- [ ] Initial load time < 3 seconds
- [ ] No memory leaks detected
- [ ] Images are optimized

### 6. Security
- [ ] No API keys in code
- [ ] Environment variables configured
- [ ] HTTPS will be enabled
- [ ] No sensitive data exposed
- [ ] Security headers configured

---

## 📦 Build Checklist

### 1. Environment Setup
- [ ] `.env.production` created (if needed)
- [ ] API URLs point to production
- [ ] Analytics IDs configured
- [ ] Feature flags set

### 2. Build Process
```bash
# Clean previous builds
rm -rf dist

# Install dependencies (fresh)
npm ci

# Run build
npm run build

# Verify build output
ls -la dist/
```

- [ ] Build completes successfully
- [ ] `dist/` folder created
- [ ] `index.html` present
- [ ] Assets folder present
- [ ] No build warnings

### 3. Test Production Build Locally
```bash
npm run preview
```

- [ ] Preview starts successfully
- [ ] Visit `http://localhost:4173/consultant`
- [ ] Visit `http://localhost:4173/executive`
- [ ] All routes work
- [ ] All features work
- [ ] No console errors

---

## 🚀 Deployment Checklist

### Choose Your Platform:

---

### Option A: Vercel Deployment

#### Setup
- [ ] Vercel account created
- [ ] Vercel CLI installed: `npm i -g vercel`
- [ ] Repository connected (if using Git)

#### Configuration
- [ ] `vercel.json` exists in root
- [ ] Environment variables set in Vercel dashboard
- [ ] Project settings reviewed

#### Deploy
```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Verify
- [ ] Deployment successful
- [ ] Production URL received
- [ ] Visit `/consultant` route
- [ ] Visit `/executive` route
- [ ] Test all pages
- [ ] HTTPS working
- [ ] No errors

---

### Option B: Netlify Deployment

#### Setup
- [ ] Netlify account created
- [ ] Netlify CLI installed: `npm i -g netlify-cli`
- [ ] Repository connected (if using Git)

#### Configuration
- [ ] `_redirects` file exists in root
- [ ] Environment variables set in Netlify dashboard
- [ ] Build settings configured

#### Deploy
```bash
# Build project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### Verify
- [ ] Deployment successful
- [ ] Production URL received
- [ ] Visit `/consultant` route
- [ ] Visit `/executive` route
- [ ] Test all pages
- [ ] HTTPS working
- [ ] No errors

---

### Option C: Custom Server (Nginx)

#### Setup
- [ ] Server access configured
- [ ] Nginx installed
- [ ] SSL certificate ready

#### Build & Upload
```bash
# Build locally
npm run build

# Upload to server (example)
scp -r dist/* user@server:/var/www/pulseflow/
```

#### Nginx Configuration
- [ ] `nginx.conf` copied to server
- [ ] Server name updated in config
- [ ] Root path updated in config
- [ ] SSL certificate configured
- [ ] Gzip compression enabled

```bash
# Test Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

#### Verify
- [ ] Site accessible via domain
- [ ] All routes work
- [ ] HTTPS enabled
- [ ] No 404 errors on refresh
- [ ] Gzip compression working

---

### Option D: Custom Server (Apache)

#### Setup
- [ ] Server access configured
- [ ] Apache installed
- [ ] SSL certificate ready
- [ ] mod_rewrite enabled

#### Build & Upload
```bash
# Build locally
npm run build

# Upload to server (including .htaccess)
scp -r dist/* user@server:/var/www/pulseflow/
scp .htaccess user@server:/var/www/pulseflow/
```

#### Apache Configuration
- [ ] `.htaccess` uploaded
- [ ] Virtual host configured
- [ ] SSL certificate configured
- [ ] mod_rewrite enabled

```bash
# Enable mod_rewrite
sudo a2enmod rewrite

# Restart Apache
sudo systemctl restart apache2
```

#### Verify
- [ ] Site accessible via domain
- [ ] All routes work
- [ ] HTTPS enabled
- [ ] No 404 errors on refresh

---

## 🧪 Post-Deployment Testing

### 1. Functional Testing (Production)

#### Consultant Dashboard
- [ ] Visit `yourdomain.com/consultant`
- [ ] Dashboard loads correctly
- [ ] All statistics show
- [ ] Client cards display
- [ ] Charts render
- [ ] Click "Clients" in sidebar
- [ ] Clients page loads
- [ ] Click a client card
- [ ] Client details page loads
- [ ] Back button returns to clients

#### Executive Dashboard
- [ ] Visit `yourdomain.com/executive`
- [ ] Dashboard loads correctly
- [ ] Overview metrics show
- [ ] Click "Integrations"
- [ ] Integrations page loads
- [ ] Click "Team Management"
- [ ] Team page loads
- [ ] Click "Data Analytics"
- [ ] Analytics page loads
- [ ] Click "Reports"
- [ ] Reports page loads

#### Dashboard Switching
- [ ] From consultant, switch to executive
- [ ] URL changes to `/executive`
- [ ] Executive dashboard loads
- [ ] From executive, switch to consultant
- [ ] URL changes to `/consultant`
- [ ] Consultant dashboard loads

### 2. Navigation Testing (Production)

#### URL Access
- [ ] Direct access: `yourdomain.com/consultant/clients`
- [ ] Direct access: `yourdomain.com/executive/reports`
- [ ] Invalid URL: `yourdomain.com/invalid` (should redirect)

#### Browser Navigation
- [ ] Navigate between pages
- [ ] Press browser back button (works)
- [ ] Press browser forward button (works)
- [ ] Refresh page (stays on same page)

#### Bookmarks
- [ ] Bookmark a specific page
- [ ] Close browser
- [ ] Open bookmark
- [ ] Page loads correctly

### 3. Mobile Testing (Production)

#### Responsive Layout
- [ ] Visit site on mobile device
- [ ] Layout is responsive
- [ ] Hamburger menu visible
- [ ] Tap hamburger menu
- [ ] Sidebar opens
- [ ] Tap outside sidebar
- [ ] Sidebar closes
- [ ] All pages readable

#### Touch Interactions
- [ ] Tap buttons work
- [ ] Swipe gestures work (if implemented)
- [ ] Forms are usable
- [ ] Charts are readable
- [ ] Modals work

### 4. Performance Testing (Production)

#### Load Times
- [ ] Initial page load < 3 seconds
- [ ] Route changes < 500ms
- [ ] Images load progressively
- [ ] Charts render smoothly

#### Tools
Run Lighthouse audit:
- [ ] Performance score > 80
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 80

### 5. Security Testing (Production)

#### HTTPS
- [ ] Site loads with HTTPS
- [ ] No mixed content warnings
- [ ] SSL certificate valid
- [ ] Forced redirect from HTTP to HTTPS

#### Headers
Check security headers (use securityheaders.com):
- [ ] X-Frame-Options present
- [ ] X-Content-Type-Options present
- [ ] X-XSS-Protection present
- [ ] Content-Security-Policy (optional)

#### Environment Variables
- [ ] No API keys in client code
- [ ] No sensitive data exposed
- [ ] Console logs removed

---

## 📊 Monitoring Setup

### 1. Analytics (Optional)
- [ ] Google Analytics configured
- [ ] Page view tracking works
- [ ] Event tracking configured
- [ ] Goals set up

### 2. Error Tracking (Optional)
- [ ] Sentry/error tracking configured
- [ ] Test error reporting
- [ ] Alerts configured

### 3. Uptime Monitoring (Optional)
- [ ] Uptime monitor configured
- [ ] Alerts set up
- [ ] Status page created

---

## 📝 Documentation

### Update Documentation
- [ ] README.md updated with production URL
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Team notified of deployment

### Create Runbook
- [ ] Deployment process documented
- [ ] Rollback procedure documented
- [ ] Common issues documented
- [ ] Contact information updated

---

## 🎉 Launch Checklist

### Final Verifications
- [ ] All features work in production
- [ ] No console errors
- [ ] All tests passed
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Mobile works
- [ ] Cross-browser tested

### Team Communication
- [ ] Team notified of deployment
- [ ] Documentation shared
- [ ] Training completed (if needed)
- [ ] Support team briefed

### Monitoring
- [ ] First 24 hours monitoring plan
- [ ] Error tracking active
- [ ] Analytics tracking
- [ ] Performance monitoring

---

## 🆘 Rollback Plan

If something goes wrong:

### Vercel/Netlify
```bash
# Rollback to previous deployment via dashboard
# Or redeploy previous version
```

### Custom Server
```bash
# Restore from backup
sudo cp -r /backup/pulseflow-v1/* /var/www/pulseflow/

# Restart server
sudo systemctl reload nginx
```

### Issues to Watch
- [ ] 404 errors
- [ ] Slow load times
- [ ] JavaScript errors
- [ ] API failures
- [ ] Mobile layout issues

---

## ✅ Deployment Complete!

### Sign-off

```
Deployment Date: _______________
Deployed By: ___________________
Version: _______________________

Production URL: ________________________________

Checklist Items:
- Pre-deployment: ____ / ____ ✅
- Build: ____ / ____ ✅
- Deployment: ____ / ____ ✅
- Testing: ____ / ____ ✅
- Monitoring: ____ / ____ ✅

Status: [ ] Success  [ ] Issues Found

Notes:
_________________________________________________
_________________________________________________
_________________________________________________

Signed: _________________  Date: ______________
```

---

## 📞 Support Contacts

### Critical Issues
- Technical Lead: _________________
- DevOps: _______________________
- On-Call: ______________________

### Platform Support
- Vercel: support@vercel.com
- Netlify: support@netlify.com
- Hosting Provider: ______________

---

## 🎯 Success Criteria

Deployment is successful when:
- ✅ All routes accessible
- ✅ No console errors
- ✅ Performance < 3s load
- ✅ Mobile responsive works
- ✅ HTTPS enabled
- ✅ No 404 errors on refresh
- ✅ Dashboard switching works
- ✅ All features functional

---

## 📊 Post-Launch Monitoring (First 24 Hours)

### Hour 1
- [ ] Check site is live
- [ ] Monitor error rates
- [ ] Check performance metrics

### Hour 4
- [ ] Review error logs
- [ ] Check user feedback
- [ ] Monitor load times

### Hour 12
- [ ] Review analytics
- [ ] Check error trends
- [ ] Verify all features

### Hour 24
- [ ] Full system check
- [ ] Performance review
- [ ] User feedback review
- [ ] Decision: Continue monitoring or fix issues

---

## 🎊 Congratulations!

Your PulseFlow dashboard is now live in production!

**Next Steps:**
1. Monitor for the first 24 hours
2. Collect user feedback
3. Plan improvements
4. Celebrate! 🎉

---

**Need help?** Check `DEPLOYMENT_GUIDE.md` for detailed troubleshooting.
