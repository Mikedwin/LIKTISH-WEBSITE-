import type { MetadataRoute } from "next";
import { services } from "@/lib/site-data";

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

  return [...pages, ...servicePages];
}
