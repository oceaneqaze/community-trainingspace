
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Video, CircleDot, Minus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface BenefitsSectionProps {
  onClickCTA: () => void;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onClickCTA }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-background/80 to-background">
      <div className="mx-auto max-w-5xl px-3 md:px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-primary mb-4 sm:mb-6 flex items-center">
              <Video className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> CE QUE TU VAS RECEVOIR
            </h2>
            
            <ul className="list-none space-y-3 sm:space-y-4 mb-4 sm:mb-8">
              <li className="flex items-start bg-card/50 p-3 sm:p-4 rounded-lg border border-primary/20 shadow-sm">
                <span className="mr-2 sm:mr-3 text-primary mt-0.5 sm:mt-1"><CircleDot className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span>
                <div>
                  <h3 className="font-bold mb-0.5 sm:mb-1 text-sm sm:text-base">Crée des posts et vidéos non-stop sans jamais bloquer</h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">
                    Tu te réveilles, tu lances l'IA avec mes prompts, et en 20 minutes, t'as un contenu qui accroche – fini les heures perdues.
                  </p>
                </div>
              </li>
              <li className="flex items-start bg-card/50 p-3 sm:p-4 rounded-lg border border-primary/20 shadow-sm">
                <span className="mr-2 sm:mr-3 text-primary mt-0.5 sm:mt-1"><CircleDot className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span>
                <div>
                  <h3 className="font-bold mb-0.5 sm:mb-1 text-sm sm:text-base">Attire des clients avec un contenu qui claque</h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">
                    Tes posts deviennent magnétiques, tes vidéos captivent, et tes prospects te contactent direct.
                  </p>
                </div>
              </li>
              <li className="flex items-start bg-card/50 p-3 sm:p-4 rounded-lg border border-primary/20 shadow-sm">
                <span className="mr-2 sm:mr-3 text-primary mt-0.5 sm:mt-1"><CircleDot className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span>
                <div>
                  <h3 className="font-bold mb-0.5 sm:mb-1 text-sm sm:text-base">Booste ta notoriété dans ta niche dès le 1er mois</h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">
                    Plus tu produis, plus on te voit – et en 30 jours, tu deviens LA référence qu'on suit.
                  </p>
                </div>
              </li>
              <li className="flex items-start bg-card/50 p-3 sm:p-4 rounded-lg border border-primary/20 shadow-sm">
                <span className="mr-2 sm:mr-3 text-primary mt-0.5 sm:mt-1"><CircleDot className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span>
                <div>
                  <h3 className="font-bold mb-0.5 sm:mb-1 text-sm sm:text-base">Dis adieu à la page blanche pour toujours</h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">
                    Avec l'IA qui te clone, les idées coulent à flots, et t'es jamais à court.
                  </p>
                </div>
              </li>
            </ul>
            
            <ul className="list-none space-y-1.5 sm:space-y-3 mb-3 sm:mb-6 grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 text-[10px] sm:text-sm">
              <li className="flex items-start">
                <span className="mr-1.5 sm:mr-2 text-primary mt-0.5 sm:mt-1"><Minus className="h-3 w-3 sm:h-4 sm:w-4" /></span>
                <span>20 vidéos détaillées</span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 sm:mr-2 text-primary mt-0.5 sm:mt-1"><Minus className="h-3 w-3 sm:h-4 sm:w-4" /></span>
                <span>Des systèmes de clonage IA de ton style</span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 sm:mr-2 text-primary mt-0.5 sm:mt-1"><Minus className="h-3 w-3 sm:h-4 sm:w-4" /></span>
                <span>Des prompts prêts à l'emploi</span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 sm:mr-2 text-primary mt-0.5 sm:mt-1"><Minus className="h-3 w-3 sm:h-4 sm:w-4" /></span>
                <span>Des générateurs d'images réalistes IA</span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 sm:mr-2 text-primary mt-0.5 sm:mt-1"><Minus className="h-3 w-3 sm:h-4 sm:w-4" /></span>
                <span>Des stratégies de contenu prêtes à publier</span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 sm:mr-2 text-primary mt-0.5 sm:mt-1"><Minus className="h-3 w-3 sm:h-4 sm:w-4" /></span>
                <span>Et surtout : <strong>l'accès à vie</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 sm:mr-2 text-primary mt-0.5 sm:mt-1 font-bold">+</span>
                <span><strong>Mises à jour gratuites pour toujours</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 sm:mr-2 text-primary mt-0.5 sm:mt-1 font-bold">+</span>
                <span><strong>Ton code d'accès sécurisé</strong></span>
              </li>
            </ul>
            
            <div className="text-center mt-4 sm:mt-6">
              <p className="text-xs sm:text-base md:text-lg mb-2 sm:mb-4">
                Profite de cette méthode avant qu'elle ne soit hors de prix. À 15.000 FCFA, c'est un cadeau!
              </p>
              <Button 
                onClick={onClickCTA}
                className="tech-button text-xs sm:text-base md:text-lg shadow-lg w-full sm:w-auto"
                size={isMobile ? "default" : "lg"}
              >
                Je veux ces avantages
                <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BenefitsSection;
