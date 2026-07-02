import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

type LeadBody = Record<string, unknown>;

function str(v: unknown, max = 200) {
  return typeof v === "string" ? v.trim().slice(0, max) : null;
}

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silently accept bots without storing.
  if (str(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const email = str(body.email);
  const firstName = str(body.firstName, 80);
  const lastName = str(body.lastName, 80);
  const phone = str(body.phone, 40);

  if (!firstName || !email || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  const lead = {
    state: str(body.state, 40),
    household: str(body.household, 60),
    preexisting: str(body.preexisting, 10),
    timeframe: str(body.timeframe, 60),
    message: str(body.message, 2000),
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    consent: body.consent === true,
    source: str(body.source, 60) ?? "website",
    page_path: str(body.page_path, 200),
    utm_source: str(body.utm_source, 120),
    utm_medium: str(body.utm_medium, 120),
    utm_campaign: str(body.utm_campaign, 120),
    utm_term: str(body.utm_term, 120),
    utm_content: str(body.utm_content, 120),
    user_agent: req.headers.get("user-agent")?.slice(0, 400) ?? null,
    ip:
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      null,
  };

  // If Supabase isn't wired yet (e.g. local without env), don't hard-fail the UX.
  if (!isSupabaseConfigured()) {
    console.warn("[leads] Supabase not configured — lead not persisted:", lead.email);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("leads").insert(lead);
    if (error) {
      console.error("[leads] insert error:", error.message);
      return NextResponse.json({ ok: false, error: "Could not save lead" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, stored: true });
  } catch (e) {
    console.error("[leads] unexpected:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
