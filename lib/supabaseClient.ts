import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public, read-only Supabase client — safe to use in server components and
// the browser. Uses the anon key, which only ever sees what your Row Level
// Security policies allow (e.g. blog posts where is_live = true).
//
// This is separate from lib/supabase-server.ts, which uses the service role
// key and must never be imported into anything client-facing.
//
// Deliberately returns null instead of throwing when the env vars are
// missing: the blog is an optional feature, and a missing/misconfigured
// Supabase connection should degrade to "no posts yet" rather than fail
// the entire site's build.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

if (!supabase && process.env.NODE_ENV !== "production") {
  console.warn(
    "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing — the blog will show no posts until these are set."
  );
}

