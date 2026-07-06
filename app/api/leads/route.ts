import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

type LeadBody = Record<string, unknown>;

function str(v: unknown, max = 200) {
  return typeof v === "string" ? v.trim().slice(0, max) : null;
}

/** Buckets UTM data into a human-readable channel for quick filtering in Zapier/CRM. */
function classifyTrafficSource(utmSource: string | null, utmMedium: string | null): string {
  const s = (utmSource ?? "").toLowerCase();
  const m = (utmMedium ?? "").toLowerCase();
  if (s.includes("facebook") || s === "fb") return "Facebook";
  if (s.includes("instagram") || s === "ig") return "Instagram";
  if (s.includes("google")) return "Google";
  if (s.includes("tiktok")) return "TikTok";
  if (s.includes("bing")) return "Bing";
  if (m.includes("cpc") || m.includes("paid")) return "Paid — Other";
  if (!s && !m) return "Organic / Direct";
  return utmSource ?? "Other";
}

/** Best-effort forward to Zapier (or any configured webhook). Never blocks or fails the lead save. */
async function forwardToWebhook(payload: Record<string, unknown>) {
  const url = process.env.ZAPIER_LEADS_WEBHOOK_URL;
  if (!url) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[leads] webhook non-OK response:", res.status);
    }
  } catch (e) {
    console.error("[leads] webhook error:", e);
  }
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

  const utmSource = str(body.utm_source, 120);
  const utmMedium = str(body.utm_medium, 120);

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
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: str(body.utm_campaign, 120),
    utm_term: str(body.utm_term, 120),
    utm_content: str(body.utm_content, 120),
    user_agent: req.headers.get("user-agent")?.slice(0, 400) ?? null,
    ip:
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      null,
  };

  const webhookPayload = {
    ...lead,
    traffic_source: classifyTrafficSource(utmSource, utmMedium),
    submitted_at: new Date().toISOString(),
  };

  // If Supabase isn't wired yet (e.g. local without env), don't hard-fail the UX.
  if (!isSupabaseConfigured()) {
    await forwardToWebhook(webhookPayload);
    console.warn("[leads] Supabase not configured — lead not persisted:", lead.email);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const supabase = getSupabaseAdmin();
    const [{ error }] = await Promise.all([
      supabase.from("leads").insert(lead),
      forwardToWebhook(webhookPayload),
    ]);
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
