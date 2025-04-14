
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface FinalCTAProps {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  onClickCTA: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ timeLeft, onClickCTA }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-8 sm:py-12 bg-primary/10">
      <div className="mx-auto max-w-5xl px-3 md:px-4 lg:px-8">
        <Card className="border-primary shadow-lg bg-card">
          <CardContent className="p-4 sm:p-6 md:p-8 text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">🚀 L'HEURE DE LA DÉCISION</h2>
            
            <p className="text-base sm:text-lg font-bold mb-2">
              <strong>Tu es prêt à révolutionner ton approche du contenu digital?</strong>
            </p>
            <p className="text-base sm:text-lg font-bold mb-4 sm:mb-6">
              <strong>Tu veux recevoir ton code d'accès personnel maintenant?</strong>
            </p>
            
            <blockquote className="border-l-4 border-primary pl-3 sm:pl-4 py-1 sm:py-2 mb-4 sm:mb-8 inline-block text-left text-sm sm:text-base">
              <p className="mb-2">
                <span className="text-primary font-bold">💰</span> <strong>Investissement unique : 15.000 FCFA seulement</strong>
              </p>
              <p>
                <span className="text-primary font-bold">🔐</span> <strong>Une opportunité, un code, un accès — aucune seconde chance</strong>
              </p>
            </blockquote>
            
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-muted-foreground">Offre se termine dans :</span>
              <div className="flex items-center gap-1">
                <span className="bg-destructive/80 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-destructive/80 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-destructive/80 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>
            
            <Button 
              onClick={onClickCTA}
              className={`bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all animate-pulse w-full sm:w-auto ${isMobile ? 'py-3 px-5 text-sm' : 'py-4 px-8 text-lg'}`}
              size={isMobile ? "default" : "lg"}
            >
              👉 J'investis maintenant et transforme mon contenu pour toujours
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FinalCTA;
