
import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import HowItWorks from '@/components/landing/HowItWorks';
import FAQ from '@/components/landing/FAQ';
import FinalCTA from '@/components/landing/FinalCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
    </div>
  );
};

export default Index;
