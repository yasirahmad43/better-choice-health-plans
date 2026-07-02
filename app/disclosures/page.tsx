import { LegalLayout } from "@/components/site/LegalLayout";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Disclosures",
  description: `Important disclosures about ${site.name} and the private health coverage we help you compare.`,
  path: "/disclosures",
});

export default function DisclosuresPage() {
  return (
    <LegalLayout title="Disclosures" updated="June 2026">
      <h2>Independent brokerage</h2>
      <p>
        {site.name} is a private, independent health insurance brokerage. We help individuals, families,
        and the self-employed compare and enroll in private PPO health plans offered by third-party
        insurance carriers.
      </p>

      <h2>Not a government website</h2>
      <p>
        This is not a government website and {site.name} is not a government agency. We are not affiliated
        with, endorsed by, or connected to the Health Insurance Marketplace, HealthCare.gov, Medicare,
        Medicaid, or any federal or state program. If you are looking for government Marketplace coverage
        or subsidies, visit{" "}
        <a href="https://www.healthcare.gov" target="_blank" rel="noopener noreferrer">HealthCare.gov</a>.
      </p>

      <h2>Plan availability and pricing</h2>
      <p>
        Plan availability, benefits, provider networks, and premiums vary by carrier, state, and your
        individual eligibility. The private PPO plans we help you compare may be medically underwritten,
        which means coverage and pricing can depend on your health history. Not everyone will qualify for
        every plan.
      </p>

      <h2>Illustrative figures</h2>
      <p>
        Any premiums, savings amounts, member counts, or statistics shown on this site are illustrative
        examples for comparison and education only. They are not offers, guarantees, or binding pricing.
        Your actual options and pricing will be confirmed by a licensed advisor.
      </p>

      <h2>Licensed advisors</h2>
      <p>
        Coverage is offered through licensed insurance agents. A licensed advisor will review your specific
        situation, confirm plan details, and provide exact pricing before you enroll.
      </p>

      <h2>Questions</h2>
      <p>
        Contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or{" "}
        <a href={site.phoneHref}>{site.phone}</a>.
      </p>
    </LegalLayout>
  );
}
