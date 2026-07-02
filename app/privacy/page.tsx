import { LegalLayout } from "@/components/site/LegalLayout";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your personal information.`,
  path: "/privacy",
  noindex: false,
});

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 2026">
      <p>
        {site.name} (&ldquo;{site.shortName},&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) respects your
        privacy. This policy explains what information we collect, how we use it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <p>
        When you complete a quote request, contact form, or otherwise interact with us, we may collect
        your name, email address, phone number, ZIP code or state, age range, household details, and
        information about your current coverage and insurance needs. We also collect limited technical
        data such as your IP address, browser type, and the pages you visit.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To match you with private PPO health plan options and licensed advisors.</li>
        <li>To contact you by phone, text, or email about coverage you requested.</li>
        <li>To operate, secure, and improve our website and services.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>How we share information</h2>
      <p>
        We share your information with licensed insurance advisors and carrier partners as needed to
        prepare quotes and help you enroll. We use trusted service providers (such as hosting and
        analytics vendors) under appropriate confidentiality obligations. We do not sell your personal
        information.
      </p>

      <h2>Your choices</h2>
      <p>
        You may opt out of marketing communications at any time by replying STOP to texts, using the
        unsubscribe link in emails, or contacting us at <a href={`mailto:${site.email}`}>{site.email}</a>.
        You may also request access to or deletion of your personal information, subject to applicable law.
      </p>

      <h2>Data security</h2>
      <p>
        We use administrative, technical, and physical safeguards designed to protect your information.
        No method of transmission or storage is completely secure, but we work to protect your data and
        limit access to it.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy? Email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        <a href={site.phoneHref}>{site.phone}</a>.
      </p>
    </LegalLayout>
  );
}
