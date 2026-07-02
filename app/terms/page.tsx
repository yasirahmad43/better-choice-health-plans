import { LegalLayout } from "@/components/site/LegalLayout";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Terms of Use",
  description: `The terms governing your use of the ${site.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" updated="June 2026">
      <p>
        By accessing or using the {site.name} website, you agree to these Terms of Use. If you do not
        agree, please do not use the site.
      </p>

      <h2>Informational purpose</h2>
      <p>
        Content on this site is provided for general informational purposes only and does not constitute
        insurance, legal, tax, or financial advice. Plan benefits, availability, networks, and pricing
        vary by carrier, state, and individual eligibility. Any figures shown are illustrative examples,
        not offers or guarantees of coverage.
      </p>

      <h2>No agency relationship with government programs</h2>
      <p>
        {site.name} is a private, independent insurance brokerage. We are not affiliated with or endorsed
        by any federal or state government agency, the Health Insurance Marketplace, Medicare, or Medicaid.
      </p>

      <h2>Consent to contact</h2>
      <p>
        By submitting your information, you authorize {site.name} and its licensed advisors to contact you
        at the phone number and email you provide — including by automated technology and prerecorded
        messages — about health coverage. Consent is not a condition of any purchase. Message and data
        rates may apply.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content, branding, and design on this site are owned by {site.legalName} or its licensors and
        may not be copied or reused without permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; without warranties of any kind. To the fullest extent
        permitted by law, {site.name} is not liable for any damages arising from your use of the site.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalLayout>
  );
}
