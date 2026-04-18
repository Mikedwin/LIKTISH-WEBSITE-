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
      <section className="px-4 py-18 sm:py-22">
        <div className="container-shell grid gap-8 lg:gap-10 xl:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading
              eyebrow="About LIKTISH"
              title="An engineering-led solar company grounded in Ghana's power realities."
              body="The About page should make LIKTISH feel like a real operating company with people, field judgment, and long-term accountability."
            />
          </div>
          <div className="grid gap-4 sm:gap-5">
            <div className="section-frame rounded-[1.55rem] p-6 sm:rounded-[1.9rem] sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                Company story
              </p>
              <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-muted sm:text-base sm:leading-8">
                LIKTISH Engineering is positioned around clean, reliable power solutions for residential, commercial, industrial, and government clients in Ghana, with support that continues after installation.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-border bg-white/78 p-5 shadow-[0_12px_30px_rgba(11,33,25,0.05)] sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                  What sets LIKTISH apart
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Field-aware system design, practical advice, and long-term maintenance support rather than one-off installation language.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-border bg-[linear-gradient(180deg,#f7fbf8_0%,#edf5ef_100%)] p-5 shadow-[0_12px_30px_rgba(11,33,25,0.05)] sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                  Operating focus
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Homes, businesses, industrial sites, and institutions that need reliable power planning, not generic brochure promises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f2e8] px-4 py-18 sm:py-24">
        <div className="container-shell">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Team"
              title="The people behind LIKTISH delivery."
              body="The team section should feel spacious and credible, with enough room for each person to sound like a real operator instead of a compressed profile card."
            />
          </div>

          <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-2">
            {teamMembers.map((member, index) => (
              <article
                key={member.name}
                className={
                  index === 1
                    ? "ink-panel rounded-[1.55rem] p-6 text-white sm:rounded-[1.9rem] sm:p-8"
                    : "section-frame rounded-[1.55rem] p-6 sm:rounded-[1.9rem] sm:p-8"
                }
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-[0.95rem] text-lg font-black sm:h-14 sm:w-14 sm:rounded-[1rem] sm:text-xl ${index === 1 ? "bg-white text-brand" : "bg-brand text-white"}`}>
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <h2 className={`headline mt-5 text-[1.85rem] font-black sm:mt-6 sm:text-[2.15rem] ${index === 1 ? "text-white" : "text-brand"}`}>
                  {member.name}
                </h2>
                <p className={`mt-2 text-sm font-semibold uppercase tracking-[0.08em] ${index === 1 ? "text-accent-soft" : "text-brand-soft"}`}>
                  {member.role}
                </p>
                <p className={`mt-2 text-sm ${index === 1 ? "text-white/68" : "text-muted"}`}>
                  {member.credential}
                </p>
                <p className={`mt-6 max-w-[34rem] text-[0.98rem] leading-7 sm:text-base sm:leading-8 ${index === 1 ? "text-white/76" : "text-muted"}`}>
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:py-24">
        <div className="container-shell grid gap-10 xl:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionHeading
              eyebrow="Mission and Values"
              title="Clean energy with confidence, clarity, and aftercare."
              body="LIKTISH should feel direct about dumsor, serious about engineering, and committed to long-term maintenance and service."
            />
            <div className="mt-8 sm:mt-10">
              <FAQAccordion items={aboutFaqs} />
            </div>
          </div>
          <div className="section-frame overflow-hidden rounded-[1.5rem] p-2.5 sm:rounded-[1.8rem] sm:p-3">
            <MapEmbed className="map-frame h-[280px] w-full rounded-[1.1rem] border-0 sm:h-[360px] sm:rounded-[1.3rem] lg:h-[420px]" />
          </div>
        </div>
      </section>
    </>
  );
}
