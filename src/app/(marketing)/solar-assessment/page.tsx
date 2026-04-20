import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Free Solar Assessment | LIKTISH Engineering",
  description:
    "Request a free solar assessment from LIKTISH Engineering for your home or business in Ghana.",
  path: "/solar-assessment",
});

export default function SolarAssessmentPage() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#cfe6d5_0%,#dcc199_100%)] px-4 py-16 sm:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(7,56,42,0.08)_0%,rgba(21,144,102,0.14)_38%,rgba(203,138,46,0.18)_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(120deg,rgba(13,87,63,0.26)_1px,transparent_1px),linear-gradient(rgba(13,87,63,0.14)_1px,transparent_1px)] [background-size:140px_140px,34px_34px]" />
      <div className="absolute inset-y-0 right-0 w-[46%] bg-[linear-gradient(180deg,rgba(11,102,73,0.32),rgba(11,102,73,0.08))]" />
      <div className="absolute inset-y-0 left-0 w-[28%] bg-[linear-gradient(180deg,rgba(180,118,34,0.2),rgba(180,118,34,0.05))]" />
      <div className="absolute -left-12 top-8 h-52 w-52 rounded-full bg-[rgba(203,138,46,0.24)] blur-3xl" />
      <div className="absolute right-4 top-10 h-72 w-72 rounded-full bg-[rgba(21,144,102,0.3)] blur-3xl" />
      <div className="absolute bottom-0 left-[22%] h-48 w-48 rounded-full bg-[rgba(255,255,255,0.16)] blur-3xl" />

      <div className="container-shell relative grid gap-8 xl:grid-cols-[0.82fr_1.18fr] xl:gap-10">
        <div className="xl:sticky xl:top-28 xl:self-start">
          <p className="text-[0.95rem] font-semibold uppercase tracking-[0.22em] text-brand-soft sm:text-[1.05rem]">
            Free Solar Assessment
          </p>
          <h1 className="headline mt-3 max-w-2xl text-[2.4rem] font-black leading-[0.94] text-brand sm:text-[3.2rem] md:text-[4rem]">
            Tell LIKTISH what your property needs.
          </h1>
          <p className="prose-copy mt-5 max-w-xl text-[1rem] leading-7 sm:text-[1.05rem] sm:leading-8">
            This page is designed as a clearer intake for homes and businesses that
            want a solar assessment. Share the basics, and we can shape the full
            flow from here.
          </p>

          <div className="mt-7 rounded-[1.5rem] border border-[#caded2] bg-white/80 p-5 shadow-[0_16px_36px_rgba(11,33,25,0.07)] sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
              What to expect
            </p>
            <p className="mt-3 text-sm leading-7 text-muted sm:text-[0.98rem]">
              This assessment is for homeowners, businesses, and property teams who
              want practical solar guidance before moving forward.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted sm:text-[0.98rem]">
              After you submit the form, LIKTISH reviews the request and follows up
              with the next step, usually by phone or WhatsApp.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted sm:text-[0.98rem]">
              It is a simple first step, not a booking system, and it helps us
              understand the property, the issue, and the best way to reach you.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[1.45rem] border border-[#d8e4dc] bg-white/78 p-5 shadow-[0_12px_28px_rgba(11,33,25,0.06)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                Built for
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Residential, commercial, and small business solar enquiries that
                need a clean first step.
              </p>
            </div>
            <div className="rounded-[1.45rem] border border-[#d8e4dc] bg-[linear-gradient(180deg,#f7fbf8_0%,#eef5ef_100%)] p-5 shadow-[0_12px_28px_rgba(11,33,25,0.06)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                Next step
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                We can later connect this page to a real lead flow without bringing
                back any booking or admin system.
              </p>
            </div>
          </div>
        </div>

        <div className="relative self-start overflow-hidden rounded-[1.7rem] border border-[#aecab9] bg-[linear-gradient(145deg,#eef8f1_0%,#d6eadd_40%,#e3c590_100%)] p-5 shadow-[0_30px_70px_rgba(11,33,25,0.12)] sm:rounded-[2rem] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]" />
          <div className="absolute inset-y-0 right-0 w-[32%] bg-[linear-gradient(180deg,rgba(21,144,102,0.16),rgba(21,144,102,0.04))]" />
          <div className="absolute inset-y-0 left-0 w-[22%] bg-[linear-gradient(180deg,rgba(203,138,46,0.16),rgba(203,138,46,0.04))]" />
          <div className="absolute -right-8 top-10 h-36 w-36 rounded-full bg-[rgba(21,144,102,0.2)] blur-3xl" />
          <div className="absolute bottom-0 left-10 h-28 w-28 rounded-full bg-[rgba(203,138,46,0.2)] blur-3xl" />
          <form className="relative space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-brand">
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

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-brand">
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

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-brand">
                  Name
                </span>
                <input type="text" className="field-shell" placeholder="Your full name" />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-brand">
                  Phone Number*
                </span>
                <input
                  type="tel"
                  className="field-shell"
                  placeholder="Your phone number"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-brand">
                  Address*
                </span>
                <input
                  type="text"
                  className="field-shell"
                  placeholder="Property or business address"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-brand">
                  Email*
                </span>
                <input
                  type="email"
                  className="field-shell"
                  placeholder="Your email address"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-brand">
                What can we help you with today?*
              </span>
              <textarea
                rows={5}
                className="field-shell min-h-[10rem] py-3"
                placeholder="Share a few details about the issue, property, or kind of solar help you need"
              />
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-brand">
                  How would you like us to reach out?
                </span>
                <select className="field-shell">
                  <option>Please Select</option>
                  <option>Phone call</option>
                  <option>WhatsApp</option>
                  <option>Email</option>
                </select>
              </label>

              <label className="flex items-start gap-3 rounded-[1.2rem] border border-[#d6e2da] bg-white/82 px-4 py-4 text-sm leading-6 text-muted sm:px-5">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-[#aac9b9] text-brand focus:ring-brand"
                />
                <span>
                  I agree to receive other communications from Freedom Solar
                  Power.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="inline-flex min-h-12 items-center rounded-[1rem] bg-brand px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition duration-200 hover:-translate-y-0.5 hover:bg-brand-strong active:translate-y-0 active:scale-[0.985]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
