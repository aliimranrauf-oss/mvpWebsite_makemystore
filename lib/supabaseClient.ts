import { createClient } from "@supabase/supabase-js";

// Public, read-only Supabase client — safe to use in server components and
// the browser. Uses the anon key, which only ever sees what your Row Level
// Security policies allow (e.g. blog posts where is_live = true).
//
// This is separate from lib/supabase-server.ts, which uses the service role
// key and must never be imported into anything client-facing.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
  );
}

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
