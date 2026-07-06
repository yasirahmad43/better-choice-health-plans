"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Loader2,
  Lock,
  PartyPopper,
  Phone,
} from "lucide-react";
import { site } from "@/lib/site";
import { states } from "@/data/states";
import { cn } from "@/lib/utils";
import { Answers, emptyAnswers, householdSizes, timeframes } from "./types";

const TOTAL = 5;

function track(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // @ts-expect-error dataLayer is injected by GTM/analytics
  window.dataLayer = window.dataLayer || [];
  // @ts-expect-error see above
  window.dataLayer.push({ event, ...payload });
}

function collectUtm() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
    const v = p.get(k);
    if (v) out[k] = v;
  });
  return out;
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

/** Accepts a full state name or 2-letter abbreviation, case-insensitive (e.g. "Florida" or "FL"). */
function isValidStateInput(raw: string) {
  const v = raw.trim().toLowerCase();
  if (!v) return false;
  return states.some((s) => s.name.toLowerCase() === v || s.abbr.toLowerCase() === v);
}

export function Survey({
  className,
  source = "homepage_survey",
}: {
  className?: string;
  source?: string;
}) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const pct = done ? 100 : Math.round((step / (TOTAL - 1)) * 100);
  const stepLabel = done ? TOTAL : step + 1;

  const set = (patch: Partial<Answers>) => setAnswers((a) => ({ ...a, ...patch }));

  const goNext = () => {
    setDir(1);
    setStep((s) => Math.min(s + 1, TOTAL - 1));
    track("survey_step", { step: step + 1 });
  };
  const goBack = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const choose = (patch: Partial<Answers>) => {
    set(patch);
    setTimeout(goNext, 160);
  };

  const validateContact = () => {
    const e: Record<string, string> = {};
    if (answers.firstName.trim().length < 2) e.firstName = "Please enter your first name.";
    if (answers.lastName.trim().length < 2) e.lastName = "Please enter your last name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) e.email = "Enter a valid email address.";
    if (answers.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid 10-digit phone number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateContact()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          consent: true, // no separate checkbox — submitting the form is the consent action (see disclaimer text)
          ...collectUtm(),
          page_path: window.location.pathname,
          source,
          company: "", // honeypot
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone(true);
      track("generate_lead", { state: answers.state, timeframe: answers.timeframe });
    } catch {
      setError("Something went wrong. Please try again or call us — we're happy to help.");
    } finally {
      setSubmitting(false);
    }
  }

  const headings = useMemo(
    () => [
      "Let's find your coverage",
      "How many people in your household need health insurance coverage?",
      "Do you or anyone in your household have any major pre-existing conditions that need to be covered?",
      "Are you looking to start your health insurance plan within the next 30 days?",
      "Let's find your best coverage",
    ],
    []
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 shadow-lift ring-1 ring-black/[0.02] sm:p-8",
        className
      )}
    >
      {/* progress */}
      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-bold">
          <span className="text-blue-700">
            Step {stepLabel} of {TOTAL}
          </span>
          <span className="text-ink-500">{pct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
          <motion.div
            className="h-full rounded-full bg-gradient-brand"
            initial={false}
            animate={{ width: `${Math.max(pct, 3)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          />
        </div>
      </div>

      <div className="pt-6">
        {done ? (
          <SuccessPanel firstName={answers.firstName} />
        ) : (
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-display text-xl font-bold leading-snug text-ink-900 sm:text-2xl">
                {headings[step]}
              </h3>

              <div className="mt-5">
                {step === 0 && (
                  <div className="space-y-4">
                    <p className="-mt-2 text-sm text-ink-500">Start with your state.</p>
                    <div>
                      <label htmlFor="sv-state" className="sr-only">
                        State
                      </label>
                      <input
                        id="sv-state"
                        list="bc-states"
                        value={answers.state}
                        onChange={(e) => set({ state: e.target.value })}
                        placeholder="Type your state"
                        autoComplete="address-level1"
                        className={cn(
                          "ring-focus h-[56px] w-full rounded-xl border bg-white px-4 text-base text-ink-900 outline-none transition-colors placeholder:text-ink-400",
                          errors.state ? "border-destructive" : "border-ink-200 focus:border-blue-400"
                        )}
                      />
                      <datalist id="bc-states">
                        {states.map((s) => (
                          <option key={s.slug} value={s.name} />
                        ))}
                        {states.map((s) => (
                          <option key={s.abbr} value={s.abbr} />
                        ))}
                      </datalist>
                    </div>
                    <PrimaryNext
                      disabled={!isValidStateInput(answers.state)}
                      onClick={goNext}
                    />
                  </div>
                )}

                {step === 1 && (
                  <OptionGrid
                    options={householdSizes.map((h) => ({ value: h, label: h }))}
                    selected={answers.household}
                    onSelect={(v) => choose({ household: v })}
                    columns={2}
                  />
                )}

                {step === 2 && (
                  <OptionGrid
                    options={[
                      { value: "Yes", label: "Yes" },
                      { value: "No", label: "No" },
                    ]}
                    selected={answers.preexisting}
                    onSelect={(v) => choose({ preexisting: v })}
                    columns={2}
                  />
                )}

                {step === 3 && (
                  <OptionGrid
                    options={timeframes.map((t) => ({ value: t, label: t }))}
                    selected={answers.timeframe}
                    onSelect={(v) => choose({ timeframe: v })}
                    columns={1}
                  />
                )}

                {step === 4 && (
                  <form onSubmit={submit} className="space-y-4" noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        id="sv-first"
                        label="First name"
                        value={answers.firstName}
                        onChange={(v) => set({ firstName: v })}
                        error={errors.firstName}
                        autoComplete="given-name"
                        placeholder="First name"
                      />
                      <Field
                        id="sv-last"
                        label="Last name"
                        value={answers.lastName}
                        onChange={(v) => set({ lastName: v })}
                        error={errors.lastName}
                        autoComplete="family-name"
                        placeholder="Last name"
                      />
                    </div>
                    <Field
                      id="sv-phone"
                      label="Phone number"
                      type="tel"
                      value={answers.phone}
                      onChange={(v) => set({ phone: v })}
                      error={errors.phone}
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="Phone number"
                    />
                    <Field
                      id="sv-email"
                      label="Email address"
                      type="email"
                      value={answers.email}
                      onChange={(v) => set({ email: v })}
                      error={errors.email}
                      autoComplete="email"
                      inputMode="email"
                      placeholder="Email address"
                    />
                    <div>
                      <label htmlFor="sv-msg" className="mb-1.5 block text-sm font-medium text-ink-700">
                        Message (optional)
                      </label>
                      <textarea
                        id="sv-msg"
                        value={answers.message}
                        onChange={(e) => set({ message: e.target.value })}
                        rows={3}
                        placeholder="Anything we should know?"
                        className="ring-focus w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-blue-400"
                      />
                    </div>

                    {/* honeypot */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    />

                    <p className="text-xs leading-relaxed text-ink-500">
                      By submitting, you agree to receive calls/texts from {site.name}{" "}and its
                      licensed agents about coverage, including by automated technology. Consent
                      isn&apos;t a condition of purchase. Reply STOP to opt out. Msg/data rates may
                      apply.
                    </p>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="ring-focus inline-flex h-16 w-full items-center justify-center gap-2 rounded-full bg-accent text-lg font-extrabold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-green-600 disabled:opacity-70"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" /> Finding your plans…
                        </>
                      ) : (
                        <>See My Plan Options →</>
                      )}
                    </button>

                    {error && (
                      <p className="text-center text-sm font-medium text-destructive" role="alert">
                        {error}
                      </p>
                    )}
                  </form>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="ring-focus inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-ink-500 hover:text-blue-700"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                ) : (
                  <span />
                )}
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-400">
                  <Lock className="h-3.5 w-3.5 text-green-600" /> Your information is secure &amp; private
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function PrimaryNext({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="ring-focus inline-flex h-16 w-full items-center justify-center gap-2 rounded-full bg-accent text-lg font-extrabold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-green-600 disabled:opacity-60"
    >
      See My Plan Options <ArrowRight className="h-5 w-5" />
    </button>
  );
}

function OptionGrid({
  options,
  selected,
  onSelect,
  columns = 1,
}: {
  options: { value: string; label: string; hint?: string }[];
  selected: string;
  onSelect: (v: string) => void;
  columns?: 1 | 2;
}) {
  return (
    <div className={cn("grid gap-3", columns === 2 ? "grid-cols-2" : "grid-cols-1")}>
      {options.map((opt) => {
        const active = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={cn(
              "ring-focus group flex min-h-14 items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left transition-all",
              active
                ? "border-green-500 bg-green-50 shadow-soft"
                : "border-ink-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
            )}
          >
            <span>
              <span className="block font-semibold text-ink-900">{opt.label}</span>
              {opt.hint && <span className="text-xs text-ink-500">{opt.hint}</span>}
            </span>
            <span
              className={cn(
                "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                active
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-ink-300 text-transparent group-hover:border-blue-400"
              )}
            >
              {active ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type" | "id">) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={cn(
          "ring-focus h-[56px] w-full rounded-xl border bg-white px-4 text-base text-ink-900 outline-none transition-colors placeholder:text-ink-400",
          error ? "border-destructive" : "border-ink-200 focus:border-blue-400"
        )}
        {...rest}
      />
      {error && (
        <p className="mt-1 text-xs font-medium text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessPanel({ firstName }: { firstName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-4 text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <PartyPopper className="h-8 w-8" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">
        You&apos;re all set{firstName ? `, ${firstName}` : ""}!
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-ink-600">
        A licensed advisor is reviewing private PPO plans that match your answers. Expect a call or
        email shortly — usually within one business hour.
      </p>
      <a
        href={site.phoneHref}
        className="ring-focus mt-6 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-blue-600 font-semibold text-white shadow-soft hover:bg-blue-700"
      >
        <Phone className="h-5 w-5" /> Prefer to talk now? {site.phone}
      </a>
    </motion.div>
  );
}
