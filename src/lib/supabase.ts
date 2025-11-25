/// <reference types="vite/client" />

import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

// IMPORTANT: Create a .env file in your project root and add your Supabase variables:
// VITE_SUPABASE_URL=your_supabase_url
// VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anon key are required. Make sure to create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY variables.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
