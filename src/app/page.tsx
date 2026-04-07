import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import MythsSection from "@/components/MythsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import FeaturesSection from "@/components/FeaturesSection";
import InstructorsSection from "@/components/InstructorsSection";
import ProgramSection from "@/components/ProgramSection";
import DifferentiatorsSection from "@/components/DifferentiatorsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InvestmentSection from "@/components/InvestmentSection";
import FaqSection from "@/components/FaqSection";
import FacaParteSection from "@/components/FacaParteSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <TestimonialsSection />
        <BeforeAfterSection />
        <DifferentiatorsSection />
        <ProgramSection />
        <InstructorsSection />
        <InvestmentSection />
        <MythsSection />
        <FaqSection />
        <LocationSection />
        <FacaParteSection />
      </main>
      <Footer />
    </>
  );
}
