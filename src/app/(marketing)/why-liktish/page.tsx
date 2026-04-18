import { buildMetadata } from "@/lib/seo/metadata";
import { whyLiktishPoints } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Why LIKTISH | LIKTISH Engineering",
  description:
    "Understand how LIKTISH Engineering positions solar as a reliable, financially smart power solution for Ghana.",
  path: "/why-liktish",
});

const sectionTitles = [
  "Slash Electricity Bills",
  "Uninterrupted Power",
  "Expert Engineering",
  "Long-term Partnership",
];

export default function WhyLiktishPage() {
  return (
    <>
      <section className="hero-gradient px-4 py-16 text-white sm:py-20">
        <div className="container-shell grid gap-8 xl:grid-cols-[1.04fr_0.96fr]">
          <div>
            <p className="eyebrow text-white/72">Why LIKTISH</p>
            <h1 className="headline mt-4 max-w-4xl text-[2.5rem] font-black sm:mt-5 sm:text-5xl md:text-6xl">
              The value story behind every LIKTISH recommendation.
            </h1>
            <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-white/78 sm:mt-6 sm:text-lg sm:leading-8">
              LIKTISH should feel like a credible solar company in Ghana: confident, knowledgeable, approachable, and grounded in real power conditions.
            </p>
          </div>
            <div className="glass-panel rounded-[1.3rem] p-5 text-brand sm:rounded-[1.45rem] sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                Clear Next Step
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">
                The page should make the next move visible: clear advice, realistic system thinking, and an easy way to call or message LIKTISH.
              </p>
            </div>
        </div>
      </section>
      <section className="px-4 py-18 sm:py-24">
        <div className="container-shell space-y-4">
          {whyLiktishPoints.map((item, index) => (
            <article
              key={item.title}
              className={
                index === 1
                  ? "ink-panel ml-auto max-w-[64rem] rounded-[1.45rem] p-5 text-white sm:rounded-[1.75rem] sm:p-8"
                  : "section-frame rounded-[1.45rem] p-5 sm:rounded-[1.75rem] sm:p-8"
              }
            >
              <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${index === 1 ? "text-white/58" : "text-brand-soft"}`}>
                {sectionTitles[index] ?? item.title}
              </p>
              <h2 className={`headline mt-4 text-[2rem] font-black sm:text-3xl ${index === 1 ? "text-white" : "text-brand"}`}>
                {item.title}
              </h2>
              <p className={`mt-4 max-w-3xl text-base leading-8 ${index === 1 ? "text-white/74" : "text-muted"}`}>
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
