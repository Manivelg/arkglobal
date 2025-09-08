// api/apiConfig.ts
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseKey);

// api/apiConfig.ts
import { createClient } from "@supabase/supabase-js";

// Always read values from .env (do not hardcode the URL)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

// Safety check
if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
