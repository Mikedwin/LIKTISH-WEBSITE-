import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Free Solar Assessment | LIKTISH Engineering",
  description:
    "Request a free solar assessment from LIKTISH Engineering for your home or business in Ghana.",
  path: "/solar-assessment",
});

export default function SolarAssessmentPage() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#cfe6d5_0%,#dcc199_100%)] px-4 py-14 sm:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(7,56,42,0.08)_0%,rgba(21,144,102,0.14)_38%,rgba(203,138,46,0.18)_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(120deg,rgba(13,87,63,0.26)_1px,transparent_1px),linear-gradient(rgba(13,87,63,0.14)_1px,transparent_1px)] [background-size:140px_140px,34px_34px]" />
      <div className="absolute inset-y-0 right-0 w-[46%] bg-[linear-gradient(180deg,rgba(11,102,73,0.32),rgba(11,102,73,0.08))]" />
      <div className="absolute inset-y-0 left-0 w-[28%] bg-[linear-gradient(180deg,rgba(180,118,34,0.2),rgba(180,118,34,0.05))]" />
      <div className="absolute -left-12 top-8 h-52 w-52 rounded-full bg-[rgba(203,138,46,0.24)] blur-3xl" />
      <div className="absolute right-4 top-10 h-72 w-72 rounded-full bg-[rgba(21,144,102,0.3)] blur-3xl" />
      <div className="absolute bottom-0 left-[22%] h-48 w-48 rounded-full bg-[rgba(255,255,255,0.16)] blur-3xl" />

      <div className="container-shell relative grid gap-6 sm:gap-8 xl:grid-cols-[0.82fr_1.18fr] xl:gap-10">
        <div className="xl:sticky xl:top-28 xl:self-start">
          <p className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#0c6a4d] sm:text-[1.05rem] sm:tracking-[0.22em]">
            Free Solar Assessment
          </p>
          <h1 className="headline mt-3 max-w-2xl text-[2.05rem] font-black leading-[0.94] text-[#083f2f] sm:text-[3.2rem] md:text-[4rem]">
            Tell LIKTISH what your property needs.
          </h1>
          <p className="prose-copy mt-4 max-w-xl text-[0.96rem] leading-7 sm:mt-5 sm:text-[1.05rem] sm:leading-8">
            This page is designed as a clearer intake for homes and businesses that
            want a solar assessment. Share the basics, and we can shape the full
            flow from here.
          </p>

          <div className="mt-6 rounded-[1.35rem] border border-[#caded2] bg-white/80 p-4 shadow-[0_16px_36px_rgba(11,33,25,0.07)] sm:mt-7 sm:rounded-[1.5rem] sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
              What to expect
            </p>
            <p className="mt-3 text-[0.92rem] leading-6 text-muted sm:text-[0.98rem] sm:leading-7">
              This assessment is for homeowners, businesses, and property teams who
              want practical solar guidance before moving forward.
            </p>
            <p className="mt-3 text-[0.92rem] leading-6 text-muted sm:text-[0.98rem] sm:leading-7">
              After you submit the form, LIKTISH reviews the request and follows up
              with the next step, usually by phone or WhatsApp.
            </p>
            <p className="mt-3 text-[0.92rem] leading-6 text-muted sm:text-[0.98rem] sm:leading-7">
              It is a simple first step, not a booking system, and it helps us
              understand the property, the issue, and the best way to reach you.
            </p>
          </div>

          <div className="mt-6 sm:mt-8">
            <div className="rounded-[1.35rem] border border-[#d8e4dc] bg-white/78 p-4 shadow-[0_12px_28px_rgba(11,33,25,0.06)] sm:rounded-[1.45rem] sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                Built for
              </p>
              <p className="mt-3 text-[0.92rem] leading-6 text-muted sm:text-sm sm:leading-7">
                Residential, commercial, and small business solar enquiries that
                need a clean first step.
              </p>
            </div>
          </div>
        </div>

        <div className="relative self-start overflow-hidden rounded-[1.45rem] border border-[#aecab9] bg-[linear-gradient(145deg,#eef8f1_0%,#d6eadd_40%,#e3c590_100%)] p-4 shadow-[0_24px_54px_rgba(11,33,25,0.1)] sm:rounded-[2rem] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]" />
          <div className="absolute inset-y-0 right-0 w-[32%] bg-[linear-gradient(180deg,rgba(21,144,102,0.16),rgba(21,144,102,0.04))]" />
          <div className="absolute inset-y-0 left-0 w-[22%] bg-[linear-gradient(180deg,rgba(203,138,46,0.16),rgba(203,138,46,0.04))]" />
          <div className="absolute -right-8 top-10 h-36 w-36 rounded-full bg-[rgba(21,144,102,0.2)] blur-3xl" />
          <div className="absolute bottom-0 left-10 h-28 w-28 rounded-full bg-[rgba(203,138,46,0.2)] blur-3xl" />
          <form className="relative space-y-4 sm:space-y-5">
            <div className="rounded-[1.2rem] border border-white/45 bg-white/48 p-4 sm:rounded-[1.5rem] sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                Project details
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
                <label className="flex h-full flex-col">
                  <span className="mb-2 block min-h-[3rem] text-[0.92rem] font-semibold leading-6 text-brand sm:min-h-[3.5rem] sm:text-sm">
                    What is the nature of your request?
                  </span>
                  <select className="field-shell">
                    <option>Please Select</option>
                    <option>New solar installation</option>
                    <option>Assessment for an existing system</option>
                    <option>Maintenance or repairs</option>
                    <option>Battery backup or upgrade</option>
                    <option>Commercial or business enquiry</option>
                  </select>
                </label>

                <label className="flex h-full flex-col">
                  <span className="mb-2 block min-h-[3rem] text-[0.92rem] font-semibold leading-6 text-brand sm:min-h-[3.5rem] sm:text-sm">
                    Who installed the solar panels on your home or business?
                  </span>
                  <select className="field-shell">
                    <option>Please Select</option>
                    <option>LIKTISH Engineering</option>
                    <option>Another solar company</option>
                    <option>Independent installer</option>
                    <option>Not installed yet</option>
                    <option>Not sure</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="rounded-[1.2rem] border border-white/45 bg-white/42 p-4 sm:rounded-[1.5rem] sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                Contact information
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-5">
                <label className="block">
                  <span className="mb-2 block text-[0.92rem] font-semibold text-brand sm:text-sm">
                    Name
                  </span>
                  <input type="text" className="field-shell" placeholder="Your full name" />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[0.92rem] font-semibold text-brand sm:text-sm">
                    Phone Number*
                  </span>
                  <input
                    type="tel"
                    className="field-shell"
                    placeholder="Your phone number"
                />
              </label>
              </div>

              <div className="mt-4 grid gap-4 md:mt-5 md:grid-cols-2 md:gap-5">
                <label className="block">
                  <span className="mb-2 block text-[0.92rem] font-semibold text-brand sm:text-sm">
                    Address*
                  </span>
                  <input
                    type="text"
                    className="field-shell"
                    placeholder="Property or business address"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[0.92rem] font-semibold text-brand sm:text-sm">
                    Email*
                  </span>
                  <input
                    type="email"
                    className="field-shell"
                    placeholder="Your email address"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-[1.2rem] border border-white/45 bg-white/38 p-4 sm:rounded-[1.5rem] sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                Request details
              </p>
              <label className="mt-4 block">
                <span className="mb-2 block text-[0.92rem] font-semibold text-brand sm:text-sm">
                  What can we help you with today?*
                </span>
                <textarea
                  rows={5}
                  className="field-shell min-h-[10rem] py-3"
                  placeholder="Share a few details about the issue, property, or kind of solar help you need"
                />
              </label>
            </div>

            <div className="rounded-[1.2rem] border border-white/45 bg-white/44 p-4 sm:rounded-[1.5rem] sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                Preferred follow-up
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-5">
                <label className="block">
                  <span className="mb-2 block text-[0.92rem] font-semibold text-brand sm:text-sm">
                    How would you like us to reach out?
                  </span>
                  <select className="field-shell">
                    <option>Please Select</option>
                    <option>Phone call</option>
                    <option>WhatsApp</option>
                    <option>Email</option>
                  </select>
                </label>

                <label className="flex items-start gap-3 rounded-[1.1rem] border border-[#d6e2da] bg-white/82 px-4 py-4 text-[0.92rem] leading-6 text-muted sm:rounded-[1.2rem] sm:px-5 sm:text-sm">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-[#aac9b9] text-brand focus:ring-brand"
                  />
                  <span>
                    I agree to receive follow-up communication from LIKTISH
                    Engineering about my solar assessment request.
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-[1rem] bg-brand px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition duration-200 hover:-translate-y-0.5 hover:bg-brand-strong active:translate-y-0 active:scale-[0.985] sm:w-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
