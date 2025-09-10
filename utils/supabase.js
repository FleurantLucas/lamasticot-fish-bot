import { createClient } from '@supabase/supabase-js';

// ⚠️ Get these from your Supabase project settings
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY; // use service_role key for server bots

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);