import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * Security model: the `leads` and `contact_messages` tables have RLS enabled
 * with INSERT-only policies, so this key can write submissions but cannot read,
 * update, or delete them. Rows are only viewable from the Supabase dashboard.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_KEY).");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const isSupabaseConfigured = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_KEY;
