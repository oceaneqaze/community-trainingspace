
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FinalCTAProps {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  onClickCTA: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ timeLeft, onClickCTA }) => {
  return (
    <section className="py-12 sm:py-16 bg-primary/10">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-primary shadow-lg bg-card">
          <CardContent className="p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">🚀 L'HEURE DE LA DÉCISION</h2>
            
            <p className="text-lg font-bold mb-2">
              <strong>Tu es prêt à révolutionner ton approche du contenu digital?</strong>
            </p>
            <p className="text-lg font-bold mb-6">
              <strong>Tu veux recevoir ton code d'accès personnel maintenant?</strong>
            </p>
            
            <blockquote className="border-l-4 border-primary pl-4 py-2 mb-8 inline-block text-left">
              <p className="mb-2">
                <span className="text-primary font-bold">💰</span> <strong>Investissement unique : 15.000 FCFA seulement</strong>
              </p>
              <p>
                <span className="text-primary font-bold">🔐</span> <strong>Une opportunité, un code, un accès — aucune seconde chance</strong>
              </p>
            </blockquote>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-sm text-muted-foreground">Offre se termine dans :</span>
              <div className="flex items-center gap-1">
                <span className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-destructive/80 text-white px-2 py-1 rounded text-xs">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>
            
            <Button 
              onClick={onClickCTA}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all animate-pulse"
              size="lg"
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
