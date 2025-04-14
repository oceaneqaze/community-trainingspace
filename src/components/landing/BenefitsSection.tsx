
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface BenefitsSectionProps {
  onClickCTA: () => void;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onClickCTA }) => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-background/80 to-background">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">📹 CE QUE TU VAS RECEVOIR</h2>
            
            <ul className="list-none space-y-4 mb-8">
              <li className="flex items-start bg-card/50 p-4 rounded-lg border border-primary/20 shadow-sm">
                <span className="mr-3 text-primary mt-1 text-xl">•</span>
                <div>
                  <h3 className="font-bold mb-1">Crée des posts et vidéos non-stop sans jamais bloquer</h3>
                  <p className="text-sm text-muted-foreground">
                    Tu te réveilles, tu lances l'IA avec mes prompts, et en 20 minutes, t'as un contenu qui accroche – fini les heures perdues.
                  </p>
                </div>
              </li>
              <li className="flex items-start bg-card/50 p-4 rounded-lg border border-primary/20 shadow-sm">
                <span className="mr-3 text-primary mt-1 text-xl">•</span>
                <div>
                  <h3 className="font-bold mb-1">Attire des clients avec un contenu qui claque</h3>
                  <p className="text-sm text-muted-foreground">
                    Tes posts deviennent magnétiques, tes vidéos captivent, et tes prospects te contactent direct.
                  </p>
                </div>
              </li>
              <li className="flex items-start bg-card/50 p-4 rounded-lg border border-primary/20 shadow-sm">
                <span className="mr-3 text-primary mt-1 text-xl">•</span>
                <div>
                  <h3 className="font-bold mb-1">Booste ta notoriété dans ta niche dès le 1er mois</h3>
                  <p className="text-sm text-muted-foreground">
                    Plus tu produis, plus on te voit – et en 30 jours, tu deviens LA référence qu'on suit.
                  </p>
                </div>
              </li>
              <li className="flex items-start bg-card/50 p-4 rounded-lg border border-primary/20 shadow-sm">
                <span className="mr-3 text-primary mt-1 text-xl">•</span>
                <div>
                  <h3 className="font-bold mb-1">Dis adieu à la page blanche pour toujours</h3>
                  <p className="text-sm text-muted-foreground">
                    Avec l'IA qui te clone, les idées coulent à flots, et t'es jamais à court.
                  </p>
                </div>
              </li>
            </ul>
            
            <ul className="list-none space-y-3 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex items-start">
                <span className="mr-2 text-primary mt-1">-</span>
                <span>20 vidéos détaillées</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary mt-1">-</span>
                <span>Des systèmes de clonage IA de ton style</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary mt-1">-</span>
                <span>Des prompts prêts à l'emploi</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary mt-1">-</span>
                <span>Des générateurs d'images réalistes IA</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary mt-1">-</span>
                <span>Des stratégies de contenu prêtes à publier</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary mt-1">-</span>
                <span>Et surtout : <strong>l'accès à vie</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary mt-1">+</span>
                <span><strong>Mises à jour gratuites pour toujours</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary mt-1">+</span>
                <span><strong>Ton code d'accès sécurisé</strong></span>
              </li>
            </ul>
            
            <div className="text-center mt-6">
              <p className="text-lg mb-4">
                Profite de cette méthode avant qu'elle ne soit hors de prix. À 15.000 FCFA, c'est un cadeau!
              </p>
              <Button 
                onClick={onClickCTA}
                className="tech-button text-lg shadow-lg"
                size="lg"
              >
                Je veux ces avantages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BenefitsSection;
