
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const RiskSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg border-destructive/50">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-destructive mb-6">🚨 ATTENTION</h2>
            
            <blockquote className="border-l-4 border-destructive pl-4 py-2 mb-6">
              <p className="mb-2">
                <span className="text-destructive font-bold">❌</span> Si tu perds ton code → tu perds l'accès
              </p>
              <p className="mb-2">
                <span className="text-destructive font-bold">❌</span> Si quelqu'un d'autre l'utilise avant toi → il sera désactivé
              </p>
              <p>
                <span className="text-green-500 font-bold">✅</span> Dès ton paiement, tu es prioritaire → ton code est réservé immédiatement
              </p>
            </blockquote>
            
            <p>
              Quand ce timer atteint zéro, cette page change. Le prix passe à 30.000 FCFA, les bonus s'envolent, et toi, tu restes là, à te demander pourquoi t'as laissé passer ça.
            </p>
            <p className="font-bold mt-4">
              Chaque jour sans cette méthode, c'est un jour où tes concurrents te doublent.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RiskSection;
