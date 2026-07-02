/**
 * Single source of truth for brand / NAP (name, address, phone) data.
 * Swap PHONE + URL here once the real tracked number and domain are live.
 */
export const site = {
  name: "Better Choice Health Plans",
  shortName: "Better Choice",
  legalName: "Better Choice Health Plans LLC",
  tagline: "A better choice for affordable PPO health coverage.",
  description:
    "Better Choice Health Plans is an independent health insurance brokerage helping individuals, families, and the self-employed find flexible private PPO coverage from major carriers — with broad networks, year-round enrollment, and free guidance from licensed advisors.",
  // Placeholder — replace with the real tracked number before launch.
  phone: "(800) 555-0142",
  phoneHref: "tel:+18005550142",
  email: "hello@betterchoicehealthplans.com",
  // Deployed to a Vercel subdomain first; replace when the real domain is live.
  url: "https://betterchoicehealthplans.com",
  hours: "Mon–Fri, 8am–8pm ET · Sat 9am–5pm ET",
  address: {
    region: "Nationwide (all 50 states)",
    locality: "United States",
    country: "US",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
} as const;

export const carriers = [
  "Aetna",
  "Cigna",
  "UnitedHealthcare",
  "Blue Cross Blue Shield",
  "Humana",
  "Oscar",
] as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Compare Coverage", href: "/compare" },
  { label: "States", href: "/states" },
  { label: "Contact Us", href: "/contact" },
] as const;
