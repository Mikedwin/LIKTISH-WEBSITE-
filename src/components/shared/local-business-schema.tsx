import { siteContact } from "@/lib/site-data";

export function LocalBusinessSchema() {
  const payload = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LIKTISH Engineering",
    description:
      "Solar engineering company in Takoradi, Ghana offering residential, commercial, industrial, and institutional solar solutions across Ghana and Africa.",
    telephone: siteContact.phone,
    email: siteContact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.address,
      addressLocality: "Takoradi",
      addressRegion: "Western Region",
      addressCountry: "GH",
    },
    areaServed: ["Takoradi", "Accra", "Kumasi", "Ghana", "Africa"],
    url: "https://liktishengineering.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
