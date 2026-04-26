import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { projects } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Projects | LIKTISH Engineering",
  description:
    "Browse LIKTISH solar projects across residential, commercial, industrial, and institutional environments in Ghana.",
  path: "/projects",
});

const categoryLabels = ["Residential", "Commercial", "Industrial", "Government & Institutions"];

export default function ProjectsPage() {
  const [featuredProject, leadProject, ...projectLibrary] = projects;

  return (
    <div className="relative overflow-hidden bg-[#f3ecdd] px-4 py-16 sm:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.24)_0%,rgba(21,144,102,0.06)_45%,rgba(203,138,46,0.14)_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(120deg,rgba(21,144,102,0.22)_1px,transparent_1px),linear-gradient(rgba(21,144,102,0.12)_1px,transparent_1px)] [background-size:120px_120px,36px_36px]" />
      <div className="absolute inset-y-0 right-0 w-[38%] bg-[linear-gradient(180deg,rgba(16,112,80,0.18),rgba(16,112,80,0.04))]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(203,138,46,0.24),transparent_60%)]" />
      <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-[rgba(203,138,46,0.18)] blur-3xl" />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[rgba(21,144,102,0.16)] blur-3xl" />
      <div className="container-shell relative">
        <section className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-soft">
              Projects
            </p>
            <h1 className="headline mt-4 text-[2.4rem] font-black tracking-tight text-brand sm:text-4xl md:text-6xl">
              Built systems for real energy pressure.
            </h1>
            <p className="prose-copy mt-5 max-w-2xl text-[0.98rem] sm:mt-6 sm:text-base md:text-lg">
              This page should feel like operating proof, not a brochure gallery. These projects show how LIKTISH applies solar across homes, businesses, industrial sites, and institutions in Ghana.
            </p>
          </div>

          <div className="grid gap-4 rounded-[1.6rem] border border-[#d9e5dd] bg-[linear-gradient(135deg,#fffaf2_0%,#eef5ef_100%)] p-5 shadow-[0_18px_44px_rgba(11,33,25,0.06)] sm:rounded-[2rem] sm:p-6 md:grid-cols-[1fr_auto] md:items-end md:p-7">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                Project coverage
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {categoryLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-[#d3e2d9] bg-white/84 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="inline-flex min-h-12 items-center rounded-[1rem] bg-brand px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] !text-white shadow-[0_18px_34px_rgba(11,33,25,0.18)]"
              style={{ color: "#ffffff" }}
            >
              View Project
            </Link>
          </div>
        </section>

        <section className="mt-14 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Link
            href={`/projects/${featuredProject.slug}`}
            className="group overflow-hidden rounded-[2.3rem] border border-white/10 bg-[linear-gradient(160deg,#095F42_0%,#148E63_52%,#0A583E_100%)] text-white shadow-[0_28px_70px_rgba(11,33,25,0.22)]"
          >
            <div className="relative h-[16rem] overflow-hidden rounded-b-[2rem] sm:h-[18rem] md:h-[21rem] lg:h-[25rem]">
              <Image
                src={featuredProject.image}
                alt={featuredProject.title}
                width={1400}
                height={1000}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,40,29,0.08),rgba(7,40,29,0.56))]" />
              <div className="absolute left-5 top-5 rounded-full bg-white/92 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand shadow-[0_12px_28px_rgba(11,33,25,0.12)]">
                Featured project
              </div>
            </div>

            <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[0.78fr_1.22fr] md:gap-8 md:p-9">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a9e7d0]">
                  {featuredProject.category} / {featuredProject.location}
                </p>
                <h2 className="headline mt-4 text-[2rem] font-black text-white sm:text-3xl md:text-5xl">
                  {featuredProject.title}
                </h2>
                <p className="mt-4 text-sm font-semibold text-white/82">
                  {featuredProject.systemSize}
                </p>
              </div>

              <div>
                <p className="text-base leading-8 text-white/82">{featuredProject.summary}</p>
                <div className="mt-6 grid gap-3 md:mt-7 md:grid-cols-2">
                  {featuredProject.results.slice(0, 2).map((result) => (
                    <div
                      key={result}
                      className="rounded-[1.2rem] border border-white/10 bg-white/8 px-4 py-4 text-sm leading-6 text-white/80"
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/78">
                  View case study
                </p>
              </div>
            </div>
          </Link>

          <div className="grid gap-6">
            <Link
              href={`/projects/${leadProject.slug}`}
              className="group rounded-[1.6rem] border border-[#d6e0d8] bg-[linear-gradient(180deg,#fffdf8_0%,#f1f5ef_100%)] p-5 shadow-[0_16px_40px_rgba(11,33,25,0.08)] transition duration-300 hover:-translate-y-1 sm:rounded-[2rem] sm:p-6"
            >
              <div className="grid gap-5 sm:grid-cols-[9rem_1fr] sm:items-start md:grid-cols-[11rem_1fr]">
                <div className="relative h-40 overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={leadProject.image}
                    alt={leadProject.title}
                    width={600}
                    height={460}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                    Lead project
                  </p>
                  <h2 className="headline mt-3 text-[1.7rem] font-black text-brand sm:text-2xl md:text-3xl">
                    {leadProject.title}
                  </h2>
                  <p className="mt-3 text-sm font-semibold text-[#159066]">
                    {leadProject.category} / {leadProject.location}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">{leadProject.summary}</p>
                </div>
              </div>
            </Link>

            <div className="rounded-[1.6rem] border border-[#d9e5dd] bg-white/82 p-5 shadow-[0_14px_34px_rgba(11,33,25,0.05)] sm:rounded-[2rem] sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                What these projects show
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-muted">
                <li className="flex items-start gap-3">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-[#159066]" />
                  <span>LIKTISH works across residential, commercial, industrial, and institutional sites.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-[#159066]" />
                  <span>Each installation is designed around a real power problem, not generic solar language.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-[#159066]" />
                  <span>The page should help clients see the kind of project LIKTISH can deliver for them.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                Project archive
              </p>
              <h2 className="headline mt-3 text-[2rem] font-black text-brand sm:text-3xl md:text-4xl">
                More LIKTISH work across Ghana
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projectLibrary.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex h-[34rem] flex-col overflow-hidden rounded-[1.8rem] border border-[#d6e0d8] bg-[linear-gradient(180deg,#fffdf8_0%,#f1f5ef_100%)] shadow-[0_14px_34px_rgba(11,33,25,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#8fb49e] sm:h-[35rem]"
              >
                <div className="relative h-[19rem] overflow-hidden sm:h-[20rem]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={560}
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex h-full flex-col p-5 pt-8 sm:p-6 sm:pt-9">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                    {project.category} / {project.location}
                  </p>
                  <h3 className="headline mt-3 text-[1.7rem] font-black text-brand sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-[#159066]">
                    {project.systemSize}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    {project.summary}
                  </p>
                  <p className="mt-auto pt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                    View case study
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[1.6rem] border border-[#d9e5dd] bg-[linear-gradient(135deg,#fffaf2_0%,#eef5ef_100%)] px-5 py-6 shadow-[0_18px_44px_rgba(11,33,25,0.06)] sm:rounded-[2.1rem] sm:px-7 sm:py-8 md:px-10 md:py-10">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                Ready to start your own project?
              </p>
              <h2 className="headline mt-3 text-[2rem] font-black text-brand sm:text-3xl md:text-4xl">
                Call or message LIKTISH and let&apos;s scope your solar system.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted md:text-base">
                LIKTISH designs, installs, and maintains solar systems for homes, businesses, industries, and institutions across Ghana.
              </p>
            </div>
            <div className="md:justify-self-end">
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="inline-flex min-h-12 items-center rounded-[1rem] bg-brand px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] !text-white shadow-[0_18px_34px_rgba(11,33,25,0.18)]"
              style={{ color: "#ffffff" }}
            >
              View Project
            </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
