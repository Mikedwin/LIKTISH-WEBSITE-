import { notFound } from "next/navigation";
import { ServiceDetailSections } from "@/components/marketing/service-detail-sections";
import { buildMetadata } from "@/lib/seo/metadata";
import { projects, services } from "@/lib/site-data";

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return buildMetadata({
      title: "Service Not Found | LIKTISH Engineering",
      description: "The requested LIKTISH service page could not be found.",
      path: `/services/${slug}`,
    });
  }

  return buildMetadata({
    title: `${service.title} | LIKTISH Engineering`,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedProject = projects.find(
    (project) => project.slug === service.caseStudySlug,
  );

  return <ServiceDetailSections service={service} relatedProject={relatedProject} />;
}
