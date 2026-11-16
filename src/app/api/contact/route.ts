import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase";

type ContactPayload = {
  locale?: string;
  name?: string;
  company?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  const company = body.company?.trim() || null;
  const locale = body.locale?.trim() || "ja";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
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

  const { error } = await supabase.from("contact_inquiries").insert({
    locale,
    name,
    company,
    email,
    message,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}