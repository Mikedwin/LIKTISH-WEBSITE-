import Image from "next/image";
import { CTAButton } from "@/components/shared/cta-button";
import { siteContact } from "@/lib/site-data";

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#19A875] px-4 py-14 text-white sm:py-16 md:py-22">
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-no-repeat opacity-[0.34]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=80')",
            backgroundPosition: "center 60%",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,71,54,0.62),rgba(2,71,54,0.68))]" />
      <div className="absolute inset-0 opacity-15">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(25,168,117,0.34),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(25,168,117,0.22),transparent_28%)]" />
      </div>
      <div className="container-shell relative">
        <div className="grid items-start gap-10 lg:gap-12 xl:grid-cols-[1fr_0.95fr]">
          <div className="max-w-3xl pt-0 md:-translate-y-2 xl:-translate-y-8">
            <h1 className="headline max-w-4xl text-[2.6rem] font-extrabold leading-[0.94] sm:text-[3.4rem] md:text-[4.4rem] xl:text-[4.9rem]">
              <span className="block text-white">Say Goodbye to</span>
              <span className="block text-[#27d69d]">Dumsor. Forever.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-[0.98rem] leading-7 text-white/80 sm:mt-8 sm:text-[1rem] md:text-[1.08rem]">
              LIKTISH Engineering designs, installs, and maintains solar systems for homes, businesses, industries, and institutions across Ghana. Clean energy. Smart investment. Reliable power.
            </p>

            <div className="mt-10 grid max-w-[42rem] grid-cols-2 gap-3 sm:mt-12 xl:mt-20">
              <CTAButton
                label="Get a Free Solar Assessment"
                disabled
                className="min-h-14 w-full rounded-full bg-[#159066] px-4 text-[0.88rem] font-bold normal-case tracking-normal text-white shadow-[0_22px_46px_rgba(8,46,33,0.24)] sm:min-h-16 sm:px-7 sm:text-[0.95rem] md:min-h-[4.2rem] md:px-10 md:text-[1.08rem]"
              />
              <CTAButton
                href={siteContact.whatsapp}
                label="WhatsApp Us"
                variant="secondary"
                className="min-h-14 w-full rounded-full !border-white/24 !bg-transparent px-4 text-[0.88rem] font-medium normal-case tracking-normal !text-white/78 shadow-none hover:!border-white/40 hover:!bg-white/8 hover:!text-white sm:min-h-16 sm:px-7 sm:text-[0.95rem] md:min-h-[4.2rem] md:px-8 md:text-[0.98rem]"
              />
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/64 sm:mt-5">
              Ask for a free solar assessment, or message us on WhatsApp if you want a quick first conversation.
            </p>
          </div>

          <div className="relative xl:justify-self-end">
            <div
              className="hero-image-float relative mx-auto aspect-[1.18/1] w-full max-w-[22rem] sm:aspect-[1.3/1] sm:max-w-[28rem] md:aspect-[1.46/1] md:max-w-[38rem] xl:max-w-[45rem]"
              style={{ borderRadius: "46% 38% 41% 35% / 33% 34% 66% 67%" }}
            >
              <div
                className="hero-outline-shift pointer-events-none absolute inset-0 border-[3px] border-[#7bd3af]/80 shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_0_22px_rgba(123,211,175,0.24)]"
                style={{
                  borderRadius: "46% 38% 41% 35% / 33% 34% 66% 67%",
                }}
              />
              <div
                className="relative h-full w-full overflow-hidden border border-white/12"
                style={{ borderRadius: "45% 37% 40% 34% / 32% 33% 65% 66%" }}
              >
                <Image
                  src="/hero-solar-industrial.jfif"
                  alt="Industrial solar panels installed on rooftops"
                  width={1200}
                  height={900}
                  priority
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
