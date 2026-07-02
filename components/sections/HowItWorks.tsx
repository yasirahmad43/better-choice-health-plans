import Image from "next/image";
import { ClipboardCheck, SearchCheck, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { steps } from "@/data/content";

const icons = [ClipboardCheck, SearchCheck, ShieldCheck];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-24">
      <div className="container-page grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT: content */}
        <div className="flex flex-col justify-center">
          <SectionHeading
            align="left"
            eyebrow="How it works"
            title="Coverage in three simple steps"
            subtitle="No paperwork marathons. No pressure. Just a clear path from question to coverage."
          />

          <ol className="relative mt-10 space-y-6">
            {/* vertical connector */}
            <span
              aria-hidden
              className="absolute bottom-12 left-7 top-5 hidden w-px bg-gradient-to-b from-blue-200 via-teal-200 to-green-200 sm:block"
            />
            {steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={s.n} delay={i * 0.08}>
                  <li className="relative flex gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-card ring-1 ring-ink-100">
                      <Icon className="h-6 w-6 text-teal-500" strokeWidth={2.25} />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-brand text-xs font-bold text-white shadow-glow">
                        {s.n}
                      </span>
                    </div>
                    <div className="pb-1">
                      <h3 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-[1.05rem] leading-relaxed text-ink-700">{s.body}</p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={0.2}>
            <div className="mt-9">
              <ButtonLink href="/#get-started" size="lg">
                Start My Free Review
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* RIGHT: image */}
        <Reveal delay={0.1}>
          <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-ink-200 shadow-lift">
            <Image
              src="/images/couple-laptop.jpg"
              alt="A couple reviewing their private PPO plan options together at home"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
