import Image from "next/image";
import { Check, TrendingDown } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { audiences } from "@/data/content";

export function WhoWeHelp() {
  return (
    <section id="who-we-help" className="scroll-mt-24 bg-ink-50 py-20 sm:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Who we help"
            title="Built for people traditional coverage often overlooks"
            subtitle="If you're paying full price on the Marketplace or stuck between jobs, a private PPO plan is often the smarter move. We specialize in exactly these situations."
          />
          <Reveal delay={0.1}>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {audiences.map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3.5 shadow-soft transition-colors hover:border-green-300"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="font-semibold text-ink-800">{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9">
              <ButtonLink href="/#get-started" size="lg">
                Find my plan
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-gradient-brand p-1.5 shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
                <Image
                  src="/images/self-employed.jpg"
                  alt="A self-employed Better Choice member working confidently from her bright home office"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* inset: friendly phone help */}
            <div className="absolute -right-4 -top-6 hidden w-36 overflow-hidden rounded-2xl border-4 border-white shadow-card sm:block lg:w-44">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/man-phone.png"
                  alt="A Better Choice member getting friendly help over the phone"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* floating savings badge */}
            <div className="absolute -bottom-5 left-4 rounded-2xl border border-ink-100 bg-white/95 p-3.5 pr-5 shadow-card backdrop-blur sm:left-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <TrendingDown className="h-6 w-6" />
                </span>
                <div>
                  <div className="font-display text-2xl font-bold text-gradient-brand">$5,400</div>
                  <div className="text-xs text-ink-600">Avg. annual savings*</div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-9 text-xs text-ink-400">
            *Illustrative figure based on common member scenarios. Individual results vary.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
