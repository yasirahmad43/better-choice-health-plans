import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Survey } from "@/components/survey/Survey";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Better Choice Health Plans",
  description:
    "Talk to a licensed advisor about private PPO health coverage. Call us, email us, or send a message — free, no-obligation help nationwide.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ])} />

      <PageHero
        eyebrow="Contact"
        title="Talk to a licensed advisor"
        subtitle="Have a question or ready to compare plans? Reach out and a real, licensed advisor will help — no pressure, no cost."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <ContactCard icon={Phone} title="Call us" lines={[site.phone]} href={site.phoneHref} cta="Tap to call" />
            <ContactCard icon={Mail} title="Email us" lines={[site.email]} href={`mailto:${site.email}`} cta="Send an email" />
            <div className="rounded-2xl border border-ink-200 bg-ink-50 p-6">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-teal-500" />
                <div>
                  <h3 className="font-semibold text-ink-900">Hours</h3>
                  <p className="text-ink-600">{site.hours}</p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-teal-500" />
                <div>
                  <h3 className="font-semibold text-ink-900">Service area</h3>
                  <p className="text-ink-600">{site.address.region}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-900">
              Compare your plan options
            </h2>
            <p className="mb-5 mt-1.5 text-ink-600">
              Answer a few quick questions and a licensed advisor will follow up — free, no obligation.
            </p>
            <Survey source="contact_page" />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
  href,
  cta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  href: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      className="ring-focus group flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
        <Icon className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <h3 className="font-semibold text-ink-900">{title}</h3>
        {lines.map((l) => (
          <p key={l} className="break-all font-display text-lg font-semibold text-blue-700">{l}</p>
        ))}
        <span className="text-sm text-ink-500 group-hover:text-blue-700">{cta} →</span>
      </div>
    </a>
  );
}
