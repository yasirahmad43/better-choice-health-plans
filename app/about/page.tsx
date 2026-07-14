import { Heart, ShieldCheck, Users, Compass, Scale, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Better Choice Health Plans",
  description:
    "Better Choice Health Plans is an independent health insurance brokerage helping individuals, families, and the self-employed find private PPO coverage with honest, education-first guidance.",
  path: "/about",
});

const values = [
  { icon: Compass, title: "Independent by design", body: "We don't work for a single carrier. We work for you — comparing plans across major insurers to find your best fit." },
  { icon: Scale, title: "Education over pressure", body: "We explain the trade-offs in plain English and let you decide. No scripts, no scare tactics, no hard sell." },
  { icon: Heart, title: "People before policies", body: "Behind every recommendation is a real person with real needs. We treat your coverage like it's our own family's." },
  { icon: ShieldCheck, title: "Transparency always", body: "Clear pricing, clear disclosures, clear next steps. You'll always know exactly where you stand." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ])} />

      <PageHero
        eyebrow="About us"
        title="A clearer, fairer path to private health coverage"
        subtitle={`${site.name} was built on a simple belief: finding good health insurance shouldn't feel like a battle. We're the licensed advisors in your corner.`}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="prose-tp space-y-5 text-lg leading-relaxed text-ink-700">
              <h2 className="font-display text-2xl font-semibold text-ink-900">Why we exist</h2>
              <p>
                Millions of Americans don&apos;t qualify for Marketplace subsidies — the self-employed,
                freelancers, early retirees, families between jobs. For them, the &ldquo;official&rdquo;
                options are often shockingly expensive, and the alternatives are confusing.
              </p>
              <p>
                We started Better Choice to fix that. As an independent brokerage, we compare private PPO
                plans from the carriers you already trust and match you with coverage that actually fits
                your budget, your doctors, and your life — available year-round, not just during a narrow
                enrollment window.
              </p>
              <p>
                Our advisors are licensed, our guidance is free, and our only goal is getting you to the
                right plan. That&apos;s the whole business.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-ink-200 bg-ink-50 p-7">
              <h3 className="font-display text-xl font-semibold text-ink-900">By the numbers</h3>
              <dl className="mt-5 space-y-5">
                {[
                  { icon: Users, k: "12,000+", v: "Members guided to coverage" },
                  { icon: ShieldCheck, k: "All 50 states", v: "Nationwide plan access" },
                  { icon: PhoneCall, k: "Under 1 hour", v: "Typical advisor response" },
                ].map((s) => (
                  <div key={s.v} className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <dt className="font-display text-xl font-bold text-ink-900">{s.k}</dt>
                      <dd className="text-sm text-ink-600">{s.v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs text-ink-400">Illustrative figures; individual results vary.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-50 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-center font-display text-3xl font-semibold text-ink-900">What we stand for</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="flex gap-4 rounded-2xl border border-ink-200 bg-white p-6 shadow-soft">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-500">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink-900">{v.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink-600">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
