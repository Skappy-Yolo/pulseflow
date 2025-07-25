# Netlify Deployment Guide for PulseFlow

## Prerequisites
- ✅ Netlify account
- ✅ GitHub repository connected
- ✅ Environment variables configured

## Environment Variables Setup

In your Netlify dashboard, go to **Site settings > Environment variables** and add:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

⚠️ **Important**: Use your actual Supabase credentials from `.env.local`

## Build Settings

Netlify will automatically detect these settings from `netlify.toml`:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18

## Deployment Steps

1. **Connect Repository**
   - Log in to Netlify
   - Click "New site from Git"
   - Connect your GitHub account
   - Select `pulseflow` repository

2. **Configure Build**
   - Branch: `main`
   - Build command: `npm run build` (auto-detected)
   - Publish directory: `dist` (auto-detected)

3. **Add Environment Variables**
   - Go to Site settings > Environment variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (~2-3 minutes)

## Post-Deployment

After successful deployment:

1. **Test Authentication Flow**
   - Login page functionality
   - Registration process
   - Success page routing

2. **Verify Routes**
   - `/` - Landing page
   - `/auth` - Authentication system
   - `/success` - Protected success page

3. **Test Database Connection**
   - User registration
   - Data persistence
   - Profile creation

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Verify Supabase credentials
- Check build logs for TypeScript errors

### Routes Don't Work
- Ensure `netlify.toml` redirects are configured
- Check SPA routing setup

### Authentication Issues
- Verify Supabase URL and key
- Check database permissions
- Test RLS policies

## Performance Optimizations

The current setup includes:
- ✅ Asset compression
- ✅ CSS/JS minification
- ✅ Image optimization
- ✅ Cache headers for static assets
- ✅ Security headers

## Monitoring

After deployment, monitor:
- Build success rate
- Page load times
- User registration flow
- Error rates

Your PulseFlow application will be available at:
`https://your-site-name.netlify.app`
