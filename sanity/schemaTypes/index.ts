export const schemaTypes = [
  {
    name: "siteSettings",
    title: "Site Settings",
    fields: ["companyName", "phone", "email", "address", "primaryCtas"],
  },
  {
    name: "servicePage",
    title: "Service Page",
    fields: ["title", "slug", "heroTitle", "summary", "benefits", "faqs"],
  },
  {
    name: "project",
    title: "Project",
    fields: ["title", "slug", "location", "systemSize", "customerType", "results"],
  },
  {
    name: "testimonial",
    title: "Testimonial",
    fields: ["name", "role", "quote"],
  },
  {
    name: "teamMember",
    title: "Team Member",
    fields: ["name", "role", "credential", "bio"],
  },
  {
    name: "faq",
    title: "FAQ",
    fields: ["question", "answer", "category"],
  },
  {
    name: "legalPage",
    title: "Legal Page",
    fields: ["title", "slug", "content"],
  },
  {
    name: "seoSettings",
    title: "SEO Settings",
    fields: ["metaTitle", "metaDescription", "canonicalUrl"],
  },
] as const;
