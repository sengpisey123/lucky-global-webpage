// Quick Supabase connection + table diagnostics
// Run from inside lucky-global-webpage/:  node scripts/test-db.mjs

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this diagnostic.",
  );
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function testTable(table, row, idField = "id") {
  process.stdout.write(`  INSERT … `);
  const { data, error: insertErr } = await supabase
    .from(table)
    .insert(row)
    .select(idField)
    .single();

  if (insertErr) {
    console.log(`❌  ${insertErr.message}  (code: ${insertErr.code})`);
    return;
  }

  // Clean up test row immediately
  await supabase.from(table).delete().eq(idField, data[idField]);
  console.log(`✅  Insert + delete OK`);
}

async function run() {
  console.log("─── Supabase diagnostic ───────────────────────");
  console.log("URL :", url);
  console.log("Key :", serviceRoleKey.slice(0, 18) + "…\n");

  console.log("[1] contact_inquiries");
  await testTable("contact_inquiries", {
    locale: "ja",
    name: "Test User",
    email: "test@example.com",
    message: "Diagnostic test",
    company: null,
  });

  console.log("[2] applicants");
  await testTable("applicants", {
    locale: "ja",
    full_name: "Test Applicant",
    phone: "000-0000",
    sex: "male",
    province: "Test Province",
  });

  console.log("\n─── Hints ─────────────────────────────────────");
  console.log("PGRST205 → table not found: run supabase/migration.sql in the SQL Editor");
  console.log("42501    → RLS blocked the insert: run the policy statements too");
  console.log("JWT/401  → wrong API key");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

