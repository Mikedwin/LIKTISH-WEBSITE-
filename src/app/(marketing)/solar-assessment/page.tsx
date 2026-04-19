import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Free Solar Assessment | LIKTISH Engineering",
  description:
    "Request a free solar assessment from LIKTISH Engineering. This page is ready for the next assessment flow.",
  path: "/solar-assessment",
});

export default function SolarAssessmentPage() {
  return (
    <section className="px-4 py-18 sm:py-24">
      <div className="container-shell">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-[linear-gradient(180deg,#f7fbf8_0%,#eef5ef_100%)] px-6 py-12 shadow-[0_24px_64px_rgba(11,33,25,0.08)] sm:px-10 sm:py-16">
          <SectionHeading
            eyebrow="Free Solar Assessment"
            title="This page is ready for the solar assessment flow."
            body="A dedicated assessment page now exists and the main CTA links here. We can design the full content or form flow next without bringing back booking or admin features."
            align="center"
          />
        </div>
      </div>
    </section>
  );
}
