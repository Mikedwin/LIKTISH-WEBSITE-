import Link from "next/link";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceCatalogGroups, services, siteContact } from "@/lib/site-data";

const serviceEntryPoints = [
  "New installation",
  "Existing system problem",
  "Cleaning / maintenance",
  "Expansion / upgrade",
  "Custom project",
];

const mostRequestedServices = [
  "Diagnostics",
  "Low Production Resolution",
  "Panel Cleaning and Replacement",
  "Solar System Assessments and Check Up Reports",
];

const contactSteps = [
  "Tell LIKTISH what is happening",
  "We review the issue or project need",
  "We respond by WhatsApp or phone",
  "Next steps are recommended clearly",
];

const prioritizedGroupOrder = [
  "Monitoring, expansion, and specialist support",
  "Inspections, assessments, and diagnostics",
  "Cleaning, repairs, and component replacement",
  "Custom delivery and client support",
];

export const metadata = buildMetadata({
  title: "Services | LIKTISH Engineering",
  description:
    "Explore LIKTISH solar services for residential, commercial, industrial, government, and maintenance needs.",
  path: "/services",
});

export default function ServicesPage() {
  const orderedServiceGroups = serviceCatalogGroups
    .slice()
    .sort(
      (a, b) =>
        prioritizedGroupOrder.indexOf(a.label) -
        prioritizedGroupOrder.indexOf(b.label),
    );
  const [prioritySupportGroup, ...remainingServiceGroups] = orderedServiceGroups;

  return (
    <div className="relative overflow-hidden px-4 py-16 sm:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f4f7f4_0%,#edf3ef_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(120deg,rgba(13,87,63,0.14)_1px,transparent_1px),linear-gradient(rgba(13,87,63,0.08)_1px,transparent_1px)] [background-size:160px_160px,44px_44px]" />
      <div className="absolute left-0 top-16 h-52 w-52 rounded-full bg-[rgba(25,168,117,0.12)] blur-3xl" />
      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[rgba(203,138,46,0.1)] blur-3xl" />

      <div className="container-shell relative">
        <RevealOnScroll className="max-w-3xl">
          <SectionHeading
            eyebrow="Services"
            title="Core solar delivery, plus specialist support where systems need it."
            body="The homepage stays selective. This page carries the fuller LIKTISH service catalog, grouped so people can quickly see where they fit and how to reach out."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={60} className="mt-8 sm:mt-10">
          <div className="rounded-[1.55rem] border border-[#d7e3dc] bg-white/82 p-5 shadow-[0_14px_36px_rgba(11,33,25,0.06)] backdrop-blur-sm sm:rounded-[1.8rem] sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
              What do you need help with?
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {serviceEntryPoints.map((entry) => (
                <div
                  key={entry}
                  className="rounded-[1rem] border border-[#e2ebe5] bg-[#f8fbf8] px-4 py-3 text-sm font-semibold text-[#365248]"
                >
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 xl:grid-cols-[0.98fr_1.02fr]">
          <RevealOnScroll>
            <article className="section-frame rounded-[1.55rem] p-5 sm:rounded-[1.8rem] sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                New projects
              </p>
              <h2 className="headline mt-4 text-[2rem] font-black text-brand sm:text-3xl">
                For new systems, expansions, and custom project work.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                This side of LIKTISH covers fresh installations, commercial delivery,
                industrial and institutional planning, and projects that need a tailored design path.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {services
                  .filter((service) => service.slug !== "maintenance")
                  .map((service, index) => (
                    <article
                      key={service.slug}
                      className={
                        index === 2
                          ? "rounded-[1.35rem] border border-[#0f6f54] bg-[#0b5b43] p-5 text-white shadow-[0_18px_42px_rgba(11,33,25,0.14)]"
                          : "rounded-[1.35rem] border border-[#d7e3dc] bg-white p-5 shadow-[0_14px_32px_rgba(11,33,25,0.05)]"
                      }
                    >
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${index === 2 ? "text-white/58" : "text-brand-soft"}`}>
                        {service.label}
                      </p>
                      <h3 className={`headline mt-3 text-[1.5rem] font-black ${index === 2 ? "text-white" : "text-brand"}`}>
                        {service.title}
                      </h3>
                      <p className={`mt-3 text-sm leading-7 ${index === 2 ? "text-white/78" : "text-muted"}`}>
                        {service.shortDescription}
                      </p>
                      <Link
                        href={`/services/${service.slug}`}
                        className={`mt-6 inline-flex text-[11px] font-semibold uppercase tracking-[0.18em] ${index === 2 ? "text-white" : "text-brand"}`}
                      >
                        View service page
                      </Link>
                    </article>
                  ))}
              </div>
            </article>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <article className="rounded-[1.55rem] border border-[#cfe0d6] bg-[linear-gradient(135deg,#0d5a43_0%,#137356_100%)] p-5 text-white shadow-[0_20px_50px_rgba(11,33,25,0.18)] sm:rounded-[1.8rem] sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/58">
                Existing systems
              </p>
              <h2 className="headline mt-4 text-[2rem] font-black sm:text-3xl">
                Need a system check?
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/78">
                For underperforming panels, inverter faults, panel cleaning, monitoring issues,
                roof work, warranty support, or a system that simply needs a proper review.
              </p>
              <div className="mt-6 rounded-[1.3rem] border border-white/14 bg-white/8 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9fe2c9]">
                  Most requested
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {mostRequestedServices.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1rem] border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/88"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </RevealOnScroll>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <div className="grid gap-4 sm:gap-5">
            <RevealOnScroll>
              <div className="rounded-[1.55rem] border border-[#d7e3dc] bg-white/82 p-5 shadow-[0_14px_36px_rgba(11,33,25,0.06)] backdrop-blur-sm sm:rounded-[1.8rem] sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                  Tell LIKTISH what is happening
                </p>
                <h2 className="headline mt-4 text-[2rem] font-black text-brand sm:text-3xl">
                  A simple path from problem or project idea to the right next step.
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {contactSteps.map((step, index) => (
                    <div
                      key={step}
                      className="rounded-[1.2rem] border border-[#e2ebe5] bg-[#f8fbf8] p-4"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                        Step {index + 1}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#476057]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {prioritySupportGroup ? (
              <RevealOnScroll delay={80}>
                <article className="rounded-[1.45rem] border border-[#d7e3dc] bg-white/82 p-5 shadow-[0_14px_36px_rgba(11,33,25,0.06)] backdrop-blur-sm sm:rounded-[1.75rem] sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] bg-[#dff6e9] text-[#19A875]">
                      M
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                        {prioritySupportGroup.label}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted">
                        {prioritySupportGroup.intro}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#476057] sm:grid-cols-2">
                    {prioritySupportGroup.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-[1rem] border border-[#e2ebe5] bg-[#f8fbf8] px-4 py-3"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealOnScroll>
            ) : null}

            <RevealOnScroll delay={220}>
              <aside className="rounded-[1.55rem] border border-[#cfe0d6] bg-[linear-gradient(135deg,#0d5a43_0%,#137356_100%)] p-6 text-white shadow-[0_20px_50px_rgba(11,33,25,0.18)] sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/58">
                  Need help deciding?
                </p>
                <h2 className="headline mt-4 text-[1.8rem] font-black sm:text-[2.1rem]">
                  Talk to LIKTISH about the service your system actually needs.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/78">
                  If you are not sure whether the job is an inspection, repair, upgrade,
                  or a custom project, the quickest next step is still WhatsApp or a direct call.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={siteContact.whatsapp}
                    className="inline-flex min-h-12 items-center justify-center rounded-[1rem] bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand"
                  >
                    WhatsApp
                  </Link>
                  <Link
                    href={`tel:${siteContact.phone.replace(/\s+/g, "")}`}
                    className="inline-flex min-h-12 items-center justify-center rounded-[1rem] border border-white/24 bg-white/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
                  >
                    Call
                  </Link>
                </div>
              </aside>
            </RevealOnScroll>
          </div>

          <div className="grid gap-4 sm:gap-5">
            {remainingServiceGroups.map((group, index) => (
              <RevealOnScroll key={group.label} delay={80 + index * 80}>
                <article className="rounded-[1.45rem] border border-[#d7e3dc] bg-white/82 p-5 shadow-[0_14px_36px_rgba(11,33,25,0.06)] backdrop-blur-sm sm:rounded-[1.75rem] sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] bg-[#dff6e9] text-[#19A875]">
                      {index === 0 ? "I" : index === 1 ? "R" : "C"}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                        {group.label}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted">
                        {group.intro}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#476057] sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-[1rem] border border-[#e2ebe5] bg-[#f8fbf8] px-4 py-3"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
