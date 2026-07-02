import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

function str(v: unknown, max = 200) {
  return typeof v === "string" ? v.trim().slice(0, max) : null;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (str(body.company)) return NextResponse.json({ ok: true }); // honeypot

  const name = str(body.name, 120);
  const email = str(body.email);
  const message = str(body.message, 4000);

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  const row = {
    name,
    email,
    phone: str(body.phone, 40),
    message,
    page_path: str(body.page_path, 200),
    user_agent: req.headers.get("user-agent")?.slice(0, 400) ?? null,
  };

  if (!isSupabaseConfigured()) {
    console.warn("[contact] Supabase not configured — message not persisted:", row.email);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("contact_messages").insert(row);
    if (error) {
      console.error("[contact] insert error:", error.message);
      return NextResponse.json({ ok: false, error: "Could not send message" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, stored: true });
  } catch (e) {
    console.error("[contact] unexpected:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
