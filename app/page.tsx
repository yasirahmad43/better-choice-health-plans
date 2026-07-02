import { Hero } from "@/components/sections/Hero";
import { Carriers } from "@/components/sections/Carriers";
import { Stats } from "@/components/sections/Stats";
import { Pillars } from "@/components/sections/Pillars";
import { CostCompare } from "@/components/sections/CostCompare";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { Guidance } from "@/components/sections/Guidance";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { WaveDivider } from "@/components/site/WaveDivider";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd, faqSchema, serviceSchema } from "@/lib/seo";
import { faqs } from "@/data/content";
import { site } from "@/lib/site";
import { Phone } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs.map((f) => ({ q: f.q, a: f.a }))),
          serviceSchema(
            "Private PPO health insurance brokerage",
            "Free comparison and enrollment help for private PPO health plans for individuals, families, and the self-employed across the United States.",
          ),
        ]}
      />
      <Hero />
      <Carriers />
      <Stats />
      <Pillars />
      <WaveDivider topColor="#ffffff" color="#f6f8fb" />
      <CostCompare />
      <WaveDivider topColor="#f6f8fb" color="#ffffff" />
      <HowItWorks />
      <WaveDivider topColor="#ffffff" color="#f6f8fb" />
      <WhoWeHelp />
      <WaveDivider topColor="#f6f8fb" color="#ffffff" />
      <Guidance />
      <Testimonials />
      <WaveDivider topColor="#ffffff" color="#f6f8fb" />
      <FAQ />
      <WaveDivider topColor="#f6f8fb" color="#ffffff" />

      <section className="pb-6 pt-4 text-center sm:pb-10">
        <div className="container-page">
          <p className="text-lg font-semibold text-ink-800 sm:text-xl">
            Still have questions? Talk to a licensed advisor.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="outline" size="lg">
              Talk to a licensed advisor
            </ButtonLink>
            <a
              href={site.phoneHref}
              className="ring-focus inline-flex h-14 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              <Phone className="h-5 w-5" /> Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
