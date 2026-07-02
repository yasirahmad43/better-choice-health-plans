import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/Reveal";
import { testimonials } from "@/data/content";

export function Testimonials() {
  // Duplicate the list so the marquee loops seamlessly at -50%.
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Member stories"
          title="Real people, real coverage, real savings"
          subtitle="Trusted by families, self-employed individuals, and those leaving employer coverage. (Illustrative examples.)"
        />
      </div>

      {/* slow auto-scrolling marquee (pauses on hover) */}
      <div className="group relative mt-12 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
        <div className="flex w-max animate-[marquee_90s_linear_infinite] gap-5 px-4 group-hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:w-[360px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-7 w-7 text-blue-100" />
              </div>
              <blockquote className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-ink-800">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-ink-100 pt-4">
                <div className="font-semibold text-ink-900">{t.name}</div>
                <div className="text-sm text-ink-500">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="container-page">
        <p className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm font-medium text-ink-600">
          <span className="inline-flex items-center gap-1 font-bold text-ink-900">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.9/5
          </span>
          average rating · 1,200+ members helped nationwide
        </p>
      </div>
    </section>
  );
}
