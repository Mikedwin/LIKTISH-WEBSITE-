import { ContactForm } from "@/components/marketing/contact-form";
import { MapEmbed } from "@/components/shared/map-embed";
import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteContact } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Contact | LIKTISH Engineering",
  description:
    "Contact LIKTISH Engineering by phone, WhatsApp, email, or website form to discuss a solar project in Ghana.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="px-4 py-16 sm:py-20">
      <div className="container-shell grid gap-10 xl:grid-cols-[0.82fr_1.18fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Talk to LIKTISH in the way that fits the project stage."
            body="The contact page should feel credible and useful, not like a filler page. It works as a direct access point for calls, WhatsApp, formal enquiries, and location confidence."
          />
          <div className="mt-8 space-y-4 rounded-[1.5rem] bg-brand px-5 py-6 text-sm text-white shadow-[0_24px_54px_rgba(11,33,25,0.18)] sm:mt-10 sm:space-y-5 sm:rounded-[1.8rem] sm:px-8 sm:py-8">
            <a href={`tel:${siteContact.phone.replace(/\s+/g, "")}`} className="block hover:text-accent-soft">
              {siteContact.phone}
            </a>
            <a href={`mailto:${siteContact.email}`} className="block hover:text-accent-soft">
              {siteContact.email}
            </a>
            <a href={siteContact.whatsapp} target="_blank" rel="noreferrer" className="block hover:text-accent-soft">
              WhatsApp chat
            </a>
            <p>{siteContact.address}</p>
            <p>{siteContact.officeHours}</p>
          </div>
          <div className="section-frame mt-6 overflow-hidden rounded-[1.5rem] p-2.5 sm:rounded-[1.8rem] sm:p-3">
            <MapEmbed className="map-frame h-[280px] w-full rounded-[1.15rem] border-0 sm:h-[340px] sm:rounded-[1.3rem]" />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
