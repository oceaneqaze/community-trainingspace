
import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <BenefitsSection />
    </div>
  );
};

export default Index;
