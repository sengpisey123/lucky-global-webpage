import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase";

type ApplyPayload = {
  locale?: string;
  full_name?: string;
  phone?: string;
  sex?: string;
  province?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ApplyPayload;

  const full_name = body.full_name?.trim();
  const phone = body.phone?.trim();
  const sex = body.sex?.trim();
  const province = body.province?.trim();
  const locale = body.locale?.trim() || "ja";

  if (!full_name || !phone || !sex || !province) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase environment variables are not configured." },
      { status: 500 },
    );
  }

  const { error } = await supabase.from("applicants").insert({
    locale,
    full_name,
    phone,
    sex,
    province,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
