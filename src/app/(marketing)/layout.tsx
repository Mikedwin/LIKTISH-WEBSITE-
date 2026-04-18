import type { ReactNode } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { FloatingWhatsAppButton } from "@/components/shared/floating-whatsapp-button";
import { CookieBanner } from "@/components/shared/cookie-banner";
import { LocalBusinessSchema } from "@/components/shared/local-business-schema";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <LocalBusinessSchema />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsAppButton />
      <CookieBanner />
    </div>
  );
}
