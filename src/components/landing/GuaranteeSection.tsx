
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
                  Garantie "Succès Assuré" 30 jours
                </h2>
                <p className="text-lg mb-4 text-foreground/90 leading-relaxed">
                  Je comprends ton hésitation. "Et si ça ne fonctionne pas pour moi?" C'est légitime. C'est pourquoi DOPE CONTENT vient avec une garantie 100% satisfait ou remboursé pendant 30 jours complets.
                </p>
                <p className="text-lg mb-6 text-foreground/90 leading-relaxed">
                  Explore toute la formation. Applique les techniques. Utilise les prompts IA. Si tu ne vois pas ta production de contenu se transformer radicalement, envoie-moi simplement un message et je te rembourse intégralement — sans questions, sans conditions, sans délai.
                </p>
                <p className="font-bold text-xl text-primary">
                  Ton risque? Zéro. Ton potentiel? Illimité.
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
