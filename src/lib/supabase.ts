import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const isSupabaseConfigured = supabaseUrl !== "" && supabaseKey !== "";

// Create standard client if configured, otherwise provide a dummy client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : ({} as any);

export const hasSupabase = isSupabaseConfigured;
