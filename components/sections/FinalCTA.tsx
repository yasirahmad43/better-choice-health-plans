import Image from "next/image";
import { Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20">
            {/* background photo */}
            <Image
              src="/images/family.jpg"
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-center"
            />
            {/* brand gradient overlay for contrast */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-brand opacity-[0.92]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-white/10 blur-2xl"
            />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
                <ShieldCheck className="h-4 w-4" /> No obligation · free plan review
              </span>
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[2.75rem]">
                Make the better choice for your coverage — start with one quick question
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/95 sm:text-xl">
                See your private PPO plan options in under 2 minutes — or talk to a licensed advisor
                now. Free &amp; no obligation.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ButtonLink href="/#get-started" variant="white" size="lg" className="w-full sm:w-auto">
                  Get My Free Options <ArrowRight className="h-5 w-5" />
                </ButtonLink>
                <a
                  href={site.phoneHref}
                  className="ring-focus inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border border-white/40 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto sm:text-lg"
                >
                  <Phone className="h-5 w-5" /> {site.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
