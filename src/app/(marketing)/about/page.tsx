import Image from "next/image";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { MapEmbed } from "@/components/shared/map-embed";
import { SectionHeading } from "@/components/shared/section-heading";
import { aboutFaqs, teamMembers } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo/metadata";

const aboutTeamImages = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
];

const workersImage =
  "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?auto=format&fit=crop&w=1400&q=80";

export const metadata = buildMetadata({
  title: "About Us | LIKTISH Engineering",
  description:
    "Meet the LIKTISH Engineering team, mission, values, and long-term commitment to clean, reliable power in Ghana.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#f3ecdd] px-4 py-18 sm:py-22">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.26)_0%,rgba(21,144,102,0.06)_45%,rgba(203,138,46,0.14)_100%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(120deg,rgba(21,144,102,0.24)_1px,transparent_1px),linear-gradient(rgba(21,144,102,0.14)_1px,transparent_1px)] [background-size:120px_120px,36px_36px]" />
        <div className="absolute inset-y-0 right-0 w-[38%] bg-[linear-gradient(180deg,rgba(16,112,80,0.2),rgba(16,112,80,0.04))]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(203,138,46,0.28),transparent_60%)]" />
        <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-[rgba(203,138,46,0.2)] blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[rgba(21,144,102,0.18)] blur-3xl" />
        <div className="container-shell relative grid gap-8 lg:gap-10 xl:grid-cols-[0.82fr_1.18fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#159066]" />
              <p className="text-[0.95rem] font-semibold uppercase tracking-[0.22em] text-brand-soft sm:text-[1.05rem]">
                ABOUT LIKTISH
              </p>
            </div>
            <SectionHeading
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

      <section className="relative overflow-hidden bg-[#e6f0e8] px-4 py-18 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(203,138,46,0.06)_100%)]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(90deg,rgba(24,49,39,0.24)_1px,transparent_1px),linear-gradient(rgba(24,49,39,0.16)_1px,transparent_1px)] [background-size:88px_88px,28px_28px]" />
        <div className="absolute inset-y-0 right-0 w-[44%] bg-[linear-gradient(180deg,rgba(21,144,102,0.2),rgba(21,144,102,0.05))]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(circle_at_bottom_left,rgba(203,138,46,0.28),transparent_55%)]" />
        <div className="absolute left-10 top-8 h-44 w-44 rounded-full bg-[rgba(255,255,255,0.18)] blur-3xl" />
        <div className="container-shell relative">
          <div className="max-w-3xl">
            <p className="mb-4 text-[0.9rem] font-semibold uppercase tracking-[0.18em] text-brand-soft sm:text-[1rem] sm:tracking-[0.22em]">
              Our Journey
            </p>
            <SectionHeading
              title="LIKTISH grew from solving real power problems, not following a generic solar script."
              body="The About page should show how the company thinks, how it works, and why clients trust it to stay involved long after installation."
            />
          </div>

          <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="section-frame rounded-[1.55rem] p-6 sm:rounded-[1.9rem] sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                How it started
              </p>
              <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-muted sm:text-base sm:leading-8">
                LIKTISH was shaped by the everyday reality of unstable power, rising electricity costs, and the need for solar systems that are engineered for how people actually live and work in Ghana.
              </p>
            </article>

            <div className="overflow-hidden rounded-[1.55rem] border border-[#dce8e0] bg-white shadow-[0_18px_46px_rgba(11,33,25,0.08)] sm:rounded-[1.9rem]">
              <div className="relative h-[280px] sm:h-[340px]">
                <Image
                  src={workersImage}
                  alt="LIKTISH solar installation team at work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                  Field reality
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  The company story should stay grounded in site work, engineering judgment, installation discipline, and support after handover.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#eef3ea] px-4 py-18 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(203,138,46,0.08)_100%)]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(120deg,rgba(21,144,102,0.24)_1px,transparent_1px)] [background-size:140px_140px]" />
        <div className="absolute inset-y-0 left-0 w-[38%] bg-[linear-gradient(180deg,rgba(21,144,102,0.18),rgba(21,144,102,0.04))]" />
        <div className="absolute left-8 top-8 h-44 w-44 rounded-full bg-[rgba(21,144,102,0.18)] blur-3xl" />
        <div className="absolute bottom-0 right-12 h-52 w-52 rounded-full bg-[rgba(203,138,46,0.16)] blur-3xl" />
        <div className="container-shell relative">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-soft">
              The People Behind LIKTISH
            </p>
            <SectionHeading
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
                <div className="grid gap-5 sm:grid-cols-[9rem_1fr] sm:items-start">
                  <div className="relative h-56 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,#eef4ef_0%,#dfe9e2_100%)] sm:h-64">
                    <Image
                      src={aboutTeamImages[index] ?? aboutTeamImages[0]}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute inset-x-0 bottom-0 h-24 ${index === 1 ? "bg-[linear-gradient(180deg,transparent,rgba(7,40,29,0.34))]" : "bg-[linear-gradient(180deg,transparent,rgba(24,49,39,0.22))]"}`} />
                  </div>

                  <div>
                    <h2 className={`headline text-[1.85rem] font-black sm:text-[2.15rem] ${index === 1 ? "text-white" : "text-brand"}`}>
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
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about-faq"
        className="relative overflow-hidden bg-[#e1ece2] px-4 py-18 scroll-mt-28 sm:py-24"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(203,138,46,0.08)_100%)]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(120deg,rgba(21,144,102,0.2)_1px,transparent_1px),linear-gradient(rgba(21,144,102,0.12)_1px,transparent_1px)] [background-size:130px_130px,34px_34px]" />
        <div className="absolute inset-y-0 right-0 w-[42%] bg-[linear-gradient(180deg,rgba(21,144,102,0.18),rgba(21,144,102,0.04))]" />
        <div className="absolute -right-12 top-10 h-56 w-56 rounded-full bg-[rgba(21,144,102,0.18)] blur-3xl" />
        <div className="absolute left-0 bottom-0 h-48 w-48 rounded-full bg-[rgba(203,138,46,0.14)] blur-3xl" />
        <div className="container-shell relative grid gap-10 xl:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#159066]" />
              <p className="text-[0.95rem] font-semibold uppercase tracking-[0.22em] text-brand-soft sm:text-[1.05rem]">
                MISSION AND VALUES
              </p>
            </div>
            <SectionHeading
              title="Clean energy with confidence, clarity, and aftercare."
              body="LIKTISH should feel direct about dumsor, serious about engineering, and committed to long-term maintenance and service."
            />
            <div className="mt-8 sm:mt-10">
              <FAQAccordion items={aboutFaqs} />
            </div>
          </div>
          <div className="section-frame self-start overflow-hidden rounded-[1.5rem] p-2.5 sm:rounded-[1.8rem] sm:p-3">
            <MapEmbed className="map-frame h-[280px] w-full rounded-[1.1rem] border-0 sm:h-[360px] sm:rounded-[1.3rem] lg:h-[420px]" />
          </div>
        </div>
      </section>
    </>
  );
}
