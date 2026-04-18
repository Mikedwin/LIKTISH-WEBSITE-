import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { MapEmbed } from "@/components/shared/map-embed";
import { SectionHeading } from "@/components/shared/section-heading";
import { aboutFaqs, teamMembers } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About Us | LIKTISH Engineering",
  description:
    "Meet the LIKTISH Engineering team, mission, values, and long-term commitment to clean, reliable power in Ghana.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="px-4 py-20">
        <div className="container-shell grid gap-10 xl:grid-cols-[0.86fr_1.14fr]">
          <div>
            <SectionHeading
              eyebrow="About LIKTISH"
              title="An engineering-led solar company grounded in Ghana's power realities."
              body="The About page should make LIKTISH feel like a real operating company with people, field judgment, and long-term accountability."
            />
          </div>
          <div className="section-frame rounded-[1.75rem] p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
              Company story
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              LIKTISH Engineering is positioned around clean, reliable power solutions for residential, commercial, industrial, and government clients in Ghana, with support that continues after installation.
            </p>
          </div>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <article
              key={member.name}
              className={
                index === 1
                  ? "ink-panel rounded-[1.7rem] p-8 text-white"
                  : "section-frame rounded-[1.7rem] p-8"
              }
            >
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-[1rem] text-xl font-black ${index === 1 ? "bg-white text-brand" : "bg-brand text-white"}`}>
                {member.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <h2 className={`headline mt-6 text-2xl font-black ${index === 1 ? "text-white" : "text-brand"}`}>
                {member.name}
              </h2>
              <p className={`mt-2 text-sm font-semibold ${index === 1 ? "text-accent-soft" : "text-brand-soft"}`}>
                {member.role}
              </p>
              <p className={`mt-1 text-sm ${index === 1 ? "text-white/68" : "text-muted"}`}>
                {member.credential}
              </p>
              <p className={`mt-5 text-sm leading-7 ${index === 1 ? "text-white/76" : "text-muted"}`}>
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-[#f8f2e8] px-4 py-24">
        <div className="container-shell grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Mission and Values"
              title="Clean energy with confidence, clarity, and aftercare."
              body="LIKTISH should feel direct about dumsor, serious about engineering, and committed to long-term maintenance and service."
            />
            <div className="mt-10">
              <FAQAccordion items={aboutFaqs} />
            </div>
          </div>
          <div className="section-frame overflow-hidden rounded-[1.8rem] p-3">
            <MapEmbed className="map-frame h-[420px] w-full rounded-[1.3rem] border-0" />
          </div>
        </div>
      </section>
    </>
  );
}
