import type { Metadata } from "next";
import { site } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
};

/** Build consistent per-page metadata (title, canonical, OG, Twitter).
 *  OG/Twitter images are supplied automatically by app/opengraph-image.tsx. */
export function pageMeta({
  title,
  description,
  path = "/",
  noindex = false,
}: PageMetaInput): Metadata {
  const url = new URL(path, site.url).toString();
  const fullTitle =
    path === "/" ? title : `${title} | ${site.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Renders a <script type="application/ld+json"> block. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "InsuranceAgency"],
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  areaServed: { "@type": "Country", name: "United States" },
  knowsAbout: [
    "Private PPO health insurance",
    "Individual health coverage",
    "Self-employed health insurance",
    "Health plan comparison",
  ],
  logo: `${site.url}/icon`,
  sameAs: [site.social.facebook, site.social.instagram, site.social.linkedin],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(name: string, description: string, areaServed?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: areaServed
      ? { "@type": "State", name: areaServed }
      : { "@type": "Country", name: "United States" },
  };
}
