import Link from "next/link";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ProjectData, ServicePageData } from "@/types/site";

export function ServiceDetailSections({
  service,
  relatedProject,
}: {
  service: ServicePageData;
  relatedProject?: ProjectData;
}) {
  return (
    <>
      <section className="hero-gradient px-4 py-16 text-white sm:py-20">
        <div className="container-shell grid gap-6 sm:gap-8 xl:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="eyebrow text-white/72">{service.label}</p>
            <h1 className="headline mt-4 max-w-3xl text-[2.5rem] font-black sm:mt-5 sm:text-5xl md:text-6xl">
              {service.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-white/78 sm:mt-6 sm:text-lg sm:leading-8">
              {service.heroBody}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="glass-panel rounded-[1.3rem] p-5 text-brand sm:rounded-[1.45rem] sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                Ideal for
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                {service.painPoints.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.3rem] border border-white/12 bg-white/8 p-5 backdrop-blur sm:rounded-[1.45rem] sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Conversion path
              </p>
              <p className="mt-4 text-sm leading-7 text-white/76">
                Every service page should make the next action clear: call or message LIKTISH for a site review and tailored recommendation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:py-24">
        <div className="container-shell grid gap-10 xl:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionHeading
              eyebrow="Benefits"
              title={`Why choose ${service.title}?`}
              body="The service body should feel more like a serious offer page than a recycled marketing grid."
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {service.benefits.map((benefit, index) => (
              <article
                key={benefit}
                className={
                  index === 1
                    ? "ink-panel rounded-[1.3rem] p-5 text-white sm:rounded-[1.45rem] sm:p-6"
                    : "section-frame rounded-[1.3rem] p-5 sm:rounded-[1.45rem] sm:p-6"
                }
              >
                <p className={`text-sm leading-7 ${index === 1 ? "text-white/78" : "text-muted"}`}>
                  {benefit}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f2e8] px-4 py-18 sm:py-24">
        <div className="container-shell grid gap-10 xl:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="How It Works"
              title="A clear path from assessment to handover."
            />
            <div className="mt-8 space-y-4 sm:mt-10">
              {service.process.map((step, index) => (
                <div key={step} className="section-frame rounded-[1.3rem] p-5 sm:rounded-[1.45rem] sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                    Step {index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="System Options"
              title="Build the right package for the site."
            />
            <div className="mt-8 space-y-4 sm:mt-10">
              {service.systemOptions.map((option, index) => (
                <div
                  key={option}
                  className={
                    index === 0
                      ? "ink-panel rounded-[1.3rem] px-5 py-5 text-white sm:rounded-[1.45rem] sm:px-6"
                      : "rounded-[1.3rem] border border-border bg-white px-5 py-5 shadow-[0_14px_36px_rgba(11,33,25,0.08)] sm:rounded-[1.45rem] sm:px-6"
                  }
                >
                  <p className={`headline text-xl font-black ${index === 0 ? "text-white" : "text-brand"}`}>
                    {option}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProject ? (
        <section className="px-4 py-18 sm:py-24">
          <div className="container-shell section-frame rounded-[1.6rem] p-6 sm:rounded-[1.9rem] sm:p-8 md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
              Related Project
            </p>
            <h2 className="headline mt-4 text-3xl font-black text-brand">
              {relatedProject.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
              {relatedProject.summary}
            </p>
            <Link
              href={`/projects/${relatedProject.slug}`}
              className="mt-6 inline-flex text-[11px] font-semibold uppercase tracking-[0.18em] text-brand"
            >
              View case study
            </Link>
          </div>
        </section>
      ) : null}

      <section className="bg-[#f8f2e8] px-4 py-18 sm:py-24">
        <div className="container-shell">
          <SectionHeading eyebrow="FAQ" title={`${service.title} questions answered`} />
          <div className="mt-8 sm:mt-10">
            <FAQAccordion items={service.faqs} />
          </div>
          <a
            href="tel:+233542794665"
            className="mt-10 inline-flex min-h-12 items-center rounded-[1rem] bg-brand px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
          >
            Call LIKTISH Today
          </a>
        </div>
      </section>
    </>
  );
}
