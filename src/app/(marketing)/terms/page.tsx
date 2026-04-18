import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { legalHighlights } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Terms of Service | LIKTISH Engineering",
  description:
    "Read the LIKTISH Engineering terms governing website use, estimates, and consultation requests.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="bg-white px-4 py-20">
      <div className="container-shell max-w-4xl">
        <SectionHeading
          eyebrow="Terms of Service"
          title="Website terms for enquiries, estimates, and consultation requests"
          body="This MVP-ready terms page covers the essentials while leaving room for final legal review and expanded policy text."
        />
        <div className="mt-10 rounded-[2rem] border border-border bg-surface p-8">
          <ul className="space-y-4 text-sm leading-8 text-muted">
            {legalHighlights.terms.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
