import Image from "next/image";
import { CTAButton } from "@/components/shared/cta-button";
import { whyLiktishPoints } from "@/lib/site-data";

const pointIcons = [
  (
    <svg key="arrow-up" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12 3v18M5 10l7-7 7 7M7 14c1.8 1.4 3.4 2 5 2s3.2-.6 5-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  (
    <svg key="power-wave" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M4 13h4l2-4 4 8 2-4h4M3 19h18M6 8l2-2 2 2M14 7l2-2 2 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  (
    <svg key="shield-check" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12 3l7 4v5c0 4.2-2.6 6.9-7 9-4.4-2.1-7-4.8-7-9V7l7-4ZM9.5 12l1.7 1.7L15 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  (
    <svg key="checklist" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M6 7h12M6 12h12M6 17h7M17 15l2 2 3-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
];

export function WhyLiktishHighlights() {
  return (
    <section id="why-liktish" className="bg-[#f8f2e8] px-4 py-18 scroll-mt-28 sm:py-24">
      <div className="container-shell">
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="headline text-[2rem] font-black text-brand sm:text-3xl md:text-5xl">
            Why LIKTISH
          </h2>
          <p className="prose-copy mx-auto mt-4 max-w-3xl text-[0.98rem] sm:mt-5 sm:text-base md:text-lg">
            LIKTISH helps homeowners, businesses, industries, and institutions move from unstable power to engineered solar systems built for long-term reliability.
          </p>
        </div>

        <div className="grid gap-8 lg:gap-10 xl:grid-cols-[0.94fr_1.06fr] xl:gap-12">
          <div className="relative">
            <div
              className="relative overflow-hidden border-[4px] border-[#c6f0e0] bg-white shadow-[0_30px_70px_rgba(24,49,39,0.14)]"
              style={{ borderRadius: "38% 38% 32% 32% / 24% 24% 30% 30%" }}
            >
              <Image
                src="/why-liktish-replacement.jfif"
                alt="Solar installation for LIKTISH trust section"
                width={1200}
                height={900}
                unoptimized
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px] xl:h-[580px]"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-[10px] border border-[#effff8]/70"
              style={{ borderRadius: "37% 37% 31% 31% / 23% 23% 29% 29%" }}
            />
          </div>

          <div>
            <div className="space-y-4">
              {whyLiktishPoints.map((point, index) => (
                <article
                  key={point.title}
                  className={
                    index === 3
                      ? "group section-frame rounded-[1.35rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#7ea893]/45 hover:bg-[linear-gradient(180deg,#f3f5ee_0%,#e7efe7_100%)] hover:shadow-[0_22px_52px_rgba(11,33,25,0.10)] sm:rounded-[1.55rem] sm:p-6 xl:ml-6"
                      : "group section-frame rounded-[1.35rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#7ea893]/45 hover:bg-[linear-gradient(180deg,#f3f5ee_0%,#e7efe7_100%)] hover:shadow-[0_22px_52px_rgba(11,33,25,0.10)] sm:rounded-[1.55rem] sm:p-6"
                  }
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.9rem] border border-[#19A875]/16 bg-[#e7f7f0] text-[#19A875] transition duration-300 group-hover:border-[#7ea893]/36 group-hover:bg-[#dfe8df] group-hover:text-[#21493a] sm:h-11 sm:w-11 sm:rounded-[1rem]"
                    >
                      {pointIcons[index]}
                    </span>
                    <div>
                      <h3 className="headline text-[1.45rem] font-black text-brand transition duration-300 group-hover:text-brand sm:text-2xl">
                        {point.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-6 text-muted transition duration-300 group-hover:text-[#4a6156] sm:mt-3 sm:leading-7">
                        {point.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-6 sm:mt-8">
              <CTAButton href="tel:+233542794665" label="Call LIKTISH Today" variant="ghost" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
