export type ServiceSlug =
  | "residential"
  | "commercial"
  | "industrial"
  | "government"
  | "maintenance";

export type CustomerType =
  | "Residential"
  | "Commercial"
  | "Industrial"
  | "Government";

export type ConsultationMethod = "On-site visit" | "Video call" | "Phone call";

export interface NavLink {
  label: string;
  href: string;
}

export interface ServicePageData {
  slug: ServiceSlug;
  label: string;
  title: string;
  shortDescription: string;
  heroTitle: string;
  heroBody: string;
  benefits: string[];
  painPoints: string[];
  process: string[];
  systemOptions: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  caseStudySlug: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  category: CustomerType;
  location: string;
  systemSize: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
}

export interface TestimonialData {
  name: string;
  role: string;
  quote: string;
}

export interface TeamMember {
  name: string;
  role: string;
  credential: string;
  bio: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
}

export interface SavingsLeadInput {
  name: string;
  phone: string;
  email: string;
  estimateSummary: string;
}
