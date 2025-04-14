
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface PricingSectionProps {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  onClickCTA: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ timeLeft, onClickCTA }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-12 sm:py-16 bg-card/30">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">💸 PRIX</h2>
            
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/30 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold">🔐 Paiement unique :</h3>
                  <p className="text-sm text-muted-foreground">Valeur réelle : 65.000 FCFA</p>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-primary animate-pulse">
                  15.000 FCFA
                </div>
              </div>
              
              <div className="flex justify-center items-center gap-3 mb-4">
                <span className="text-sm text-muted-foreground">Offre expire dans :</span>
                <div className="flex items-center gap-1">
                  <span className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span>:</span>
                  <span className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span>:</span>
                  <span className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
              </div>
              
              <p className="text-center text-sm mb-6">
                Je limite ça à 100 places. Pourquoi ? Parce que je veux bosser avec des gens sérieux, pas une foule.
              </p>
              
              <ul className="list-none space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="mr-2 text-primary mt-1">➡️</span>
                  <span>Reçois <strong>ton code privé</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary mt-1">➡️</span>
                  <span>Inscris-toi <strong>une seule fois</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary mt-1">➡️</span>
                  <span>Accès à vie</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary mt-1">➡️</span>
                  <span>Aucun abonnement, <strong>rien d'autre à payer</strong></span>
                </li>
              </ul>
              
              <div className="text-center">
                <Button 
                  onClick={onClickCTA}
                  className={`bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto ${isMobile ? 'py-3 px-5 text-base' : 'py-4 px-8 text-lg'}`}
                  size={isMobile ? "default" : "lg"}
                >
                  Sécuriser ma place maintenant
                </Button>
              </div>
            </div>
            
            <p className="text-center text-sm text-muted-foreground">
              Une fois ces 100 places prises – ou quand ce timer s'arrête – le prix passe à 30.000 FCFA, et les bonus s'envolent.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingSection;
