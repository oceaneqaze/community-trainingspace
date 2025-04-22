
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

// Import components
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import FooterSection from '@/components/landing/FooterSection';
import CountdownTimer from '@/components/landing/CountdownTimer';

const LandingPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 47
  });

  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

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

  // Handle FAQ toggle
  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleJoinNow = () => {
    window.open('https://wa.me/22954155702', '_blank');
  };

  const handleHaveCode = () => {
    navigate('/signup');
  };
  
  const formattedTimer = `${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;
  
  return (
    <div className="min-h-full bg-gradient-to-b from-background to-background/80">
      <CountdownTimer timeLeft={timeLeft} onClickCTA={handleJoinNow} />
      
      <div className={`pt-16 ${isMobile ? 'pt-20' : 'pt-16'}`}>
        <HeroSection 
          timeLeft={timeLeft} 
          onJoinNow={handleJoinNow} 
          onHaveCode={handleHaveCode} 
        />
        
        <ProblemSection />
        
        <SolutionSection onClickCTA={handleJoinNow} />
        
        <BenefitsSection onClickCTA={handleJoinNow} />
        
        <PricingSection timeLeft={timeLeft} onClickCTA={handleJoinNow} />
        
        <FAQSection 
          expandedFaq={expandedFaq} 
          toggleFaq={toggleFaq}
          formattedTimer={formattedTimer}
        />
        
        <FooterSection formattedTimer={formattedTimer} />
      </div>
    </div>
  );
};

export default LandingPage;
