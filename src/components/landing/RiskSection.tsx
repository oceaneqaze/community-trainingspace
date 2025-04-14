
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const RiskSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-destructive/40 bg-gradient-to-br from-card/90 to-card/70 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-destructive/10 to-transparent"></div>
          <CardContent className="p-8 sm:p-10 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <h2 className="text-2xl sm:text-3xl font-bold text-destructive">DERNIÈRE CHANCE</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-destructive/80 pl-6 py-2">
                <p className="text-lg mb-3 flex items-center">
                  <span className="text-destructive font-bold mr-2">❌</span> 
                  <span className="text-foreground/90">Ton code est personnel — le perdre, c'est perdre ton accès</span>
                </p>
                <p className="text-lg mb-3 flex items-center">
                  <span className="text-destructive font-bold mr-2">❌</span> 
                  <span className="text-foreground/90">Tout partage non autorisé = désactivation immédiate et définitive</span>
                </p>
                <p className="text-lg flex items-center">
                  <span className="text-green-500 font-bold mr-2">✅</span> 
                  <span className="text-foreground/90">Ton paiement sécurise instantanément ton code — priorité absolue</span>
                </p>
              </div>
              
              <p className="text-lg leading-relaxed">
                Quand le compteur atteindra zéro, tout change. Le prix double à 30.000 FCFA, les bonus exceptionnels disparaissent, et tu te retrouveras face à une décision que tu regretteras.
              </p>
              
              <p className="text-xl font-bold text-foreground/90 bg-destructive/10 p-4 rounded-lg border border-destructive/30">
                Pendant que tu hésites, tes concurrents progressent. Chaque jour sans cette méthode est un jour où ils prennent l'avantage.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RiskSection;
