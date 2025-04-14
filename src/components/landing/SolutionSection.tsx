
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Users, BarChart3, ShieldCheck, Lightbulb } from 'lucide-react';

interface SolutionSectionProps {
  onClickCTA: () => void;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ onClickCTA }) => {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-accent/10 to-background">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-3xl font-bold text-primary mb-4 flex items-center">
              <Lightbulb className="h-6 w-6 mr-2" /> LA SOLUTION
            </h2>
            
            <div className="mb-8 text-center">
              <p className="text-2xl font-bold mb-2">Et si je te disais que tu peux arrêter de galérer dès aujourd'hui ?</p>
              <p className="text-xl">
                Que tu peux transformer cette frustration en une machine à contenu qui travaille pour toi, presque toute seule ?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card p-5 rounded-lg border border-primary/30">
                <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                  <Zap className="h-5 w-5 text-primary" />
                  20 vidéos pratiques
                </h3>
                <p>
                  Courtes, simples et directement applicables pour utiliser l'IA comme un pro.
                </p>
              </div>
              <div className="bg-card p-5 rounded-lg border border-primary/30">
                <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                  <Users className="h-5 w-5 text-primary" />
                  Clonage IA de ton style
                </h3>
                <p>
                  Ton écriture, tes images, ta voix – l'IA apprend à être toi et crée à ta place.
                </p>
              </div>
              <div className="bg-card p-5 rounded-lg border border-primary/30">
                <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Résultats en quelques jours
                </h3>
                <p>
                  Pas dans un mois ou un an. Tu commences à voir la différence immédiatement.
                </p>
              </div>
              <div className="bg-card p-5 rounded-lg border border-primary/30">
                <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Méthode testée sur le terrain
                </h3>
                <p>
                  Pas de théorie inutile, uniquement ce qui fonctionne vraiment pour ton business.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg mb-6">
                Avec ma formation "DOPE CONTENT", je te donne mes raccourcis exacts, ceux que j'ai testés dans mon propre business, pour créer des posts, des vidéos, des visuels qui claquent – sans page blanche, sans stress.
              </p>
              
              <Button 
                onClick={onClickCTA} 
                className="tech-button text-lg font-bold animate-pulse"
                size="lg"
              >
                Découvre comment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
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
