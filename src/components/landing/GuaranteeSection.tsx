
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

const GuaranteeSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-card/30">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/80 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                  <ShieldCheck className="h-20 w-20 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Garantie 30 jours satisfait ou remboursé</h2>
                <p className="mb-4">
                  Je sais ce que tu te dis peut-être : "Et si ça marche pas pour moi ?" Pas de panique. Avec "DOPE CONTENT", t'as une garantie 100 % satisfait ou remboursé sous 30 jours.
                </p>
                <p className="mb-4">
                  Tu testes tout : les vidéos, les prompts, l'IA. Tu appliques ma méthode, tu vois les résultats. Si, pour une raison folle, tu trouves que ça vaut pas le coup, tu m'écris, et je te rends chaque centime – sans questions, sans chichi.
                </p>
                <p className="font-bold">
                  T'as zéro risque, parce que je crois à fond en ce que je te donne.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GuaranteeSection;
