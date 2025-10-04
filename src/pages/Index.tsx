import HeroSection from "../components/HeroSection";
import TrustSection from "../components/TrustSection";
import ProcessSection from "../components/processSection.tsx";
import CaseStudiesSection from "../components/CaseStudiesSection";
import BenefitsSection from "../components/benefitsSection";
import PricingSection from "../components/PricingSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ProcessSection />
      <CaseStudiesSection />
      <BenefitsSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Index;
