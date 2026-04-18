import { CtaBanner } from "@/components/marketing/cta-banner";
import { HeroSection } from "@/components/marketing/hero-section";
import { ProjectsPreview } from "@/components/marketing/projects-preview";
import { ServicesOverview } from "@/components/marketing/services-overview";
import { WhyLiktishHighlights } from "@/components/marketing/why-liktish-highlights";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <WhyLiktishHighlights />
      <ProjectsPreview />
      <CtaBanner />
    </>
  );
}
