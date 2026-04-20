import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Free Solar Assessment | LIKTISH Engineering",
  description:
    "Request a free solar assessment from LIKTISH Engineering. This page is ready for the next assessment flow.",
  path: "/solar-assessment",
});

export default function SolarAssessmentPage() {
  return (
    <section className="min-h-[70vh] bg-white px-4 py-20 sm:py-28">
      <div className="container-shell flex min-h-[50vh] items-center justify-center rounded-[2rem] border border-dashed border-[#cfe0d7] bg-[#fbfdfb]">
        <p className="headline px-6 text-center text-[2rem] font-black tracking-tight text-brand sm:text-[3rem]">
          Solar Assessment
        </p>
      </div>
    </section>
  );
}
