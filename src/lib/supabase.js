// All values come from environment variables (see .env.example). Until they
// are set, `isSupabaseConfigured` is false and the app runs in local demo
// mode (content is stored in this browser only) instead of crashing — and,
// importantly, never downloads the Supabase client library at all.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let clientPromise = null;

/** Lazily loads the Supabase client library and returns a connected client.
 * Only ever called when isSupabaseConfigured is true, so demo-mode visitors
 * never pay for this download. */
export function getSupabase() {
  if (!isSupabaseConfigured) return Promise.resolve(null);
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) =>
      createClient(supabaseUrl, supabaseAnonKey),
    );
  }
  return clientPromise;
}
