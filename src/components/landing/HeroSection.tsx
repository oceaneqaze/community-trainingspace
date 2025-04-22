
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  onJoinNow: () => void;
  onHaveCode: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onJoinNow, onHaveCode }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
      
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/347dd03e-3062-4338-a4e0-9e2f7d758561.png" 
          alt="VR Experience" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 z-20" 
        style={{
          backgroundImage: 'linear-gradient(rgba(13, 12, 34, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 12, 34, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-30 container mx-auto px-4 py-12 md:py-24 flex flex-col justify-center min-h-[90vh]">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              STEP INTO THE
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
              FUTURE
            </span>
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <p className="text-3xl font-bold text-white mb-2">98%</p>
              <p className="text-sm text-gray-300">Positive Feedback</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <p className="text-3xl font-bold text-white mb-2">5000+</p>
              <p className="text-sm text-gray-300">Virtual Environments</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <p className="text-3xl font-bold text-white mb-2">1000+</p>
              <p className="text-sm text-gray-300">Satisfied Users</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              onClick={onJoinNow}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-6 px-8"
              size={isMobile ? "default" : "lg"}
            >
              Sign Up
            </Button>
            <Button 
              onClick={onHaveCode}
              variant="outline" 
              className="border-2 text-lg py-6 px-8 hover:bg-white/10"
              size={isMobile ? "default" : "lg"}
            >
              Sign Up
            </Button>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 max-w-lg">
            <h2 className="text-xl font-bold mb-2">Immersive VR Experiences Await</h2>
            <p className="text-gray-300">
              Get ready to dive into worlds beyond imagination with our immersive VR experiences. From breathtaking environments to interactive adventures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
