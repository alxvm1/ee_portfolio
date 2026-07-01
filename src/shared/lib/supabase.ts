import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/shared/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase env vars are missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
