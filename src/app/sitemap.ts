import type { MetadataRoute } from "next";
import { projects, services } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/why-liktish",
    "/projects",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const pages = staticRoutes.map((path) => ({
    url: `https://liktishengineering.com${path}`,
    lastModified: new Date(),
  }));

  const servicePages = services.map((service) => ({
    url: `https://liktishengineering.com/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const projectPages = projects.map((project) => ({
    url: `https://liktishengineering.com/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...pages, ...servicePages, ...projectPages];
}
