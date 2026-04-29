import Link from "next/link";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceCatalogGroups, services, siteContact } from "@/lib/site-data";

const serviceEntryPoints = [
  {
    label: "New installation",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M5 11.5 12 6l7 5.5V19H5v-7.5ZM9 19v-4h6v4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Existing system problem",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M12 8v5m0 3h.01M6.2 19h11.6a1 1 0 0 0 .87-1.5L12.87 7.4a1 1 0 0 0-1.74 0L5.33 17.5A1 1 0 0 0 6.2 19Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Cleaning / maintenance",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M8 18c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5M12 5v5m0 0 2.5-2.5M12 10 9.5 7.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Expansion / upgrade",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M12 5v14M5 12h14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Custom project",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M6 18 18 6M8.5 6H18v9.5M6 8.5V18h9.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
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

const groupIcons = {
  "Inspections, assessments, and diagnostics": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M11 6a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm7 12 3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "Cleaning, repairs, and component replacement": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M14.5 6.5a4 4 0 0 0-5 5L5 16l3 3 4.5-4.5a4 4 0 0 0 5-5l-2.5 2.5-2-2 2.5-2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "Monitoring, expansion, and specialist support": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M5 15.5 9 11l3 3 7-8M19 8v-2h-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "Custom delivery and client support": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M6 18 18 6M8.5 6H18v9.5M6 8.5V18h9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

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
    <div className="relative overflow-hidden px-4 py-14 sm:py-18 lg:py-20">
      <div className="absolute inset-0 bg-[#edf3ed]" />
      <div className="absolute inset-0 bg-[url('/services-background-pattern.jfif')] bg-[length:360px_auto] bg-repeat opacity-[0.18] mix-blend-multiply sm:bg-[length:430px_auto]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.52)_0%,rgba(234,244,237,0.84)_22%,rgba(205,231,219,0.66)_64%,rgba(210,168,95,0.12)_100%)]" />
      <div className="absolute inset-y-0 right-0 w-[44%] bg-[linear-gradient(180deg,rgba(22,148,103,0.22),rgba(22,148,103,0.05))]" />
      <div className="absolute inset-y-0 left-0 w-[28%] bg-[linear-gradient(180deg,rgba(201,151,78,0.14),rgba(201,151,78,0.03))]" />
      <div className="absolute -right-12 top-10 h-56 w-56 rounded-full bg-[rgba(21,144,102,0.18)] blur-3xl" />
      <div className="absolute left-0 bottom-0 h-48 w-48 rounded-full bg-[rgba(203,138,46,0.14)] blur-3xl" />
      <div className="absolute left-12 top-16 h-44 w-44 rounded-full bg-[rgba(255,255,255,0.16)] blur-3xl" />

      <div className="container-shell relative">
        <RevealOnScroll className="max-w-3xl">
          <p className="mb-4 text-[0.92rem] font-semibold uppercase tracking-[0.22em] text-brand-soft sm:mb-5 sm:text-[1.08rem] lg:text-[1.18rem]">
            Services
          </p>
          <SectionHeading
            title="Core solar delivery, plus specialist support where systems need it."
            body="The homepage stays selective. This page carries the fuller LIKTISH service catalog, grouped so people can quickly see where they fit and how to reach out."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={60} className="mt-7 sm:mt-9 lg:mt-10">
          <div className="rounded-[1.35rem] border border-[#d7e3dc] bg-white/82 p-4 shadow-[0_14px_36px_rgba(11,33,25,0.06)] backdrop-blur-sm sm:rounded-[1.6rem] sm:p-6 lg:rounded-[1.8rem] lg:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
              What do you need help with?
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {serviceEntryPoints.map((entry) => (
                <div
                  key={entry.label}
                  className="group rounded-[0.95rem] border border-[#e2ebe5] bg-[#f8fbf8] px-3.5 py-3 text-sm font-semibold text-[#365248] transition duration-300 hover:-translate-y-0.5 hover:border-[#98baa8] hover:bg-white sm:px-4"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-[0.85rem] bg-[#dff6e9] text-[#169467] transition duration-300 group-hover:bg-[#169467] group-hover:text-white sm:h-9 sm:w-9 sm:rounded-[0.9rem]">
                      {entry.icon}
                    </span>
                    <span className="leading-5">{entry.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-8 border-t border-[#d6e1da]/80 pt-8 sm:mt-12 sm:pt-12 lg:mt-14 lg:pt-14" />

        <div className="grid gap-5 sm:gap-6 xl:grid-cols-[0.98fr_1.02fr]">
          <RevealOnScroll direction="left">
            <article className="section-frame rounded-[1.35rem] p-4 sm:rounded-[1.6rem] sm:p-6 lg:rounded-[1.8rem] lg:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                New projects
              </p>
              <h2 className="headline mt-3 text-[1.75rem] font-black text-brand sm:mt-4 sm:text-[2rem] lg:text-3xl">
                For new systems, expansions, and custom project work.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted sm:mt-4">
                This side of LIKTISH covers fresh installations, commercial delivery,
                industrial and institutional planning, and projects that need a tailored design path.
              </p>
              <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
                {services
                  .filter((service) => service.slug !== "maintenance")
                  .map((service, index) => (
                    <article
                      key={service.slug}
                      className={
                        index === 2
                          ? "rounded-[1.2rem] border border-[#0f6f54] bg-[#0b5b43] p-4 text-white shadow-[0_18px_42px_rgba(11,33,25,0.14)] sm:rounded-[1.35rem] sm:p-5"
                          : "rounded-[1.2rem] border border-[#d7e3dc] bg-white p-4 shadow-[0_14px_32px_rgba(11,33,25,0.05)] sm:rounded-[1.35rem] sm:p-5"
                      }
                    >
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${index === 2 ? "text-white/58" : "text-brand-soft"}`}>
                        {service.label}
                      </p>
                      <h3 className={`headline mt-3 text-[1.35rem] font-black leading-tight sm:text-[1.5rem] ${index === 2 ? "text-white" : "text-brand"}`}>
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

          <RevealOnScroll delay={80} direction="right">
            <article className="rounded-[1.35rem] border border-[#cfe0d6] bg-[linear-gradient(135deg,#0d5a43_0%,#137356_100%)] p-4 text-white shadow-[0_20px_50px_rgba(11,33,25,0.18)] sm:rounded-[1.6rem] sm:p-6 lg:rounded-[1.8rem] lg:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/58">
                Existing systems
              </p>
              <h2 className="headline mt-3 text-[1.75rem] font-black sm:mt-4 sm:text-[2rem] lg:text-3xl">
                Need a system check?
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/78 sm:mt-4">
                For underperforming panels, inverter faults, panel cleaning, monitoring issues,
                roof work, warranty support, or a system that simply needs a proper review.
              </p>
              <div className="mt-5 rounded-[1.1rem] border border-white/14 bg-white/8 p-4 sm:mt-6 sm:rounded-[1.3rem] sm:p-5">
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

        <div className="mt-8 border-t border-[#d6e1da]/80 pt-8 sm:mt-12 sm:pt-12 lg:mt-14 lg:pt-14" />

        <div className="grid gap-5 sm:gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <div className="grid gap-4 sm:gap-5">
            <RevealOnScroll direction="left">
              <div className="rounded-[1.35rem] border border-[#d7e3dc] bg-white/82 p-4 shadow-[0_14px_36px_rgba(11,33,25,0.06)] backdrop-blur-sm sm:rounded-[1.6rem] sm:p-6 lg:rounded-[1.8rem] lg:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                  Tell LIKTISH what is happening
                </p>
                <h2 className="headline mt-3 text-[1.75rem] font-black text-brand sm:mt-4 sm:text-[2rem] lg:text-3xl">
                  A simple path from problem or project idea to the right next step.
                </h2>
                <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                  {contactSteps.map((step, index) => (
                    <div
                      key={step}
                      className="rounded-[1rem] border border-[#e2ebe5] bg-[#f8fbf8] p-3.5 sm:rounded-[1.2rem] sm:p-4"
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
              <RevealOnScroll delay={80} direction="left">
                <article className="overflow-hidden rounded-[1.3rem] border border-[#d7e3dc] bg-white/82 p-4 shadow-[0_14px_36px_rgba(11,33,25,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(11,33,25,0.10)] sm:rounded-[1.55rem] sm:p-6 lg:rounded-[1.75rem] lg:p-7">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.9rem] bg-[#dff6e9] text-[#19A875] sm:h-11 sm:w-11 sm:rounded-[0.95rem]">
                      {groupIcons[prioritySupportGroup.label as keyof typeof groupIcons]}
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
                  <div className="mt-5 overflow-hidden rounded-[1rem] border border-[#dfe8e1] sm:rounded-[1.2rem]">
                    <div className="relative h-40 bg-[linear-gradient(135deg,#dff3e7_0%,#eef4ea_46%,#f3ead7_100%)] sm:h-44">
                      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(120deg,rgba(21,144,102,0.18)_1px,transparent_1px)] [background-size:90px_90px]" />
                      <div className="absolute left-3 top-3 max-w-[12rem] rounded-[0.9rem] bg-white/82 px-3 py-2.5 shadow-[0_12px_24px_rgba(11,33,25,0.08)] backdrop-blur-sm sm:left-5 sm:top-5 sm:max-w-[14rem] sm:rounded-[1rem] sm:px-4 sm:py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                          Specialist support
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#476057]">
                          Monitoring, add-ons, carports, and support during construction or roof repair.
                        </p>
                      </div>
                      <div className="absolute right-4 top-5 h-14 w-14 rounded-full bg-[rgba(21,144,102,0.18)] blur-2xl sm:right-5 sm:top-6 sm:h-16 sm:w-16" />
                      <div className="absolute bottom-3 right-3 max-w-[10rem] rounded-[0.9rem] border border-white/60 bg-white/76 px-3 py-2.5 shadow-[0_10px_22px_rgba(11,33,25,0.08)] backdrop-blur-sm sm:bottom-4 sm:right-4 sm:max-w-none sm:rounded-[1rem] sm:px-4 sm:py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                          Existing systems
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#0d5a43]">
                          Expansion-ready and site-aware
                        </p>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#476057] sm:grid-cols-2">
                    {prioritySupportGroup.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-[0.95rem] border border-[#e2ebe5] bg-[#f8fbf8] px-3.5 py-3 sm:rounded-[1rem] sm:px-4"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealOnScroll>
            ) : null}

            <RevealOnScroll delay={220} direction="left">
              <aside className="rounded-[1.35rem] border border-[#cfe0d6] bg-[linear-gradient(135deg,#0d5a43_0%,#137356_100%)] p-5 text-white shadow-[0_20px_50px_rgba(11,33,25,0.18)] sm:rounded-[1.55rem] sm:p-6 lg:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/58">
                  Need help deciding?
                </p>
                <h2 className="headline mt-3 text-[1.6rem] font-black sm:mt-4 sm:text-[1.85rem] lg:text-[2.1rem]">
                  Talk to LIKTISH about the service your system actually needs.
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/78 sm:mt-4">
                  If you are not sure whether the job is an inspection, repair, upgrade,
                  or a custom project, the quickest next step is still WhatsApp or a direct call.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
                  <Link
                    href={siteContact.whatsapp}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-[1rem] bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] !text-[#0d5a43] sm:w-auto"
                    style={{ color: "#0d5a43" }}
                  >
                    WhatsApp
                  </Link>
                  <Link
                    href={`tel:${siteContact.phone.replace(/\s+/g, "")}`}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-[1rem] border border-white/24 bg-white/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:w-auto"
                  >
                    Call
                  </Link>
                </div>
              </aside>
            </RevealOnScroll>
          </div>

          <div className="grid gap-4 sm:gap-5">
            {remainingServiceGroups.map((group, index) => (
              <RevealOnScroll
                key={group.label}
                delay={80 + index * 80}
                direction="right"
                className={
                  group.label === "Cleaning, repairs, and component replacement"
                    ? "xl:-mt-56"
                    : group.label === "Custom delivery and client support"
                      ? "xl:-mt-56"
                      : undefined
                }
              >
                <article className={`rounded-[1.3rem] border p-4 shadow-[0_14px_36px_rgba(11,33,25,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(11,33,25,0.10)] sm:rounded-[1.55rem] sm:p-6 lg:rounded-[1.75rem] lg:p-7 ${
                  group.label === "Cleaning, repairs, and component replacement"
                    ? "border-[#cfe0d6] bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(246,251,248,0.98)_100%)]"
                    : group.label === "Custom delivery and client support"
                      ? "border-[#d7e3dc] bg-white"
                      : "border-[#d7e3dc] bg-white/82"
                }`}>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.9rem] bg-[#dff6e9] text-[#19A875] sm:h-11 sm:w-11 sm:rounded-[0.95rem]">
                      {groupIcons[group.label as keyof typeof groupIcons]}
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
                        className="rounded-[0.95rem] border border-[#e2ebe5] bg-[#f8fbf8] px-3.5 py-3 sm:rounded-[1rem] sm:px-4"
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
