
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import CountdownTimer from '@/components/landing/CountdownTimer';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import AccessSection from '@/components/landing/AccessSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import PricingSection from '@/components/landing/PricingSection';
import BonusesSection from '@/components/landing/BonusesSection';
import GuaranteeSection from '@/components/landing/GuaranteeSection';
import RiskSection from '@/components/landing/RiskSection';
import SummarySection from '@/components/landing/SummarySection';
import FinalCTA from '@/components/landing/FinalCTA';
import FAQSection from '@/components/landing/FAQSection';
import FooterSection from '@/components/landing/FooterSection';
import ExitIntentDialog from '@/components/landing/ExitIntentDialog';

const LandingPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 47
  });
  
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Handle FAQ toggle
  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  
  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showExitIntent]);

  const formattedTimer = `${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;
  
  const handleJoinNow = () => {
    window.open('https://wa.me/22954155702', '_blank');
  };

  const handleHaveCode = () => {
    navigate('/invitation');
  };
  
  return (
    <div className="min-h-full bg-gradient-to-b from-background to-background/80">
      {/* Floating countdown timer - always visible */}
      <CountdownTimer timeLeft={timeLeft} onClickCTA={handleJoinNow} />
      
      {/* Main content - with padding top for the fixed timer */}
      <div className="pt-16">
        {/* SECTION 1: Hero section with headline & subheadline */}
        <HeroSection 
          timeLeft={timeLeft} 
          onJoinNow={handleJoinNow} 
          onHaveCode={handleHaveCode} 
        />
        
        {/* SECTION 2: IDENTIFICATION (The Problem) */}
        <ProblemSection />
        
        {/* SECTION 3: The Solution (The Shift) */}
        <SolutionSection onClickCTA={handleJoinNow} />
        
        {/* SECTION 4: Social Proof */}
        <TestimonialsSection />
        
        {/* SECTION 5: ACCÈS UNIQUEMENT PAR CODE (Exclusivity) */}
        <AccessSection />
        
        {/* SECTION 6: Benefits */}
        <BenefitsSection onClickCTA={handleJoinNow} />
        
        {/* SECTION 7: The Offer & Price */}
        <PricingSection timeLeft={timeLeft} onClickCTA={handleJoinNow} />
        
        {/* SECTION 8: Bonuses */}
        <BonusesSection formattedTimer={formattedTimer} />
        
        {/* SECTION 9: Guarantee */}
        <GuaranteeSection />
        
        {/* SECTION 10: ATTENTION / Risk */}
        <RiskSection />
        
        {/* SECTION 11: Summary */}
        <SummarySection />
        
        {/* SECTION 12: CTA FINAL */}
        <FinalCTA timeLeft={timeLeft} onClickCTA={handleJoinNow} />
        
        {/* SECTION 13: FAQ */}
        <FAQSection 
          expandedFaq={expandedFaq} 
          toggleFaq={toggleFaq}
          formattedTimer={formattedTimer}
        />
        
        {/* SECTION 14: PS & Contact */}
        <FooterSection formattedTimer={formattedTimer} />
      </div>
      
      {/* Exit Intent Popup */}
      <ExitIntentDialog 
        showExitIntent={showExitIntent} 
        setShowExitIntent={setShowExitIntent}
        timeLeft={timeLeft}
      />
    </div>
  );
};

export default LandingPage;
