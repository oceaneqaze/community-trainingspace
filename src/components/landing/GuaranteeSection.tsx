
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

const GuaranteeSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background/20 to-background">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Card className="border-primary/30 bg-card/90 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <CardContent className="p-8 sm:p-10 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="h-16 w-16 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Garantie 30 jours satisfait ou remboursé
                </h2>
                <p className="text-lg mb-4 text-foreground/90 leading-relaxed">
                  Je sais ce que tu te dis peut-être : "Et si ça marche pas pour moi ?" Pas de panique. Avec "DOPE CONTENT", t'as une garantie 100 % satisfait ou remboursé sous 30 jours.
                </p>
                <p className="text-lg mb-6 text-foreground/90 leading-relaxed">
                  Tu testes tout : les vidéos, les prompts, l'IA. Tu appliques ma méthode, tu vois les résultats. Si, pour une raison folle, tu trouves que ça vaut pas le coup, tu m'écris, et je te rends chaque centime – sans questions, sans chichi.
                </p>
                <p className="font-bold text-lg text-primary">
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
