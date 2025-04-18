
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, CircleDot, CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ProblemSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-8 sm:py-12 md:py-20 bg-black/40">
      <div className="mx-auto max-w-5xl px-3 md:px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-primary mb-4 sm:mb-6 flex items-center">
              <Brain className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> LA FRUSTRATION QUE TU CONNAIS TROP BIEN
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-6">
              Tu aspires à une présence digitale dominante, à devenir incontournable dans ta niche...<br/>
              Mais tu te heurtes constamment à :
            </p>
            <ul className="list-none space-y-2 mb-3 sm:mb-6 text-sm sm:text-base">
              <li className="flex items-center">
                <span className="mr-2 text-destructive"><CircleDot className="h-4 w-4 sm:h-5 sm:w-5" /></span>
                <span>Le syndrome de la page blanche qui paralyse</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-destructive"><CircleDot className="h-4 w-4 sm:h-5 sm:w-5" /></span>
                <span>L'agenda surchargé qui t'empêche de créer</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-destructive"><CircleDot className="h-4 w-4 sm:h-5 sm:w-5" /></span>
                <span>L'absence d'une méthode systématique fiable</span>
              </li>
            </ul>
            
            <p className="font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-6">
              <strong>Et surtout : l'absence totale d'une solution qui t'éviterait d'y sacrifier tes nuits et ta santé mentale.</strong>
            </p>
            
            <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-6">
              Tu connais cette sensation démoralisante. Tu démarres ta journée avec détermination, prêt à créer du contenu d'exception pour ton entreprise, ta marque personnelle. 
              Et puis — le néant. Un vide créatif qui te nargue comme une toile inachevée.
            </p>
            
            <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-6">
              Tu perds une heure entière pour produire quelques lignes médiocres, et finalement, tu publies un contenu tiède qui récolte une poignée d'engagements — dont la moitié vient de ton cercle proche.
            </p>
            
            <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-6">
              Pendant ce temps, tes compétiteurs semblent avoir percé le code. Ils inondent le marché de contenus pertinents, vidéos captivantes, et voient leur audience — et leurs revenus — croître exponentiellement.
            </p>
            
            <div className="p-3 sm:p-4 bg-background/40 border border-destructive/30 rounded-lg mb-3 sm:mb-6 text-sm sm:text-base">
              <h3 className="font-bold text-destructive mb-2">Cette sensation d'être à la traîne te consume de l'intérieur.</h3>
              <p>
                Ce sentiment persistant d'impuissance, d'observer les autres briller tandis que ton potentiel reste invisible et inexploité.
              </p>
            </div>
            
            <p className="mb-3 sm:mb-4 text-sm sm:text-base">
              DOPE CONTENT brise définitivement ce cycle.<br/>
              Avec un accès <strong>ultra-sécurisé et exclusif</strong> :
            </p>
            
            <ul className="list-none space-y-1.5 mb-2 sm:mb-4 text-xs sm:text-sm">
              <li className="flex items-center">
                <span className="mr-2 text-green-500"><CheckCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span>
                <span>Un unique investissement pour un accès illimité</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500"><CheckCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span>
                <span>Ton code d'administrateur personnel et sécurisé</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500"><CheckCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" /></span>
                <span>Ton compte activé pour toujours — sans abonnement</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProblemSection;
