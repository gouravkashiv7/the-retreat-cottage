const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env" });

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

async function test() {
  const { data, error } = await supabaseAdmin.rpc("get_tables"); // unlikely to work
  if (error) {
    // try direct SQL if we had an rpc, but we don't.
    // Let's try to just select from common names.
    const tables = ["users", "profiles", "admins", "staff"];
    for (const table of tables) {
      const { error: tableError } = await supabaseAdmin
        .from(table)
        .select("count", { count: "exact", head: true });
      console.log(
        `Table ${table}:`,
        tableError ? "Error: " + tableError.code : "Exists",
      );
    }
  }
}
test();
