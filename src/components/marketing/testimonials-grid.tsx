import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/lib/site-data";

export function TestimonialsGrid() {
  const [featuredTestimonial, ...secondaryTestimonials] = testimonials;

  return (
    <section className="px-4 py-24">
      <div className="container-shell">
        <div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading
              eyebrow="Client Voices"
              title="Why customers remember LIKTISH."
              body="Testimonials should read like lived customer outcomes, not cloned card components repeated for symmetry."
            />
          </div>
          <div className="grid gap-4">
            <article className="ink-panel rounded-[1.8rem] p-7 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/58">
                Featured testimonial
              </p>
              <p className="headline mt-5 max-w-3xl text-3xl font-black leading-[1.08] md:text-4xl">
                &ldquo;{featuredTestimonial.quote}&rdquo;
              </p>
              <div className="mt-8">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-soft">
                  {featuredTestimonial.name}
                </p>
                <p className="mt-2 text-sm text-white/68">{featuredTestimonial.role}</p>
              </div>
            </article>
            <div className="grid gap-4 md:grid-cols-2">
              {secondaryTestimonials.map((testimonial, index) => (
                <article
                  key={testimonial.name}
                  className={
                    index === 0
                      ? "section-frame rounded-[1.5rem] p-6"
                      : "rounded-[1.5rem] border border-border bg-white p-6 shadow-[0_14px_36px_rgba(11,33,25,0.08)]"
                  }
                >
                  <p className="text-sm leading-7 text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="mt-6">
                    <p className="headline text-xl font-black text-brand">{testimonial.name}</p>
                    <p className="mt-2 text-sm text-muted">{testimonial.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
