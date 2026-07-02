import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/content";

/** Compact social-proof band — reinforces scale & trust right under the fold. */
export function Stats() {
  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 shadow-soft lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="flex h-full flex-col items-center justify-center bg-white px-4 py-8 text-center">
                <div className="font-display text-4xl font-extrabold leading-none text-gradient-brand sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2.5 max-w-[14rem] text-sm font-semibold leading-snug text-ink-700 sm:text-base">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
