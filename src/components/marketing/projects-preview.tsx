import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { projects } from "@/lib/site-data";

export function ProjectsPreview() {
  const [featuredProject, ...sideProjects] = projects.slice(0, 4);

  return (
    <section id="projects" className="relative overflow-hidden px-4 py-18 scroll-mt-28 sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#e5efe6_0%,#f4ebdb_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(21,144,102,0.08)_42%,rgba(203,138,46,0.14)_100%)]" />
      <div className="absolute inset-y-0 right-0 w-[40%] bg-[linear-gradient(180deg,rgba(16,112,80,0.18),rgba(16,112,80,0.03))]" />
      <div className="absolute inset-y-0 left-0 w-[22%] bg-[linear-gradient(180deg,rgba(203,138,46,0.14),rgba(203,138,46,0.03))]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(120deg,rgba(20,55,43,0.22)_1px,transparent_1px),linear-gradient(rgba(20,55,43,0.10)_1px,transparent_1px)] [background-size:110px_110px,55px_55px]" />
      <div className="absolute -left-14 top-10 h-56 w-56 rounded-full bg-[rgba(203,138,46,0.16)] blur-3xl" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[rgba(21,144,102,0.18)] blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,rgba(203,138,46,0.2),transparent_62%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(circle_at_bottom_right,rgba(21,144,102,0.18),transparent_58%)]" />

      <div className="container-shell relative">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <h2 className="headline mt-4 text-[2rem] font-black text-brand sm:mt-5 sm:text-3xl md:text-5xl">
            Projects
          </h2>
          <p className="mx-auto mt-4 text-[0.98rem] leading-7 text-muted sm:mt-5 sm:text-base sm:leading-8 md:text-lg">
            Case-study proof from homes, businesses, industrial sites, and institutions that needed reliable solar power across Ghana.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <RevealOnScroll delay={40}>
            <article className="group overflow-hidden rounded-[2rem] border border-white/12 bg-white shadow-[0_24px_70px_rgba(11,33,25,0.12)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_78px_rgba(11,33,25,0.18)]">
              <div className="relative h-[17rem] overflow-hidden sm:h-[20rem] lg:h-[24rem]">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,33,25,0.05)_0%,rgba(11,33,25,0.36)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(11,33,25,0.02)_0%,rgba(11,33,25,0.42)_100%)]" />
                <div className="absolute left-5 top-5 rounded-full bg-white/92 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand shadow-[0_12px_28px_rgba(11,33,25,0.12)] transition duration-300 group-hover:translate-x-1">
                  Featured case study
                </div>
              </div>

              <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[0.88fr_1.12fr] md:gap-7 md:p-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                    {featuredProject.category} / {featuredProject.location}
                  </p>
                  <h3 className="headline mt-3 text-[2rem] font-black text-brand transition duration-300 group-hover:translate-x-1 sm:mt-4 sm:text-3xl md:text-4xl">
                    {featuredProject.title}
                  </h3>
                  <p className="mt-4 text-sm font-semibold leading-6 text-[#19A875]">
                    {featuredProject.systemSize}
                  </p>
                </div>

                <div>
                  <p className="text-sm leading-7 text-muted">{featuredProject.summary}</p>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand transition duration-300 group-hover:translate-x-1 sm:mt-5">
                    Project snapshot
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {featuredProject.challenge}
                  </p>
                </div>
              </div>
            </article>
          </RevealOnScroll>

          <div className="grid gap-4">
            {sideProjects.map((project, index) => {
              const isDark = index === 1;
              const isCompact = index === 2;

              return (
                <RevealOnScroll
                  key={project.slug}
                  delay={120 + index * 120}
                >
                  <article
                    className={
                      isDark
                        ? "group rounded-[1.7rem] border border-[#0f6f54] bg-[#0b5b43] p-5 text-white shadow-[0_20px_46px_rgba(11,33,25,0.14)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgba(11,33,25,0.2)]"
                        : isCompact
                          ? "group rounded-[1.7rem] border border-[#d6e0d8] bg-[linear-gradient(180deg,#fffdf8_0%,#f1f5ef_100%)] p-5 shadow-[0_14px_34px_rgba(11,33,25,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-[#8fb49e] hover:shadow-[0_24px_50px_rgba(11,33,25,0.12)]"
                          : "group rounded-[1.7rem] border border-[#d6e0d8] bg-[linear-gradient(180deg,#fffdf8_0%,#f1f5ef_100%)] p-5 shadow-[0_14px_34px_rgba(11,33,25,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-[#8fb49e] hover:shadow-[0_24px_50px_rgba(11,33,25,0.12)]"
                    }
                  >
                    <div className="grid gap-4 sm:grid-cols-[8rem_1fr] sm:items-start lg:grid-cols-[9rem_1fr]">
                      <div className="relative h-36 overflow-hidden rounded-[1.2rem] sm:h-32">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={500}
                          height={360}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.07]"
                        />
                      </div>
                      <div>
                        <p
                          className={
                            isDark
                              ? "text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a9e7d0]"
                              : "text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft"
                          }
                        >
                          {project.category} / {project.location}
                        </p>
                        <h3
                          className={
                            isDark
                            ? "headline mt-3 text-[1.55rem] font-black text-white transition duration-300 group-hover:translate-x-1 sm:text-2xl"
                              : "headline mt-3 text-[1.55rem] font-black text-brand transition duration-300 group-hover:translate-x-1 sm:text-2xl"
                          }
                        >
                          {project.title}
                        </h3>
                        <p
                          className={
                            isDark
                              ? "mt-2 text-sm font-semibold text-[#7fddb9]"
                              : "mt-2 text-sm font-semibold text-[#19A875]"
                          }
                        >
                          {project.systemSize}
                        </p>
                        <p
                          className={
                            isDark
                              ? "mt-3 text-sm leading-6 text-white/78 transition duration-300 group-hover:text-white/90"
                              : "mt-3 text-sm leading-6 text-muted transition duration-300 group-hover:text-[#475a51]"
                          }
                        >
                          {isCompact ? project.summary : project.results[0]}
                        </p>
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

        <RevealOnScroll delay={360} className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex min-h-12 items-center rounded-[1rem] border border-[#c9d9cf] bg-white/78 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand shadow-[0_14px_30px_rgba(11,33,25,0.08)] transition duration-200 hover:-translate-y-0.5 hover:bg-white"
          >
            View projects
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
