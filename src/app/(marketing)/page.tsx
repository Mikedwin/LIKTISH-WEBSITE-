import { CtaBanner } from "@/components/marketing/cta-banner";
import { HomepageFaqPreview } from "@/components/marketing/homepage-faq-preview";
import { HeroSection } from "@/components/marketing/hero-section";
import { ProjectsPreview } from "@/components/marketing/projects-preview";
import { ServicesOverview } from "@/components/marketing/services-overview";
import { WhyLiktishHighlights } from "@/components/marketing/why-liktish-highlights";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RevealOnScroll>
        <ServicesOverview />
      </RevealOnScroll>
      <RevealOnScroll delay={80}>
        <WhyLiktishHighlights />
      </RevealOnScroll>
      <RevealOnScroll delay={40}>
        <ProjectsPreview />
      </RevealOnScroll>
      <HomepageFaqPreview />
      <RevealOnScroll delay={60}>
        <CtaBanner />
      </RevealOnScroll>
    </>
  );
}
