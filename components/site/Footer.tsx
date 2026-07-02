import Link from "next/link";
import { Phone, Mail, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import { featuredStates } from "@/data/states";

const columns = [
  {
    title: "Coverage",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Get My Free Options", href: "/#get-started" },
      { label: "Who we help", href: "/#who-we-help" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "Private PPO vs ACA Marketplace", href: "/compare/vs-aca-marketplace" },
      { label: "Private PPO vs COBRA", href: "/compare/vs-cobra" },
      { label: "Private PPO vs Short-Term", href: "/compare/vs-short-term" },
      { label: "All comparisons", href: "/compare" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Browse states", href: "/states" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-200 bg-ink-50">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">
              An independent health insurance brokerage helping individuals, families, and the
              self-employed find private PPO coverage that fits — nationwide, year-round.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 font-semibold text-blue-700 hover:underline"
              >
                <Phone className="h-4 w-4" aria-hidden /> {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-ink-600 hover:text-blue-700"
              >
                <Mail className="h-4 w-4" aria-hidden /> {site.email}
              </a>
              <p className="flex items-center gap-2 text-ink-600">
                <Clock className="h-4 w-4" aria-hidden /> {site.hours}
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-800">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-600 transition-colors hover:text-blue-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-ink-200 pt-8">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Popular states
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {featuredStates.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/states/${s.slug}`}
                  className="text-sm text-ink-600 hover:text-blue-700"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 space-y-4 border-t border-ink-200 pt-8 text-[13px] leading-relaxed text-ink-500">
          <p>
            <strong className="text-ink-700">Disclosure:</strong> {site.name} is a private,
            independent health insurance brokerage and is <strong>not a government agency</strong>.
            We are not affiliated with, or endorsed by, any federal or state government program, the
            Health Insurance Marketplace, Medicare, or Medicaid. Plan availability, pricing, benefits,
            networks, and eligibility vary by state and individual circumstances. Any premium figures
            shown are illustrative examples for comparison only and are not offers or guarantees of
            coverage. A licensed advisor will confirm details and exact pricing for your situation.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.legalName}. All rights reserved.
            </p>
            <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
              <Link href="/privacy" className="hover:text-blue-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-700">Terms of Use</Link>
              <Link href="/disclosures" className="hover:text-blue-700">Disclosures</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
