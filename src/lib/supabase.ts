import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co'
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
  
  if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-project-id.supabase.co' && supabaseAnonKey !== 'your-anon-key') {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
} catch (error) {
  console.warn('Supabase initialization failed, using local storage fallback')
}

export const supabase = supabaseClient