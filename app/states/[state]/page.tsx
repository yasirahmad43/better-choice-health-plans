import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CostCompare } from "@/components/sections/CostCompare";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "@/lib/seo";
import { getState, states } from "@/data/states";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = getState(state);
  if (!s) return {};
  return pageMeta({
    title: `Private PPO Health Insurance in ${s.name}`,
    description: `Find affordable private PPO health coverage in ${s.name}. Compare plans from major carriers with help from a licensed Better Choice advisor — year-round enrollment, no obligation.`,
    path: `/states/${s.slug}`,
  });
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = getState(state);
  if (!s) notFound();

  const stateFaqs = [
    {
      q: `Can I get private PPO health insurance in ${s.name}?`,
      a: `Yes. ${site.name} works with licensed advisors who help ${s.name} residents compare private PPO plans from major national carriers. Coverage is available year-round, so you don't have to wait for an open enrollment window.`,
    },
    {
      q: `How much does private health insurance cost in ${s.name}?`,
      a: `Premiums in ${s.name} depend on your age, household size, and the plan you choose. Many healthy ${s.name} residents who don't qualify for a subsidy find private PPO premiums noticeably lower than unsubsidized Marketplace plans. An advisor can confirm exact pricing for your situation.`,
    },
    {
      q: `Do these plans cover doctors in ${s.cities[0]} and across ${s.name}?`,
      a: `Private PPO plans use broad national networks, so members in ${s.cities.join(", ")}, and throughout ${s.name} can typically keep the doctors and hospitals they already use. Your advisor will confirm network details before you enroll.`,
    },
  ];

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "States", path: "/states" },
          { name: s.name, path: `/states/${s.slug}` },
        ]),
        serviceSchema(
          `Private PPO health insurance in ${s.name}`,
          `Free comparison and enrollment help for private PPO health plans in ${s.name}.`,
          s.name,
        ),
        faqSchema(stateFaqs),
      ]} />

      <PageHero
        eyebrow={`${s.name} · ${s.abbr}`}
        title={
          <>
            Private PPO health insurance in <span className="text-gradient-brand">{s.name}</span>
          </>
        }
        subtitle={`Affordable, flexible coverage for ${s.name} individuals, families, and the self-employed — with broad networks that work in ${s.cities.join(", ")}, and beyond.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "States", href: "/states" },
          { name: s.name, href: `/states/${s.slug}` },
        ]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-ink-700">
              <h2 className="font-display text-2xl font-semibold text-ink-900">
                Coverage built for {s.name} residents
              </h2>
              <p>
                If you live in {s.name} and don&apos;t qualify for a Marketplace subsidy, you may be
                overpaying for health insurance. {site.name} helps {s.name} residents compare private
                PPO plans from major carriers and find coverage that fits their budget and doctors —
                available year-round, not just during open enrollment.
              </p>
              <p>
                Whether you&apos;re self-employed in {s.cities[0]}, raising a family in {s.cities[1] ?? s.cities[0]},
                or bridging the gap to Medicare, a licensed advisor will walk you through your options at
                no cost.
              </p>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {[
                  "Broad PPO networks statewide",
                  "Year-round enrollment",
                  "Free licensed-advisor review",
                  "Plans from major carriers",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-base text-ink-700">
                    <Check className="h-5 w-5 shrink-0 text-green-600" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-ink-200 bg-ink-50 p-6">
              <div className="flex items-center gap-2 text-blue-700">
                <MapPin className="h-5 w-5" />
                <h3 className="font-display text-lg font-semibold">Serving all of {s.name}</h3>
              </div>
              <p className="mt-3 text-sm text-ink-600">Popular areas we help members in:</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.cities.map((city) => (
                  <li key={city} className="rounded-full border border-ink-200 bg-white px-3 py-1 text-sm text-ink-700">
                    {city}
                  </li>
                ))}
              </ul>
              <Link
                href="/#get-started"
                className="ring-focus mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent font-semibold text-white shadow-glow hover:bg-green-600"
              >
                Check {s.abbr} plan prices
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CostCompare />
      <HowItWorks />

      {/* state FAQ — visible + schema */}
      <section className="bg-ink-50 py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <h2 className="text-center font-display text-3xl font-semibold text-ink-900">
            {s.name} health insurance FAQ
          </h2>
          <div className="mt-10 space-y-4">
            {stateFaqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-ink-900">{f.q}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
