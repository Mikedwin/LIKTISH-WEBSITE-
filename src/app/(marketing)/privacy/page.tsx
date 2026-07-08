import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteContact } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Privacy Policy | LIKTISH Engineering",
  description:
    "Read how LIKTISH handles website enquiries, lead information, and customer communications.",
  path: "/privacy",
});

const sections: Array<{ heading: string; body: string[] }> = [
  {
    heading: "Overview",
    body: [
      "LIKTISH Engineering (\"LIKTISH\", \"we\", \"us\") provides this Privacy Policy to explain how we collect, use, store, and protect personal information submitted through liktishengineering.com (the \"Site\"). By using the Site or submitting a form, you agree to the practices described below.",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "When you contact us, request a savings estimate, or request a solar assessment, we collect the information you provide directly. Depending on the form, this may include your name, phone number, email address, property or business address, and the details of your enquiry.",
      "We do not require you to create an account on the Site, and we do not collect payment information through the Site.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use the information you submit to respond to your enquiry, prepare estimates and proposals, schedule site assessments, and follow up by phone, SMS, WhatsApp, or email about your request.",
      "We do not sell your personal information, and we do not use it for unrelated marketing without your consent.",
    ],
  },
  {
    heading: "Consent and opt-out",
    body: [
      "The solar assessment form asks you to confirm consent before your request is submitted. You may withdraw consent or opt out of SMS and WhatsApp follow-up at any time by telling us so when we contact you, or by reaching us using the details below. We will still retain records needed to complete an enquiry already in progress or required by law.",
    ],
  },
  {
    heading: "Cookies and browser storage",
    body: [
      "The Site stores a small note in your browser to remember that you have acknowledged our cookie notice. It also uses Cloudflare Turnstile, a privacy-focused verification service, to help confirm that form submissions come from real visitors rather than automated bots. The Site does not currently use advertising or analytics cookies.",
    ],
  },
  {
    heading: "Third-party service providers",
    body: [
      "We work with a small number of trusted providers to operate the Site and respond to enquiries, including Supabase for secure storage of form submissions, SendGrid for email notifications, Hubtel for SMS notifications, Cloudflare Turnstile for spam and bot protection, Google Maps to display our office location, and WhatsApp if you choose to message us using the WhatsApp button.",
      "These providers process information only as needed to deliver their service to us and are not permitted to use it for their own marketing.",
    ],
  },
  {
    heading: "Data storage and retention",
    body: [
      "Form submissions are stored securely and are accessible only to authorized LIKTISH personnel. Leads that are closed or identified as spam are automatically removed after a limited retention period. You may request that we anonymize or delete your information sooner by contacting us using the details below.",
    ],
  },
  {
    heading: "Data security",
    body: [
      "The Site is served over an encrypted connection, admin access to stored leads requires an authenticated LIKTISH account, and forms are protected against automated spam and duplicate submissions. No method of transmission or storage is completely secure, but we take reasonable steps appropriate to the sensitivity of the information involved.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on applicable law, including Ghana's Data Protection Act, 2012 (Act 843), you may have the right to access the personal information we hold about you, request that we correct inaccurate information, request that we delete or anonymize your information, and object to or restrict certain uses of it. To exercise any of these rights, contact us using the details below.",
    ],
  },
  {
    heading: "Children's privacy",
    body: [
      "The Site is intended for property owners, businesses, and institutions seeking solar services and is not directed at children. We do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or in applicable law. The effective date below reflects the most recent update.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white px-4 py-20">
      <div className="container-shell max-w-4xl">
        <SectionHeading
          eyebrow="Privacy Policy"
          title="How LIKTISH handles enquiry and lead data"
          body="Effective July 8, 2026. This policy explains what we collect through this website, why, and how you can reach us about it."
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
              <p>Questions about this Privacy Policy or your personal information can be sent to:</p>
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
