// Server-side Supabase client with service_role key (bypasses RLS)
// ⚠️ WARNING: Only use this for server-side operations! Never expose service_role key to client!
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl) {
  throw new Error("❌ Missing NEXT_PUBLIC_SUPABASE_URL");
}

let supabaseServer: SupabaseClient;

if (!supabaseServiceKey) {
  console.warn("⚠️ SUPABASE_SERVICE_ROLE_KEY not set. Using anon key (may be blocked by RLS)");
  // Fallback to anon key if service role key is not set
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
  if (!supabaseAnonKey) {
    throw new Error("❌ Missing Supabase keys. Set either SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_KEY");
  }
  supabaseServer = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Use service_role key for server-side operations (bypasses RLS)
  supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export { supabaseServer };

