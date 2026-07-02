import Link from "next/link";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { UsMap } from "@/components/sections/UsMap";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { states } from "@/data/states";

export const metadata = pageMeta({
  title: "Private PPO Health Insurance by State",
  description:
    "Find private PPO health coverage in your state. Better Choice Health Plans connects individuals and families with licensed advisors in all 50 states.",
  path: "/states",
});

export default function StatesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "States", path: "/states" },
      ])} />

      <PageHero
        eyebrow="Browse by state"
        title="Private PPO coverage, available in all 50 states"
        subtitle="Health plans and pricing vary by location. Choose your state to learn how private PPO coverage works where you live."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "States", href: "/states" }]}
      />

      <section className="py-14 sm:py-16">
        <div className="container-page">
          <div className="rounded-3xl border border-ink-200 bg-gradient-hero p-5 shadow-soft sm:p-8">
            <UsMap />
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <h2 className="mb-6 font-display text-2xl font-semibold text-ink-900">
            Or pick your state from the list
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {states.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/states/${s.slug}`}
                  className="ring-focus group flex items-center gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3.5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-card"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-gradient-brand group-hover:text-white">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="font-medium text-ink-800 group-hover:text-blue-700">{s.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
