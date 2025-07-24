# 🚀 Supabase Setup Instructions

## Step 1: Database Setup

Copy and paste this SQL code in your Supabase SQL Editor:

```sql
-- Create user_profiles table to store additional user information
create table public.user_profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  first_name text not null,
  last_name text not null,
  company text not null,
  organization_type text,
  team_size_or_clients text,
  primary_role text,
  main_challenge text,
  other_challenge text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.user_profiles enable row level security;

-- Create policies
create policy "Users can view own profile" on public.user_profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.user_profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.user_profiles
  for insert with check (auth.uid() = id);

-- Create function to automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email, first_name, last_name, company)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    coalesce(new.raw_user_meta_data->>'company', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger to run function on user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger handle_updated_at
  before update on public.user_profiles
  for each row execute procedure public.handle_updated_at();
```

## Step 2: Run the Setup

1. Go to your Supabase project: https://zauixbkhnpaofxynndnj.supabase.co
2. Click "SQL Editor" in the left sidebar
3. Create a new query
4. Copy and paste the SQL code above
5. Click "Run" to execute

## Step 3: Test the Integration

1. Run your development server: `npm run dev`
2. Press `Ctrl+Shift+D` to open the debug panel
3. Try registering a new user
4. Click "👑 Admin Dashboard" to view all registered users

## What You'll Get:

✅ **Real User Database** - All signups stored in Supabase
✅ **Admin Dashboard** - View all users, export CSV, real-time stats
✅ **Secure Authentication** - Proper user management
✅ **User Profiles** - Complete user information tracking
✅ **Scalable Solution** - Handles thousands of users

## Admin Access:
- Debug panel with `Ctrl+Shift+D`
- Click "👑 Admin Dashboard" button
- View users, export data, track analytics

Your authentication system is now production-ready with real database storage!
