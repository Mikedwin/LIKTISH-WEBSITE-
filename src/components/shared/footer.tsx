import Link from "next/link";
import { LiktishFooterLogo } from "@/components/shared/liktish-logo";
import { navLinks, services, siteContact } from "@/lib/site-data";

const footerIcons = {
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M6.8 4.5l2.1-.5 2 4.4-1.2 1.3c.9 1.8 2.2 3.1 4 4l1.3-1.2 4.4 2-.5 2.1c-.2.9-1 1.5-1.9 1.4-6.1-.5-10.9-5.3-11.4-11.4-.1-.9.5-1.7 1.2-1.9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M4 7.5h16v10H4v-10Zm1.5 1.3 6.5 4.4 6.5-4.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M12 20s6-5.4 6-10.2A6 6 0 1 0 6 9.8C6 14.6 12 20 12 20Zm0-7.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  message: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M5 6.5h14v9H9l-4 3v-12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export function Footer() {
  const quickLinks = navLinks;

  return (
    <footer
      id="about-us"
      className="border-t border-[#d9eee6] bg-[#ecfbf4] px-4 pb-10 pt-14 text-brand sm:pt-16"
    >
      <div className="container-shell">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 md:items-start xl:grid-cols-[1.15fr_1fr_1.15fr_1.1fr]">
          <div id="contact">
            <Link href="/" className="inline-flex items-center">
              <LiktishFooterLogo />
            </Link>
            <p className="mt-5 max-w-xs text-[1rem] leading-8 text-[#547468] sm:mt-7 sm:text-[1.05rem] sm:leading-9">
              Clean Energy - Smart Investment - Reliable Power
            </p>
          </div>

          <div>
            <p className="text-[0.95rem] font-extrabold uppercase tracking-[0.14em] text-brand sm:text-[1.05rem] sm:tracking-[0.16em]">
              Quick Links
            </p>
            <nav
              className="mt-5 grid gap-4 text-[1rem] text-[#547468] sm:mt-7 sm:gap-5 sm:text-[1.05rem]"
              aria-label="Footer navigation"
            >
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-brand">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[0.95rem] font-extrabold uppercase tracking-[0.14em] text-brand sm:text-[1.05rem] sm:tracking-[0.16em]">
              Our Services
            </p>
            <nav
              className="mt-5 grid gap-4 text-[1rem] text-[#547468] sm:mt-7 sm:gap-5 sm:text-[1.05rem]"
              aria-label="Footer services"
            >
              {services.map((service) => (
                <Link key={service.slug} href="/#services" className="hover:text-brand">
                  {service.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[0.95rem] font-extrabold uppercase tracking-[0.14em] text-brand sm:text-[1.05rem] sm:tracking-[0.16em]">
              Contact Us
            </p>
            <div className="mt-5 grid gap-5 text-[1rem] text-[#547468] sm:mt-7 sm:gap-6 sm:text-[1.05rem]">
              <a
                href={`tel:${siteContact.phone.replace(/\s+/g, "")}`}
                className="flex items-start gap-4 hover:text-brand"
              >
                <span className="mt-1 inline-flex text-[#19A875]">{footerIcons.phone}</span>
                <span>{siteContact.phone}</span>
              </a>
              <a
                href={`mailto:${siteContact.email}`}
                className="flex items-start gap-4 hover:text-brand"
              >
                <span className="mt-1 inline-flex text-[#19A875]">{footerIcons.mail}</span>
                <span>{siteContact.email}</span>
              </a>
              <p className="flex items-start gap-4">
                <span className="mt-1 inline-flex text-[#19A875]">{footerIcons.location}</span>
                <span>BU368, Snooker Avenue, Adientem - Takoradi</span>
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-4 sm:mt-8">
              {[
                {
                  href: siteContact.whatsapp,
                  icon: footerIcons.message,
                  label: "WhatsApp",
                },
                {
                  href: `mailto:${siteContact.email}`,
                  icon: footerIcons.mail,
                  label: "Email",
                },
                {
                  href: `tel:${siteContact.phone.replace(/\s+/g, "")}`,
                  icon: footerIcons.phone,
                  label: "Call",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#cfe8dc] bg-white/82 text-[#19A875] shadow-[0_10px_24px_rgba(11,33,25,0.06)] hover:border-[#19A875]"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#cfe8dc] pt-8 text-sm text-[#7a9589] md:mt-14 md:flex-row md:items-center md:justify-between">
          <p>(c) 2026 LIKTISH Engineering. All rights reserved.</p>
          <div className="flex flex-wrap gap-5 uppercase tracking-[0.12em] sm:gap-8 sm:tracking-[0.14em]">
            <Link href="/privacy" className="hover:text-brand">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
