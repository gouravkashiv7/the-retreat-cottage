import { createClient } from "@supabase/supabase-js";

// Standard client for most operations
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

// Admin client for operations that need to bypass RLS (like creating new guests during sign-in)
// This should ONLY be used in server-side code (actions, auth callbacks, etc.)
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY,
);

export default supabase;
