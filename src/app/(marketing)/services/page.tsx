import Link from "next/link";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceCatalogGroups, services, siteContact } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Services | LIKTISH Engineering",
  description:
    "Explore LIKTISH solar services for residential, commercial, industrial, government, and maintenance needs.",
  path: "/services",
});

export default function ServicesPage() {
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

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <RevealOnScroll>
            <div className="grid gap-4 sm:gap-5">
              {services.map((service, index) => (
                <article
                  key={service.slug}
                  className={
                    index === 2
                      ? "ink-panel rounded-[1.45rem] p-5 text-white shadow-[0_18px_46px_rgba(11,33,25,0.16)] sm:rounded-[1.75rem] sm:p-8"
                      : "section-frame rounded-[1.45rem] p-5 sm:rounded-[1.75rem] sm:p-8"
                  }
                >
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                      index === 2 ? "text-white/58" : "text-brand-soft"
                    }`}
                  >
                    {service.label}
                  </p>
                  <h2
                    className={`headline mt-4 text-[1.95rem] font-black sm:text-3xl ${
                      index === 2 ? "text-white" : "text-brand"
                    }`}
                  >
                    {service.title}
                  </h2>
                  <p
                    className={`mt-4 text-sm leading-7 ${
                      index === 2 ? "text-white/78" : "text-muted"
                    }`}
                  >
                    {service.shortDescription}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className={`mt-7 inline-flex min-h-12 items-center rounded-[1rem] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                      index === 2 ? "bg-white text-brand" : "bg-brand text-white"
                    }`}
                  >
                    View service page
                  </Link>
                </article>
              ))}
            </div>
          </RevealOnScroll>

          <div className="grid gap-4 sm:gap-5">
            {serviceCatalogGroups.map((group, index) => (
              <RevealOnScroll key={group.label} delay={80 + index * 80}>
                <article className="rounded-[1.45rem] border border-[#d7e3dc] bg-white/82 p-5 shadow-[0_14px_36px_rgba(11,33,25,0.06)] backdrop-blur-sm sm:rounded-[1.75rem] sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                    {group.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {group.intro}
                  </p>
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

            <RevealOnScroll delay={360}>
              <aside className="rounded-[1.55rem] border border-[#cfe0d6] bg-[linear-gradient(135deg,#0d5a43_0%,#137356_100%)] p-6 text-white shadow-[0_20px_50px_rgba(11,33,25,0.18)] sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/58">
                  Need help deciding?
                </p>
                <h2 className="headline mt-4 text-[1.8rem] font-black sm:text-[2.1rem]">
                  Talk to LIKTISH about the service your system actually needs.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/78">
                  If you are not sure whether the job is an inspection, repair, upgrade,
                  or full custom solution, the quickest next step is still WhatsApp or a direct call.
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
        </div>
      </div>
    </div>
  );
}
