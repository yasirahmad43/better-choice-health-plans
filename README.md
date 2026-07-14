# Better Choice Health Plans

Conversion-focused marketing site for **Better Choice Health Plans**, an independent private-PPO health insurance brokerage. Built to capture leads via an animated multi-step survey and drive phone/quote CTAs, with full SEO/GEO/AEO structure and a mobile-first, ad-ready design.

## Stack
- **Next.js 16** (App Router) · React 19 · TypeScript
- **Tailwind CSS v4** (brand design tokens in `app/globals.css`)
- **Framer Motion** (survey + scroll animations)
- **Supabase** (lead + contact storage)
- **Vercel** (hosting) · **GitHub** (source)

## Getting started
```bash
npm install
cp .env.example .env.local   # fill in Supabase keys
npm run dev                  # http://localhost:3000
```

The lead/contact API routes degrade gracefully: if Supabase env vars are absent, submissions return success without persisting (logged to the server console), so the UI always works in dev.

## Environment variables
| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | server | Supabase project URL |
| `SUPABASE_KEY` | server | Publishable key used by API routes. Tables are RLS **insert-only**, so it can write submissions but not read them — rows are viewable only from the Supabase dashboard. |

## Project structure
- `app/` — routes (home, about, contact, compare + `[slug]`, states + `[state]`, legal), API routes, `sitemap.ts`, `robots.ts`, dynamic `opengraph-image.tsx` / `icon.tsx`.
- `components/sections/` — homepage sections.
- `components/survey/` — the animated lead-capture survey (the conversion centerpiece).
- `components/site/` — Header, Footer, MobileStickyBar, Logo, PageHero, LegalLayout.
- `components/ui/` — Button, Reveal/SectionHeading primitives.
- `lib/` — `site.ts` (NAP/brand single source of truth), `seo.tsx` (metadata + JSON-LD), `supabase.ts`.
- `data/` — states, comparisons, marketing content.

## Things to customize before launch
1. **Phone number** — `lib/site.ts` (`phone` / `phoneHref`). Currently a placeholder.
2. **Domain** — `lib/site.ts` (`url`) and Vercel domain settings.
3. **Real logo** — drop official PNGs into `public/brand/` and swap `components/site/Logo.tsx` if pixel-exact branding is needed.
4. **Carrier logos & testimonials** — currently illustrative; replace with approved assets.
5. **Analytics** — survey fires `dataLayer` events (`survey_step`, `generate_lead`); add GTM/GA4 to capture them.
