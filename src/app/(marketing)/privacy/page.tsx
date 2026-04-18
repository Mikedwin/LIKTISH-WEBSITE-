import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { legalHighlights } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Privacy Policy | LIKTISH Engineering",
  description:
    "Read how LIKTISH handles website enquiries, lead information, and customer communications.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="bg-white px-4 py-20">
      <div className="container-shell max-w-4xl">
        <SectionHeading
          eyebrow="Privacy Policy"
          title="How LIKTISH handles enquiry and lead data"
          body="This placeholder legal page covers the MVP privacy expectations in the PRD and can later be replaced with approved legal copy."
        />
        <div className="mt-10 rounded-[2rem] border border-border bg-surface p-8">
          <ul className="space-y-4 text-sm leading-8 text-muted">
            {legalHighlights.privacy.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
