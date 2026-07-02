import { PageHero } from "./PageHero";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={`Last updated: ${updated}`}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: title, href: "#" }]}
      />
      <section className="py-14 sm:py-16">
        <div className="container-page max-w-3xl">
          <div className="space-y-6 leading-relaxed text-ink-700 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_h2]:mt-8 [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-blue-700 [&_a]:underline">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
