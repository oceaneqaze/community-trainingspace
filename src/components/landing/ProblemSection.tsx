
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ProblemSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 bg-black/40">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">🧠 IDENTIFICATION</h2>
            
            <p className="text-lg mb-6">
              Tu veux publier tous les jours, être visible, dominer ta niche…<br/>
              Mais t'as :
            </p>
            <ul className="list-none space-y-3 mb-6">
              <li className="flex items-center">
                <span className="mr-2 text-destructive text-xl">•</span>
                <span className="text-lg">Pas d'idées</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-destructive text-xl">•</span>
                <span className="text-lg">Pas de temps</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-destructive text-xl">•</span>
                <span className="text-lg">Pas de méthode</span>
              </li>
            </ul>
            
            <p className="font-bold text-lg mb-6">
              <strong>Et surtout : aucune solution simple pour créer sans y passer ta vie.</strong>
            </p>
            
            <p className="text-lg mb-6">
              Tu sais ce que ça fait, hein ? Tu te lèves, motivé, prêt à créer un truc qui déchire pour ta boîte, ton business, ta marque. 
              Et puis, rien. Ton cerveau est vide, comme une page blanche qui te nargue.
            </p>
            
            <p className="text-lg mb-6">
              Tu passes une heure à écrire trois lignes pourries, et au final, tu postes un truc moyen qui fait 2 likes – dont un de ta mère.
            </p>
            
            <p className="text-lg mb-6">
              Pendant ce temps, tes concurrents, eux, balancent du contenu à tour de bras : des posts qui accrochent, des vidéos qui tournent, et des clients qui affluent.
            </p>
            
            <div className="p-4 bg-background/40 border border-destructive/30 rounded-lg mb-6">
              <h3 className="font-bold text-lg text-destructive mb-2">Cette frustration te bouffe, avoue-le.</h3>
              <p className="text-lg">
                Ce sentiment d'être à la traîne, de voir les autres briller pendant que toi, t'es invisible.
              </p>
            </div>
            
            <p className="mb-4">
              DOPE CONTENT te donne la solution.<br/>
              Et <strong>l'accès est ultra-sécurisé</strong> :
            </p>
            
            <ul className="list-none space-y-2 mb-4">
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✅</span>
                <span>Tu paies une fois</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✅</span>
                <span>Tu reçois ton code admin unique</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✅</span>
                <span>Tu actives ton compte pour toujours</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProblemSection;
