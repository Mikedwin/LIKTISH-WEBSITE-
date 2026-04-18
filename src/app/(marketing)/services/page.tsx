import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { services } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Services | LIKTISH Engineering",
  description:
    "Explore LIKTISH solar services for residential, commercial, industrial, government, and maintenance needs.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="px-4 py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Services"
          title="Five core service lines, one conversion path."
          body="The services hub should feel like a serious navigation page for different buyer contexts, not a repeated card gallery."
        />
        <div className="mt-14 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="grid gap-4">
            {services.slice(0, 2).map((service, index) => (
              <article
                key={service.slug}
                className={
                  index === 0
                    ? "ink-panel rounded-[1.75rem] p-8 text-white"
                    : "section-frame rounded-[1.75rem] p-8"
                }
              >
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${index === 0 ? "text-white/58" : "text-brand-soft"}`}>
                  {service.label}
                </p>
                <h2 className={`headline mt-4 text-3xl font-black ${index === 0 ? "text-white" : "text-brand"}`}>
                  {service.title}
                </h2>
                <p className={`mt-4 text-sm leading-7 ${index === 0 ? "text-white/76" : "text-muted"}`}>
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className={`mt-8 inline-flex min-h-12 items-center rounded-[1rem] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                    index === 0 ? "bg-white text-brand" : "bg-brand text-white"
                  }`}
                >
                  View service page
                </Link>
              </article>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {services.slice(2).map((service) => (
              <article key={service.slug} className="rounded-[1.55rem] border border-border bg-white p-6 shadow-[0_14px_36px_rgba(11,33,25,0.08)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                  {service.label}
                </p>
                <h2 className="headline mt-4 text-2xl font-black text-brand">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {service.shortDescription}
                </p>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-muted">
                  {service.benefits.slice(0, 2).map((benefit) => (
                    <li key={benefit}>- {benefit}</li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex text-[11px] font-semibold uppercase tracking-[0.18em] text-brand"
                >
                  View service page
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
