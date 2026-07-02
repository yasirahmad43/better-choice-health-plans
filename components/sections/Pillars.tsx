import { BookOpen, Map, ShieldCheck, Wallet } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { pillars } from "@/data/content";

const icons = { shield: ShieldCheck, book: BookOpen, map: Map, wallet: Wallet };

export function Pillars() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Better Choice"
          title="Guidance you can trust, coverage that travels with you"
          subtitle="We're independent — so our only job is matching you with the right plan, not pushing one company's products."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = icons[p.icon as keyof typeof icons];
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="group h-full rounded-2xl border border-ink-200 bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lift">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
                    <Icon className="h-7 w-7" strokeWidth={2.25} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                    {p.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-700">{p.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
