import Image from "next/image";
import { Phone, Check, BadgeCheck } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

const points = [
  "Licensed in all 50 states — real people, not a script",
  "We check your doctors are in-network before you enroll",
  "Honest comparisons across carriers, no pressure to buy",
  "One point of contact, available year-round",
];

export function Guidance() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        {/* image collage */}
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-gradient-brand p-1.5 shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
                <Image
                  src="/images/advisor.jpg"
                  alt="A friendly licensed Better Choice health insurance advisor ready to help by phone"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* inset member photo */}
            <div className="absolute -bottom-8 -right-3 hidden w-44 overflow-hidden rounded-2xl border-4 border-white shadow-card sm:block lg:-right-6 lg:w-52">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/retirees.png"
                  alt="A happy retired couple who found coverage with Better Choice"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* licensed badge */}
            <div className="absolute -left-3 top-5 flex items-center gap-2 rounded-full border border-ink-100 bg-white/95 px-3.5 py-2 shadow-card backdrop-blur">
              <BadgeCheck className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-ink-800">Licensed advisors</span>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Personal guidance"
            title="Talk to a real licensed advisor — never a call center"
            subtitle="Health coverage is too important to guess at. Your dedicated Better Choice advisor learns your situation, lays out your options in plain English, and helps you choose with confidence."
          />
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3.5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink-700">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Licensed support", "No-pressure guidance", "Private PPO expertise", "Real people, not bots"].map(
                (t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                  >
                    <BadgeCheck className="h-3.5 w-3.5 text-green-600" /> {t}
                  </span>
                )
              )}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/#get-started" size="lg">
                Get matched with an advisor
              </ButtonLink>
              <a
                href={site.phoneHref}
                className="ring-focus inline-flex h-14 items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-6 font-semibold text-blue-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-blue-300"
              >
                <Phone className="h-5 w-5" /> {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
