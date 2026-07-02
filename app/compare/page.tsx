import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { comparisons } from "@/data/comparisons";

export const metadata = pageMeta({
  title: "Compare Coverage Options",
  description:
    "Private PPO vs. ACA Marketplace, COBRA, and short-term plans — clear, side-by-side comparisons to help you pick the right health coverage.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Compare coverage", path: "/compare" },
      ])} />

      <PageHero
        eyebrow="Compare coverage"
        title="How private PPO plans stack up against the alternatives"
        subtitle="No spin — just clear, side-by-side comparisons so you can see exactly where a private PPO plan wins, and where another option might fit you better."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Compare", href: "/compare" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {comparisons.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.07}>
              <Link
                href={`/compare/${c.slug}`}
                className="ring-focus group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                  <Scale className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl font-semibold text-ink-900">
                  Private PPO vs. {c.vs}
                </h2>
                <p className="mt-2 flex-1 leading-relaxed text-ink-600">{c.intro}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-blue-700">
                  Read the comparison
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
