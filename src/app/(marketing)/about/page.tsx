import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { MapEmbed } from "@/components/shared/map-embed";
import { SectionHeading } from "@/components/shared/section-heading";
import { aboutFaqs } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo/metadata";

const featuredFaqs = [
  aboutFaqs[0],
  aboutFaqs[1],
  aboutFaqs[3],
];

const groupedFaqs = [
  {
    label: "Damage and faults",
    items: [aboutFaqs[2], aboutFaqs[5], aboutFaqs[10]],
  },
  {
    label: "Cleaning and upkeep",
    items: [aboutFaqs[7], aboutFaqs[8], aboutFaqs[9]],
  },
  {
    label: "Performance and lifespan",
    items: [aboutFaqs[4], aboutFaqs[6]],
  },
];

export const metadata = buildMetadata({
  title: "About Us | Solar Company in Ghana | LIKTISH Engineering",
  description:
    "Meet the LIKTISH Engineering team, mission, values, and long-term commitment to clean, reliable solar power for homes and businesses across Ghana and Africa.",
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
              title="An engineering-led solar company grounded in power realities across Ghana and Africa."
              body="The About page should make LIKTISH feel like a real operating company with people, field judgment, and long-term accountability."
            />
          </div>
          <div className="grid gap-4 sm:gap-5">
            <div className="section-frame rounded-[1.55rem] p-6 sm:rounded-[1.9rem] sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                Company story
              </p>
                <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-muted sm:text-base sm:leading-8">
                  LIKTISH Engineering is positioned around clean, reliable power solutions for residential, commercial, industrial, and government clients in Ghana and Africa, with support that continues after installation.
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

      <section className="relative overflow-hidden bg-[#e1ece2] px-4 py-18 sm:py-24">
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
            <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-[#cfe0d6] bg-white/78 p-5 shadow-[0_12px_30px_rgba(11,33,25,0.05)] sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                  How LIKTISH works
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Practical recommendations, properly sized systems, and support that stays useful after installation.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[#cfe0d6] bg-[linear-gradient(180deg,#f7fbf8_0%,#edf5ef_100%)] p-5 shadow-[0_12px_30px_rgba(11,33,25,0.05)] sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                  Long-term support
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Maintenance, troubleshooting, and aftercare are treated as part of the job, not an afterthought.
                </p>
              </div>
            </div>
          </div>
          <div className="section-frame self-start overflow-hidden rounded-[1.5rem] p-2.5 sm:rounded-[1.8rem] sm:p-3">
            <MapEmbed className="map-frame h-[280px] w-full rounded-[1.1rem] border-0 sm:h-[360px] sm:rounded-[1.3rem] lg:h-[420px]" />
          </div>
        </div>
      </section>

      <section
        id="about-faq"
        className="relative overflow-hidden bg-[#edf4ee] px-4 py-18 scroll-mt-28 sm:py-24"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.36)_0%,rgba(203,138,46,0.08)_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(120deg,rgba(21,144,102,0.2)_1px,transparent_1px),linear-gradient(rgba(21,144,102,0.08)_1px,transparent_1px)] [background-size:140px_140px,36px_36px]" />
        <div className="absolute inset-y-0 left-0 w-[38%] bg-[linear-gradient(180deg,rgba(21,144,102,0.14),rgba(21,144,102,0.03))]" />
        <div className="absolute right-0 top-10 h-52 w-52 rounded-full bg-[rgba(203,138,46,0.12)] blur-3xl" />
        <div className="container-shell relative grid gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:gap-14">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#159066]" />
              <p className="text-[0.95rem] font-semibold uppercase tracking-[0.22em] text-brand-soft sm:text-[1.05rem]">
                Common Solar Maintenance Questions
              </p>
            </div>
            <SectionHeading
              title="Solar questions, clearly answered."
              body="These are some of the most common things people ask about panel cleaning, cracks, repairs, output loss, and long-term solar upkeep."
            />
            <p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:text-[0.98rem]">
              The goal here is simple: make solar maintenance feel understandable,
              practical, and grounded in the kind of support LIKTISH actually gives
              clients in the field.
            </p>
            <div className="mt-8 grid gap-4 sm:mt-10">
              {featuredFaqs.map((item, index) => (
                <article
                  key={item.question}
                  className={
                    index === 1
                      ? "rounded-[1.5rem] border border-[#0f6f54] bg-[#0b5b43] p-5 text-white shadow-[0_18px_42px_rgba(11,33,25,0.14)] sm:p-6"
                      : "rounded-[1.5rem] border border-[#d7e6dc] bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(247,250,247,0.96)_100%)] p-5 shadow-[0_14px_34px_rgba(11,33,25,0.06)] sm:p-6"
                  }
                >
                  <p
                    className={
                      index === 1
                        ? "text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9fe2c9]"
                        : "text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft"
                    }
                  >
                    Featured question
                  </p>
                  <h3
                    className={
                      index === 1
                        ? "headline mt-4 text-[1.35rem] font-black leading-tight text-white"
                        : "headline mt-4 text-[1.35rem] font-black leading-tight text-brand"
                    }
                  >
                    {item.question}
                  </h3>
                  <p
                    className={
                      index === 1
                        ? "mt-4 text-sm leading-7 text-white/76"
                        : "mt-4 text-sm leading-7 text-muted"
                    }
                  >
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {groupedFaqs.map((group) => (
              <div
                key={group.label}
                className="rounded-[1.6rem] border border-[#d6e4da] bg-white/72 p-5 shadow-[0_16px_36px_rgba(11,33,25,0.05)] sm:p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                  {group.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Direct answers to common questions in this area.
                </p>
                <div className="mt-5">
                  <FAQAccordion items={group.items} variant="soft" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
