import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteContact } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Terms of Service | LIKTISH Engineering",
  description:
    "Read the LIKTISH Engineering terms governing website use, estimates, and consultation requests.",
  path: "/terms",
});

const sections: Array<{ heading: string; body: string[] }> = [
  {
    heading: "Acceptance of terms",
    body: [
      "By accessing or using liktishengineering.com (the \"Site\"), or by submitting an enquiry, savings estimate request, or solar assessment request, you agree to these Terms of Service. If you do not agree, please do not use the Site.",
    ],
  },
  {
    heading: "Purpose of the Site",
    body: [
      "The Site provides general information about LIKTISH Engineering's solar design, installation, and maintenance services across Ghana and Africa, and allows visitors to request estimates, assessments, and consultations.",
    ],
  },
  {
    heading: "Estimates and quotations",
    body: [
      "Savings figures produced by the calculator on this Site are indicative only and are based on the information you provide and general assumptions about system performance. Actual results depend on your property, energy usage, equipment, and site conditions.",
      "No estimate, quotation, phone call, WhatsApp message, or website enquiry constitutes a binding agreement. A project becomes binding only once LIKTISH and the client sign a written proposal or contract.",
    ],
  },
  {
    heading: "Not a substitute for a site assessment",
    body: [
      "Content on the Site is provided for general information and does not replace a site-specific technical assessment. Before proceeding with any installation, LIKTISH will conduct or require a proper site evaluation.",
    ],
  },
  {
    heading: "Submitting information through forms",
    body: [
      "You agree to provide accurate and truthful information when submitting a form, and not to use the Site's forms to submit false, abusive, or unlawful content. We may decline to respond to submissions that appear fraudulent, abusive, or automated.",
    ],
  },
  {
    heading: "Third-party services and links",
    body: [
      "The Site integrates with or links to third-party services, including Google Maps and WhatsApp, and uses Cloudflare Turnstile for spam protection. Your use of those services is governed by their own terms and privacy policies, and LIKTISH is not responsible for their content or practices.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "All content on the Site, including text, images, and branding, is owned by LIKTISH Engineering or its licensors and may not be copied or reused without permission.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, LIKTISH is not liable for indirect, incidental, or consequential damages arising from your use of the Site or reliance on indicative estimates published on it.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These Terms are governed by the laws of the Republic of Ghana.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these Terms from time to time. Continued use of the Site after changes take effect constitutes acceptance of the updated Terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white px-4 py-20">
      <div className="container-shell max-w-4xl">
        <SectionHeading
          eyebrow="Terms of Service"
          title="Website terms for enquiries, estimates, and consultation requests"
          body="Effective July 8, 2026. These terms govern your use of this website and any enquiry, estimate, or assessment request submitted through it."
        />
        <div className="mt-10 space-y-8 rounded-[2rem] border border-border bg-surface p-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-lg font-bold text-brand">{section.heading}</h3>
              <div className="mt-3 space-y-3 text-sm leading-7 text-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
          <div>
            <h3 className="text-lg font-bold text-brand">Contact us</h3>
            <div className="mt-3 space-y-1 text-sm leading-7 text-muted">
              <p>Questions about these Terms can be sent to:</p>
              <p>{siteContact.address}</p>
              <p>Phone: {siteContact.phone}</p>
              <p>Email: {siteContact.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
