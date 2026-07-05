import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://csewazacuxsibznwbudk.supabase.co";

const supabaseKey =
  "sb_publishable_o05uCkoZY9mfGJlK0alq8w_5eqmdkTY";

export const supabase = createClient(supabaseUrl, supabaseKey);