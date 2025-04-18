
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, Users, Award, CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface BonusesSectionProps {
  formattedTimer: string;
}

const BonusesSection: React.FC<BonusesSectionProps> = ({ formattedTimer }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-3 md:px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4 flex items-center">
              <Gift className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> BONUS SI TU AGIS AVANT <span className="bg-primary/90 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm">
                {formattedTimer}
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
              <div className="border border-primary/30 rounded-lg p-3 sm:p-5 bg-card/50 hover:bg-card/80 transition-all group cursor-pointer">
                <div className="flex justify-between mb-2 sm:mb-3">
                  <h3 className="font-bold text-sm sm:text-base">Bonus 1</h3>
                  <span className="text-[10px] sm:text-xs bg-primary/20 text-primary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Valeur : 7.000 FCFA</span>
                </div>
                <h4 className="text-sm sm:text-lg font-bold mb-2 sm:mb-3">Accès à vie aux mises à jour</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  L'IA évolue, ma formation aussi. Tu reçois chaque nouvelle vidéo, chaque astuce, sans payer un centime de plus – à vie.
                </p>
                <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-2 sm:group-hover:mt-3 transition-all">
                  <Gift className="h-6 w-6 sm:h-10 sm:w-10 text-primary animate-pulse mx-auto" />
                </div>
              </div>
              
              <div className="border border-primary/30 rounded-lg p-3 sm:p-5 bg-card/50 hover:bg-card/80 transition-all group cursor-pointer">
                <div className="flex justify-between mb-2 sm:mb-3">
                  <h3 className="font-bold text-sm sm:text-base">Bonus 2</h3>
                  <span className="text-[10px] sm:text-xs bg-primary/20 text-primary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Valeur : 5.000 FCFA</span>
                </div>
                <h4 className="text-sm sm:text-lg font-bold mb-2 sm:mb-3">Communauté privée IA</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  T'es pas seul – tu rejoins un groupe de gens comme toi, qui partagent leurs idées, leurs prompts, leurs succès.
                </p>
                <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-2 sm:group-hover:mt-3 transition-all">
                  <Users className="h-6 w-6 sm:h-10 sm:w-10 text-primary animate-pulse mx-auto" />
                </div>
              </div>
              
              <div className="border border-primary/30 rounded-lg p-3 sm:p-5 bg-card/50 hover:bg-card/80 transition-all group cursor-pointer">
                <div className="flex justify-between mb-2 sm:mb-3">
                  <h3 className="font-bold text-sm sm:text-base">Bonus 3</h3>
                  <span className="text-[10px] sm:text-xs bg-primary/20 text-primary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Valeur : 3.000 FCFA</span>
                </div>
                <h4 className="text-sm sm:text-lg font-bold mb-2 sm:mb-3">Prompts premium + ChatGPT 4</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Mes prompts secrets pour des images réalistes et du contenu d'élite, plus l'accès à ChatGPT 4 sans abonnement.
                </p>
                <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-2 sm:group-hover:mt-3 transition-all">
                  <Award className="h-6 w-6 sm:h-10 sm:w-10 text-primary animate-pulse mx-auto" />
                </div>
              </div>
            </div>
            
            <ul className="list-none space-y-1 sm:space-y-2 mb-3 sm:mb-6 text-xs sm:text-sm">
              <li className="flex items-center">
                <span className="mr-2 text-green-500"><CheckCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span>
                <span>Accès à vie aux mises à jour</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500"><CheckCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span>
                <span>Accès à la communauté IA privée</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500"><CheckCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span>
                <span>Prompts premium + accès ChatGPT 4 gratuit</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500"><CheckCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span>
                <span>Et bien sûr : ton <strong>code d'accès réservé</strong>, non partageable</span>
              </li>
            </ul>
            
            <div className="bg-primary/10 p-3 sm:p-4 rounded-lg border border-primary/30 text-center">
              <p className="font-bold mb-1 sm:mb-2 text-xs sm:text-base">Ces bonus valent plus de 15.000 FCFA à eux seuls!</p>
              <p className="text-[10px] sm:text-sm">
                Mais ils disparaissent quand le timer atteint zéro. Après, tu devras te débrouiller sans.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BonusesSection;
