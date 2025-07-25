# 🔐 PulseFlow Authentication System

## Overview
Complete authentication system with Supabase backend, protected routes, and user management.

## Features
- ✅ **Login/Signup Flow** - Professional multi-step registration
- ✅ **Protected Routes** - Success page requires completed signup
- ✅ **Work Email Validation** - Blocks personal email domains
- ✅ **Supabase Integration** - Secure database with user profiles
- ✅ **Session Persistence** - Users stay logged in across sessions
- ✅ **Responsive Design** - Mobile-first authentication forms

## Live URLs
- **Homepage**: https://pulseflows.netlify.app/
- **Login**: https://pulseflows.netlify.app/login
- **Signup**: https://pulseflows.netlify.app/signup
- **Success**: https://pulseflows.netlify.app/success *(Protected)*

## Components

### Core Files
- `src/contexts/AuthContext.tsx` - Authentication state management
- `src/components/auth/PulseFlowAuth.tsx` - Login/signup/success pages
- `src/lib/supabase.ts` - Database configuration
- `src/components/sections/Navigation.tsx` - Auth-aware navigation

### Authentication Flow
```
Landing → "Book a Demo" → Signup Form → Success Page
Landing → "Log in" → Login Form → Dashboard Access
```

## Environment Setup
```bash
# Required environment variables (.env.local)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing Authentication

### Route Protection Test
1. Open incognito browser
2. Go to `/success` directly → Should redirect to `/signup`
3. Complete signup → Should access `/success`
4. Refresh page → Should maintain access

### User Journey Test
1. Landing page → Shows "Log in" and "Book a Demo"
2. Complete signup → Navigation shows "Welcome, [user]" and "Logout"
3. Logout → Returns to public navigation state

## Database Schema
```sql
-- user_profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT NOT NULL,
  organization_type TEXT,
  team_size_or_clients TEXT,
  primary_role TEXT,
  main_challenge TEXT,
  other_challenge TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Security Features
- **Work Email Validation** - Ensures business leads quality
- **Protected Routes** - Content gated behind authentication
- **Secure Session Management** - Supabase handles tokens securely
- **Input Validation** - Client and server-side validation
- **Error Handling** - Graceful failure with user feedback

## Development Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Troubleshooting

### Common Issues
- **Cannot access success page**: Clear localStorage and complete signup flow
- **Build errors**: Ensure all environment variables are set
- **Auth not persisting**: Check Supabase configuration and network connectivity

### Debug Tools (Development Only)
Authentication state is logged to console in development mode for debugging.
