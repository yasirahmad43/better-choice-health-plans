import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd, breadcrumbSchema, pageMeta, serviceSchema } from "@/lib/seo";
import { comparisons, getComparison } from "@/data/comparisons";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return pageMeta({ title: c.metaTitle, description: c.metaDescription, path: `/compare/${c.slug}` });
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: `vs ${c.vs}`, path: `/compare/${c.slug}` },
        ]),
        serviceSchema(c.title, c.metaDescription),
      ]} />

      <PageHero
        eyebrow="Coverage comparison"
        title={c.title}
        subtitle={c.intro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Compare", href: "/compare" },
          { name: `vs ${c.vs}`, href: `/compare/${c.slug}` },
        ]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page max-w-4xl">
          {/* Key takeaway — AEO answer block */}
          <Reveal>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-7">
              <h2 className="font-display text-lg font-semibold text-blue-900">The short answer</h2>
              <p className="mt-2 leading-relaxed text-blue-900/90">{c.takeaway}</p>
            </div>
          </Reveal>

          {/* Comparison table */}
          <Reveal>
            <div className="mt-10 overflow-hidden rounded-2xl border border-ink-200 shadow-soft">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-ink-50 text-sm">
                    <th className="px-5 py-4 font-semibold text-ink-700">Feature</th>
                    <th className="px-5 py-4 font-semibold text-ink-600">{c.columns.a}</th>
                    <th className="px-5 py-4 font-semibold text-blue-700">{c.columns.b}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((r, i) => (
                    <tr key={r.feature} className={i % 2 ? "bg-white" : "bg-ink-50/40"}>
                      <td className="px-5 py-4 text-sm font-medium text-ink-800">{r.feature}</td>
                      <td className="px-5 py-4 text-sm text-ink-600">{r.a}</td>
                      <td className="px-5 py-4 text-sm font-medium text-ink-900">{r.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* AEO body sections */}
          <div className="mt-12 space-y-10">
            {c.body.map((b) => (
              <Reveal key={b.h}>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink-900">{b.h}</h2>
                  <p className="mt-3 text-lg leading-relaxed text-ink-700">{b.p}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Best-for split */}
          <Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              <BestFor title={`${c.columns.a} is better if…`} items={c.bestFor.a} tone="neutral" />
              <BestFor title={`${c.columns.b} is better if…`} items={c.bestFor.b} tone="brand" />
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 rounded-2xl bg-ink-50 p-7 text-center">
              <h2 className="font-display text-2xl font-semibold text-ink-900">
                Not sure which fits you?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-ink-600">
                A licensed advisor will compare your real options in minutes — free and with no obligation.
              </p>
              <div className="mt-6">
                <ButtonLink href="/#get-started" size="lg">See my plan matches</ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

function BestFor({ title, items, tone }: { title: string; items: string[]; tone: "neutral" | "brand" }) {
  const brand = tone === "brand";
  return (
    <div className={`rounded-2xl border p-6 ${brand ? "border-green-200 bg-green-50" : "border-ink-200 bg-white"}`}>
      <h3 className="font-display text-lg font-semibold text-ink-900">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-ink-700">
            {brand ? (
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            ) : (
              <X className="mt-0.5 h-5 w-5 shrink-0 text-ink-400" />
            )}
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
