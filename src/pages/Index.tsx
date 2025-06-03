
import React from 'react';
import ModernBackground from '@/components/ui/modern-background';
import HeroSection from '@/components/landing/HeroSection';
import CommunityPreview from '@/components/landing/CommunityPreview';
import ProblemSection from '@/components/landing/ProblemSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import HowItWorks from '@/components/landing/HowItWorks';
import FAQ from '@/components/landing/FAQ';
import FinalCTA from '@/components/landing/FinalCTA';

const Index = () => {
  return (
    <ModernBackground variant="default">
      <HeroSection />
      <CommunityPreview />
      <ProblemSection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
    </ModernBackground>
  );
};

export default Index;
