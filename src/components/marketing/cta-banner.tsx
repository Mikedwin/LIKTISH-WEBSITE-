import { CTAButton } from "@/components/shared/cta-button";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { siteContact } from "@/lib/site-data";

export function CtaBanner() {
  return (
    <section id="contact" className="px-4 py-18 scroll-mt-28 sm:py-24">
      <div className="container-shell">
        <div
          className="relative overflow-hidden rounded-[1.8rem] bg-cover bg-center px-5 py-12 text-center text-white shadow-[0_28px_80px_rgba(11,33,25,0.18)] sm:rounded-[2.2rem] sm:px-6 sm:py-16 md:px-10 md:py-24"
          style={{
            backgroundImage:
              "linear-gradient(180deg,rgba(9,95,66,0.84),rgba(10,88,62,0.88)),url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,181,141,0.24),transparent_34%)]" />
          <RevealOnScroll className="relative mx-auto max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/72">
              Get a Free Solar Assessment
            </p>
            <h2 className="headline mt-4 text-[2.5rem] font-black leading-[0.92] text-white sm:mt-5 sm:text-5xl md:text-7xl">
              Go Solar Today.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-[0.98rem] leading-7 text-white/82 sm:mt-7 sm:text-base sm:leading-8 md:text-xl">
              Contact us for a free site assessment. Join Ghanaian homes and businesses moving from unreliable power to clean, engineered solar.
            </p>
            <div className="mt-8 mx-auto grid w-full max-w-[42rem] grid-cols-2 gap-3 sm:mt-10 sm:gap-4">
              <CTAButton
                label="Get a Free Solar Assessment"
                disabled
                className="min-h-14 w-full rounded-full !bg-white px-4 text-[0.88rem] !text-brand shadow-[0_18px_36px_rgba(11,33,25,0.18)] sm:min-h-16 sm:px-7 sm:text-[0.95rem] md:px-10 md:text-[1.08rem]"
              />
              <CTAButton
                href={siteContact.whatsapp}
                label="WhatsApp Us"
                variant="secondary"
                className="min-h-14 w-full rounded-full border border-white/35 bg-white/10 px-4 text-[0.88rem] normal-case tracking-normal text-white hover:bg-white/16 sm:min-h-16 sm:px-7 sm:text-[0.95rem] md:px-10 md:text-[1.08rem]"
              />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
