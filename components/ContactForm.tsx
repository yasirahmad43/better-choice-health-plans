"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (form.message.trim().length < 5) e.message = "Tell us a little about what you need.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, page_path: window.location.pathname }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink-900">Message received</h3>
        <p className="mt-2 text-ink-600">
          Thanks for reaching out — a licensed advisor will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-ink-200 bg-white p-6 shadow-soft sm:p-8" noValidate>
      <Row label="Your name" id="c-name" error={errors.name}>
        <input id="c-name" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className="input-tp" placeholder="Jordan Lee" />
      </Row>
      <div className="grid gap-5 sm:grid-cols-2">
        <Row label="Email" id="c-email" error={errors.email}>
          <input id="c-email" type="email" inputMode="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className="input-tp" placeholder="you@email.com" />
        </Row>
        <Row label="Phone (optional)" id="c-phone">
          <input id="c-phone" type="tel" inputMode="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className="input-tp" placeholder="(555) 555-5555" />
        </Row>
      </div>
      <Row label="How can we help?" id="c-message" error={errors.message}>
        <textarea id="c-message" value={form.message} onChange={(e) => set("message", e.target.value)} rows={5} className="input-tp resize-none py-3" placeholder="Tell us about your situation and what you're looking for…" />
      </Row>

      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden value={form.company} onChange={(e) => set("company", e.target.value)} className="absolute left-[-9999px] h-0 w-0 opacity-0" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="ring-focus inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-accent font-semibold text-white shadow-glow transition-all hover:bg-green-600 disabled:opacity-70"
      >
        {status === "sending" ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>
        ) : (
          <>Send message <Send className="h-4 w-4" /></>
        )}
      </button>
      {status === "error" && (
        <p className="text-center text-sm font-medium text-destructive" role="alert">
          Something went wrong. Please try again or call us directly.
        </p>
      )}
    </form>
  );
}

function Row({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-destructive" role="alert">{error}</p>}
    </div>
  );
}
