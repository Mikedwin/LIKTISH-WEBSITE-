"use client";

import Link from "next/link";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { aboutFaqs } from "@/lib/site-data";

const homepageFaqs = aboutFaqs.slice(0, 3);

export function HomepageFaqPreview() {
  return (
    <section className="relative overflow-hidden px-4 py-18 sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f7fbf7_0%,#edf6ef_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(25,168,117,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(203,138,46,0.12),transparent_24%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(120deg,rgba(20,55,43,0.18)_1px,transparent_1px),linear-gradient(rgba(20,55,43,0.08)_1px,transparent_1px)] [background-size:110px_110px,55px_55px]" />

      <div className="container-shell relative">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12">
          <RevealOnScroll className="max-w-2xl">
            <div className="inline-flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-brand" />
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-soft">
                FAQ
              </p>
            </div>
            <h2 className="headline mt-5 text-[2rem] font-black tracking-tight text-brand sm:text-3xl md:text-5xl">
              Common solar repair and maintenance questions.
            </h2>
            <p className="prose-copy mt-5 max-w-xl text-[0.98rem] sm:text-base md:text-lg">
              Quick answers for people trying to understand panel cleaning, repairs,
              cracks, output loss, and long-term solar maintenance.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex min-h-12 items-center rounded-[1rem] border border-[#cfe0d6] bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand shadow-[0_16px_34px_rgba(11,33,25,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-[#95b5a3] hover:bg-[#fbfdfb]"
            >
              View full FAQ on About
            </Link>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <FAQAccordion items={homepageFaqs} />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
