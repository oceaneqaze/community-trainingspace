
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const RiskSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-8 sm:py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-3 md:px-4 lg:px-8">
        <Card className="border-destructive/40 bg-gradient-to-br from-card/90 to-card/70 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-destructive/10 to-transparent"></div>
          <CardContent className="p-4 sm:p-8 md:p-10 relative z-10">
            <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <AlertTriangle className="h-5 w-5 sm:h-8 sm:w-8 text-destructive" />
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-destructive">DERNIÈRE CHANCE</h2>
            </div>
            
            <div className="space-y-3 sm:space-y-6">
              <div className="border-l-4 border-destructive/80 pl-3 sm:pl-6 py-2 text-sm sm:text-base">
                <p className="mb-2 sm:mb-3 flex items-center">
                  <span className="text-destructive font-bold mr-2"><XCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span> 
                  <span className="text-foreground/90">Ton code est personnel — le perdre, c'est perdre ton accès</span>
                </p>
                <p className="mb-2 sm:mb-3 flex items-center">
                  <span className="text-destructive font-bold mr-2"><XCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span> 
                  <span className="text-foreground/90">Tout partage non autorisé = désactivation immédiate et définitive</span>
                </p>
                <p className="flex items-center">
                  <span className="text-green-500 font-bold mr-2"><CheckCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span> 
                  <span className="text-foreground/90">Ton paiement sécurise instantanément ton code — priorité absolue</span>
                </p>
              </div>
              
              <p className="text-sm sm:text-base md:text-lg leading-tight sm:leading-relaxed">
                Quand le compteur atteindra zéro, tout change. Le prix double à 30.000 FCFA, les bonus exceptionnels disparaissent, et tu te retrouveras face à une décision que tu regretteras.
              </p>
              
              <p className="text-base sm:text-lg md:text-xl font-bold text-foreground/90 bg-destructive/10 p-3 sm:p-4 rounded-lg border border-destructive/30">
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
