
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroSectionProps {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  onJoinNow: () => void;
  onHaveCode: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ timeLeft, onJoinNow, onHaveCode }) => {
  const isMobile = useIsMobile();

  return (
    <section className="relative overflow-hidden pt-16 md:pt-28 lg:pt-32 pb-6 md:pb-16">
      {/* Background gradients and effects */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px]"></div>
      </div>

      <div className="mx-auto max-w-5xl px-3 md:px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
          <h1 className={`${isMobile ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl md:text-6xl"} font-extrabold tracking-tight mb-3 md:mb-6 bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent leading-tight`}>
            La communauté privée #1 pour créer du contenu avec l'IA
          </h1>
          
          <p className="text-base md:text-xl lg:text-2xl text-muted-foreground font-light leading-tight mb-4 md:mb-10 mt-3 md:mt-6">
            Automatise ta création de contenu, clone ton style, vends plus… sans y passer des heures.
          </p>
          
          <p className="text-base md:text-lg font-medium text-foreground/90 mb-4 md:mb-10">
            <strong>Rejoins DOPE Content pour seulement 15.000 FCFA et débloque ton code d'accès privé.</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Button 
              onClick={onJoinNow} 
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium py-3 px-6 rounded-md shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group relative overflow-hidden w-full sm:w-auto" 
              size={isMobile ? "default" : "lg"}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                🎯 Obtenir mon accès maintenant
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onHaveCode}
              size={isMobile ? "default" : "lg"}
              className="border-primary/50 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-300 w-full sm:w-auto text-sm md:text-base"
            >
              J'ai déjà un code
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
