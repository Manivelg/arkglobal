// // Server-side Supabase client with service_role key (bypasses RLS)
// // ⚠️ WARNING: Only use this for server-side operations! Never expose service_role key to client!
// import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// if (!supabaseUrl) {
//   throw new Error("❌ Missing NEXT_PUBLIC_SUPABASE_URL");
// }

// let supabaseServer: SupabaseClient;

// if (!supabaseServiceKey) {
//   console.warn("⚠️ SUPABASE_SERVICE_ROLE_KEY not set. Using anon key (may be blocked by RLS)");
//   // Fallback to anon key if service role key is not set
//   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
//   if (!supabaseAnonKey) {
//     throw new Error("❌ Missing Supabase keys. Set either SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_KEY");
//   }
//   supabaseServer = createClient(supabaseUrl, supabaseAnonKey);
// } else {
//   // Use service_role key for server-side operations (bypasses RLS)
//   supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false
//     }
//   });
// }

// export { supabaseServer };

// app/(DashboardLayout)/api/apiConfigServer.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("❌ Missing NEXT_PUBLIC_SUPABASE_URL");
}

let supabaseServer: SupabaseClient;

if (serviceRoleKey) {
  // ✅ Server-only: bypasses RLS
  supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
} else if (anonKey) {
  // ⚠️ Fallback (RLS applies)
  console.warn(
    "⚠️ SUPABASE_SERVICE_ROLE_KEY not set. Falling back to anon key (RLS enabled)"
  );

  supabaseServer = createClient(supabaseUrl, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
} else {
  throw new Error(
    "❌ Missing Supabase keys. Set SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export { supabaseServer };
