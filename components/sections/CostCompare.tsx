import Image from "next/image";
import { Check, X } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const rows = [
  { label: "Typical monthly premium (no subsidy)", market: "$750", priv: "$300" },
  { label: "Enroll any time of year", market: false, priv: true },
  { label: "Broad nationwide PPO network", market: false, priv: true },
  { label: "Keep your preferred doctors", market: "Limited", priv: true },
  { label: "Month-to-month flexibility", market: false, priv: true },
];

export function CostCompare() {
  return (
    <section className="bg-ink-50 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Compare your options"
          title={
            <>
              Many people may be paying{" "}
              <span className="text-gradient-brand">more than they need to</span>
            </>
          }
          subtitle="See how private PPO plans may compare to common alternatives — coverage, costs, and flexibility side by side."
        />

        <div className="mx-auto mt-14 grid max-w-6xl items-stretch gap-8 lg:grid-cols-2">
          {/* LEFT: image */}
          <Reveal>
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-3xl shadow-lift">
              <Image
                src="/images/family.png"
                alt="A family who found private PPO coverage that fits their budget"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/65 via-ink-900/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="font-display text-2xl font-bold leading-tight sm:text-3xl">
                  Coverage that fits your budget
                </p>
                <p className="mt-1.5 max-w-sm text-sm text-white/85">
                  See how a private PPO plan may compare to what you could be paying now.
                </p>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: single "Check my price" box with VS */}
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-3xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
              {/* premium head-to-head with VS */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="text-center">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">
                    Marketplace
                  </div>
                  <div className="mt-1 font-display text-3xl font-bold text-ink-700">
                    $750
                    <span className="text-base font-semibold text-ink-400">/mo</span>
                  </div>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-brand text-sm font-extrabold text-white shadow-glow">
                  VS
                </div>
                <div className="text-center">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-700">
                    Better Choice
                  </div>
                  <div className="mt-1 font-display text-3xl font-bold text-gradient-brand">
                    $300
                    <span className="text-base font-semibold text-ink-400">/mo</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-green-50 p-3 text-center text-sm text-green-800">
                <strong>Example savings ~$450/mo</strong> — over $5,400 a year
              </div>

              {/* feature comparison */}
              <div className="mt-6 overflow-hidden rounded-xl border border-ink-100">
                <div className="grid grid-cols-[1.5fr_0.75fr_0.75fr] gap-2 bg-ink-50 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-500">
                  <span>Feature</span>
                  <span className="text-center">Marketplace</span>
                  <span className="text-center text-blue-700">Better Choice</span>
                </div>
                {rows.map((r) => (
                  <div
                    key={r.label}
                    className="grid grid-cols-[1.5fr_0.75fr_0.75fr] items-center gap-2 border-t border-ink-100 px-4 py-3"
                  >
                    <span className="text-sm text-ink-700">{r.label}</span>
                    <span className="flex justify-center">
                      <Cell v={r.market} />
                    </span>
                    <span className="flex justify-center">
                      <Cell v={r.priv} highlight />
                    </span>
                  </div>
                ))}
              </div>

              {/* single CTA */}
              <div className="mt-6">
                <ButtonLink href="/#get-started" size="lg" className="w-full">
                  Check my price
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink-500">
          Examples shown are illustrative only. Actual pricing and eligibility vary by age, state,
          plan, and carrier.
        </p>
      </div>
    </section>
  );
}

function Cell({ v, highlight }: { v: string | boolean; highlight?: boolean }) {
  if (v === true)
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          highlight ? "bg-green-100 text-green-600" : "bg-ink-100 text-ink-500"
        }`}
      >
        <Check className="h-4 w-4" />
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-100 text-ink-400">
        <X className="h-4 w-4" />
      </span>
    );
  return (
    <span className={`text-sm font-semibold ${highlight ? "text-green-700" : "text-ink-600"}`}>
      {v}
    </span>
  );
}
