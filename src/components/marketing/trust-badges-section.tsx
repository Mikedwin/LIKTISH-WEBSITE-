const items = [
  {
    title: "Expert Engineering",
    body: "Site study discipline, sizing logic, commissioning checks, and practical maintenance planning are part of the LIKTISH promise from day one.",
  },
  {
    title: "Long-term Partnership",
    body: "LIKTISH stays involved after installation with diagnostics, repairs, maintenance planning, and dependable long-term support.",
  },
  {
    title: "Uninterrupted Power",
    body: "Every system is planned around better backup performance, stronger day-to-day reliability, and less dependence on unstable grid supply.",
  },
];

const summaryPoints = [
  { label: "500+", detail: "systems and consultations delivered across homes, businesses, and institutional sites." },
  { label: "Long-term support", detail: "maintenance, repairs, and system follow-through beyond installation day." },
];

export function TrustBadgesSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8f2e8_0%,#eef5ef_52%,#e5f1e9_100%)]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(120deg,rgba(20,55,43,0.34)_1px,transparent_1px),linear-gradient(rgba(20,55,43,0.18)_1px,transparent_1px)] [background-size:92px_92px,46px_46px]" />
      <div className="absolute left-8 top-48 h-72 w-72 rounded-full bg-[rgba(27,201,138,0.16)] blur-3xl" />
      <div className="absolute right-10 top-12 h-52 w-52 rounded-full bg-[rgba(203,138,46,0.12)] blur-3xl" />
      <div className="container-shell relative">
        <div className="mb-14 text-center">
          <h2 className="headline text-3xl font-black text-brand md:text-5xl">
            Why Trust Us
          </h2>
          <p className="prose-copy mx-auto mt-5 max-w-3xl text-base md:text-lg">
            Clients should be able to see LIKTISH&apos;s credibility before the first call, site visit, or proposal review.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="ink-panel rounded-[1.9rem] p-7 text-white md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/56">
              Trust Summary
            </p>
            <h3 className="headline mt-4 max-w-lg text-3xl font-black md:text-4xl">
              Trust starts with clear engineering, honest advice, and dependable support.
            </h3>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/74 md:text-base md:leading-8">
              From the first assessment to installation and aftercare, LIKTISH is built around practical solar delivery you can rely on.
            </p>
            <div className="mt-7 divide-y divide-white/10 border-t border-white/10">
              {summaryPoints.map((point) => (
                <div key={point.label} className="grid gap-1 py-4 text-sm leading-6 text-white/78 md:grid-cols-[8.5rem_1fr] md:items-start">
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[#bcebd9]">
                    {point.label}
                  </span>
                  <span>{point.detail}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {items.map((item, index) => (
              <article
                key={item.title}
                className={
                  index === 1
                    ? "section-frame ml-auto max-w-[52rem] rounded-[1.6rem] p-6"
                    : "section-frame rounded-[1.6rem] p-6"
                }
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                  {index === 0 ? "01" : index === 1 ? "02" : "03"}
                </p>
                <h3 className="headline mt-3 text-2xl font-black text-brand">{item.title}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
