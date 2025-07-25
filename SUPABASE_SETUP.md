# Supabase Setup Guide for PulseFlow

## 🚀 Quick Setup Checklist

### 1. Create Supabase Project
- [ ] Go to [supabase.io](https://supabase.io) and create an account
- [ ] Create a new project
- [ ] Choose a strong password for your database
- [ ] Wait for project to be ready (~2 minutes)

### 2. Get Project Credentials
- [ ] Go to Settings → API in your Supabase dashboard
- [ ] Copy your Project URL
- [ ] Copy your anon/public key
- [ ] Create `.env.local` file in project root:
```bash
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Set Up Database Schema
- [ ] Go to SQL Editor in Supabase dashboard
- [ ] Copy the content from `database/schema.sql`
- [ ] Run the SQL to create tables and security policies

### 4. Configure Email Templates
- [ ] Go to Authentication → Email Templates
- [ ] Replace default templates with content from `database/email-templates.md`
- [ ] Test email delivery

### 5. Configure OAuth Providers (Optional)
For Microsoft and Slack social authentication:
- [ ] Go to Authentication → Providers
- [ ] Enable Microsoft Azure
- [ ] Enable Slack OAuth
- [ ] Configure callback URLs

### 6. Test Authentication
- [ ] Start your development server: `npm run dev`
- [ ] Test signup flow
- [ ] Check email confirmation
- [ ] Test login flow

## 🔐 Security Configuration

### Row Level Security (RLS)
Our schema automatically enables RLS with these policies:
- Users can only read/update their own profile
- Automatic profile creation on user signup
- Secure data isolation between users

### Environment Variables
Never commit your actual Supabase credentials to version control:
```bash
# ✅ Good - use .env.local (gitignored)
VITE_SUPABASE_URL=https://abc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ❌ Bad - don't put in .env.example
VITE_SUPABASE_URL=real_url_here
```

## 📧 Email Configuration

### SMTP Setup (Recommended for Production)
1. Go to Settings → Authentication
2. Enable "Enable custom SMTP"
3. Configure your email provider (SendGrid, Mailgun, etc.)

### Email Rate Limits
- Development: 3 emails per hour
- Production with custom SMTP: Based on your provider

## 🔧 Social Auth Setup

### Microsoft Azure
1. Create Azure App Registration
2. Add redirect URI: `https://[your-project].supabase.co/auth/v1/callback`
3. Add Client ID and Secret in Supabase Auth settings

### Slack OAuth
1. Create Slack App at api.slack.com
2. Add redirect URI: `https://[your-project].supabase.co/auth/v1/callback`
3. Add Client ID and Secret in Supabase Auth settings

## 🚨 Common Issues & Solutions

### Issue: Environment variables not loading
**Solution:** Make sure your `.env.local` file is in the project root and restart your dev server.

### Issue: Database connection errors
**Solution:** Double-check your Supabase URL and make sure your project is active.

### Issue: Email not sending
**Solution:** Check your email settings and ensure you're not hitting rate limits.

### Issue: Social auth not working
**Solution:** Verify callback URLs match exactly in both providers and Supabase.

## 📝 Next Steps

After completing setup:
1. ✅ All dependencies installed
2. ✅ Configuration files created
3. ✅ Database schema ready
4. ✅ Email templates prepared

**Ready for Phase 2: Integration with existing auth components**
