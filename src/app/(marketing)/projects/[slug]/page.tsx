import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { projects } from "@/lib/site-data";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return buildMetadata({
      title: "Project Not Found | LIKTISH Engineering",
      description: "The requested LIKTISH case study could not be found.",
      path: `/projects/${slug}`,
    });
  }

  return buildMetadata({
    title: `${project.title} | LIKTISH Engineering`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="hero-gradient px-4 py-16 text-white sm:py-20">
        <div className="container-shell grid gap-8 sm:gap-10 xl:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="eyebrow text-white/72">{project.category} project</p>
            <h1 className="headline mt-4 text-[2.5rem] font-black sm:mt-5 sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-white/78 sm:mt-6 sm:text-lg sm:leading-8">
              {project.summary}
            </p>
            <p className="mt-6 text-sm font-semibold text-white/84 sm:mt-8">
              {project.location} | {project.systemSize}
            </p>
          </div>
          <div className="organic-card overflow-hidden border border-white/12 bg-white/10 p-2.5 sm:p-3">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={900}
              className="h-[280px] w-full rounded-[1.05rem] object-cover sm:h-[360px] sm:rounded-[1.15rem] lg:h-[420px] lg:rounded-[1.25rem]"
            />
          </div>
        </div>
      </section>
      <section className="px-4 py-18 sm:py-24">
        <div className="container-shell grid gap-8 sm:gap-10 xl:grid-cols-[0.86fr_1.14fr]">
          <div className="space-y-4">
            <article className="section-frame rounded-[1.4rem] p-5 sm:rounded-[1.65rem] sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                Challenge
              </p>
              <p className="mt-4 text-sm leading-8 text-muted">{project.challenge}</p>
            </article>
            <article className="ink-panel rounded-[1.4rem] p-5 text-white sm:rounded-[1.65rem] sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/58">
                Solution
              </p>
              <p className="mt-4 text-sm leading-8 text-white/76">{project.solution}</p>
            </article>
          </div>
          <div className="section-frame rounded-[1.5rem] px-5 py-6 sm:rounded-[1.8rem] sm:px-8 sm:py-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
              Results
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {project.results.map((result, index) => (
                <li
                  key={result}
                  className={
                    index === 0
                      ? "rounded-[1.3rem] bg-brand p-5 text-sm leading-7 text-white"
                      : "rounded-[1.3rem] border border-border bg-white p-5 text-sm leading-7 text-muted"
                  }
                >
                  {result}
                </li>
              ))}
            </ul>
            <a
              href="tel:+233542794665"
              className="mt-8 inline-flex w-full min-h-12 items-center justify-center rounded-[1rem] bg-brand px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:w-auto sm:justify-start"
            >
              Call LIKTISH Today
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
