import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  company: string
  organization_type?: string
  team_size_or_clients?: string
  primary_role?: string
  main_challenge?: string
  other_challenge?: string
  created_at: string
  updated_at: string
}

// Auth types
export interface AuthUser {
  id: string
  email: string
  user_metadata: {
    first_name?: string
    last_name?: string
    company?: string
  }
}
