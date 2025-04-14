
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Users, BarChart3, ShieldCheck, Lightbulb } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SolutionSectionProps {
  onClickCTA: () => void;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ onClickCTA }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-accent/10 to-background">
      <div className="mx-auto max-w-5xl px-3 md:px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-base sm:text-xl md:text-3xl font-bold text-primary mb-3 md:mb-4 flex items-center">
              <Lightbulb className="h-4 w-4 sm:h-6 sm:w-6 mr-2" /> LA SOLUTION
            </h2>
            
            <div className="mb-4 sm:mb-8 text-center">
              <p className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Et si je te disais que tu peux arrêter de galérer dès aujourd'hui ?</p>
              <p className="text-base sm:text-lg md:text-xl">
                Que tu peux transformer cette frustration en une machine à contenu qui travaille pour toi, presque toute seule ?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mb-4 sm:mb-8">
              <div className="bg-card p-3 sm:p-5 rounded-lg border border-primary/30 text-sm sm:text-base">
                <h3 className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  20 vidéos pratiques
                </h3>
                <p className="text-xs sm:text-sm md:text-base">
                  Courtes, simples et directement applicables pour utiliser l'IA comme un pro.
                </p>
              </div>
              <div className="bg-card p-3 sm:p-5 rounded-lg border border-primary/30 text-sm sm:text-base">
                <h3 className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Clonage IA de ton style
                </h3>
                <p className="text-xs sm:text-sm md:text-base">
                  Ton écriture, tes images, ta voix – l'IA apprend à être toi et crée à ta place.
                </p>
              </div>
              <div className="bg-card p-3 sm:p-5 rounded-lg border border-primary/30 text-sm sm:text-base">
                <h3 className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Résultats en quelques jours
                </h3>
                <p className="text-xs sm:text-sm md:text-base">
                  Pas dans un mois ou un an. Tu commences à voir la différence immédiatement.
                </p>
              </div>
              <div className="bg-card p-3 sm:p-5 rounded-lg border border-primary/30 text-sm sm:text-base">
                <h3 className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Méthode testée sur le terrain
                </h3>
                <p className="text-xs sm:text-sm md:text-base">
                  Pas de théorie inutile, uniquement ce qui fonctionne vraiment pour ton business.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                Avec ma formation "DOPE CONTENT", je te donne mes raccourcis exacts, ceux que j'ai testés dans mon propre business, pour créer des posts, des vidéos, des visuels qui claquent – sans page blanche, sans stress.
              </p>
              
              <Button 
                onClick={onClickCTA} 
                className="tech-button text-sm sm:text-base md:text-lg font-bold animate-pulse w-full sm:w-auto"
                size={isMobile ? "default" : "lg"}
              >
                Découvre comment
                <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
                Cette offre, ce tarif et ces bonus s'envolent quand le timer atteint zéro.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SolutionSection;
