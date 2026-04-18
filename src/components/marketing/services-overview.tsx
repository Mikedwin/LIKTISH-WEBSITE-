import type { ReactNode } from "react";

import { SectionHeading } from "@/components/shared/section-heading";
import { services } from "@/lib/site-data";

const serviceIcons: Record<string, ReactNode> = {
  residential: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path
        d="M5 10.5 12 5l7 5.5V19H5v-8.5ZM9 19v-5h6v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  commercial: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path
        d="M4 20h16M6 20V6h12v14M9 9h2m4 0h-2m-4 4h2m4 0h-2m-4 4h2m4 0h-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  industrial: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path
        d="M4 19h16M5 19V9l5 3V9l5 3V6l4 2v11M8 19v-3m4 3v-3m4 3v-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  government: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path
        d="M4 10h16M6 10V8l6-3 6 3v2M7 19V10m5 9V10m5 9V10M4 19h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  maintenance: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
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
};

export function ServicesOverview() {
  return (
    <section id="services" className="relative overflow-hidden px-4 py-18 sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f3f6f3_0%,#edf3ef_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(120deg,rgba(13,87,63,0.14)_1px,transparent_1px)] [background-size:190px_190px]" />
      <div className="container-shell relative">
        <div className="mb-10 text-center sm:mb-14">
          <SectionHeading
            title="Our Services"
            body="Solar solutions for homes, businesses, industries, institutions, and long-term system support across Ghana."
            align="center"
          />
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {services.map((service) => {
            const isDark = service.slug === "maintenance";

            return (
              <article
                key={service.slug}
                id={service.slug}
                className={
                  isDark
                    ? "group relative flex min-h-[18.5rem] flex-col overflow-hidden rounded-[1.7rem] border border-[#0f6f54] bg-[#0b5b43] px-5 py-6 text-white shadow-[0_22px_52px_rgba(11,33,25,0.18)] transition duration-200 hover:-translate-y-1 hover:border-[2px] hover:border-white scroll-mt-28 sm:min-h-[20rem] sm:rounded-[2rem] sm:px-6 sm:py-7 lg:min-h-[21rem] lg:px-8 lg:py-8"
                    : "group relative flex min-h-[18.5rem] flex-col overflow-hidden rounded-[1.7rem] border border-[#dde8e1] bg-[#fbfcfa] px-5 py-6 shadow-[0_18px_40px_rgba(11,33,25,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[2px] hover:border-[#19A875] scroll-mt-28 sm:min-h-[20rem] sm:rounded-[2rem] sm:px-6 sm:py-7 lg:min-h-[21rem] lg:px-8 lg:py-8"
                }
              >
                <div
                  className={
                    isDark
                      ? "inline-flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[#107559] text-[#37d69c] transition duration-200 group-hover:bg-[#14906a] group-hover:text-white sm:h-14 sm:w-14 sm:rounded-[1.15rem]"
                      : "inline-flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[#dff6e9] text-[#19A875] transition duration-200 group-hover:bg-[#19A875] group-hover:text-white sm:h-14 sm:w-14 sm:rounded-[1.15rem]"
                  }
                >
                  {serviceIcons[service.slug]}
                </div>

                <p
                  className={
                    isDark
                      ? "mt-5 text-[0.83rem] font-semibold uppercase tracking-[0.12em] text-[#7fddb9] sm:mt-6 sm:text-[0.9rem] lg:mt-7 lg:text-[0.95rem] lg:tracking-[0.14em]"
                      : "mt-5 text-[0.83rem] font-semibold uppercase tracking-[0.12em] text-[#19A875] sm:mt-6 sm:text-[0.9rem] lg:mt-7 lg:text-[0.95rem] lg:tracking-[0.14em]"
                  }
                >
                  {service.label}
                </p>

                <h3
                  className={
                    isDark
                      ? "headline mt-3 text-[1.65rem] font-black leading-[1.05] text-white sm:text-[1.8rem] lg:text-[2rem]"
                      : "headline mt-3 text-[1.65rem] font-black leading-[1.05] text-[#0d5a43] sm:text-[1.8rem] lg:text-[2rem]"
                  }
                >
                  {service.slug === "industrial" ? "Industrial / Solar EPC" : service.title}
                </h3>

                <p
                  className={
                    isDark
                      ? "mt-4 max-w-[24rem] text-[0.98rem] leading-7 text-white/76 sm:mt-5 sm:text-[1.02rem] sm:leading-8 lg:text-[1.05rem] lg:leading-9"
                      : "mt-4 max-w-[24rem] text-[0.98rem] leading-7 text-[#63766d] sm:mt-5 sm:text-[1.02rem] sm:leading-8 lg:text-[1.05rem] lg:leading-9"
                  }
                >
                  {service.heroBody}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
