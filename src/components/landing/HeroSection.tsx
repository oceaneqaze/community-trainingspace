
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface HeroSectionProps {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  onJoinNow: () => void;
  onHaveCode: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ timeLeft, onJoinNow, onHaveCode }) => {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-28 lg:pt-32 pb-16">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px]"></div>
      </div>

      <div className="mx-auto max-w-5xl px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Main headline - massive typography */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CLONE-TOI AVEC L'IA.</span><br/>
            <span className="text-white">CRÉE DU CONTENU NON-STOP.</span><br/>
            <span className="text-primary animate-pulse">DEVIENS INARRÊTABLE.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light leading-tight mb-10 mt-6">
            Pas d'idées, pas le temps, pas de stratégie ?<br/>
            <span className="font-semibold text-white">Transforme-toi en machine à contenu en 30 jours.</span>
          </p>
          
          {/* BLOC 1: URGENCE & COMPTE À REBOURS */}
          <Card className="mb-12 border-t border-l border-white/10 border-r border-b border-black/20 bg-gradient-to-br from-card/95 to-card/70 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-transparent to-primary/5"></div>
            <CardContent className="p-6 sm:p-8 relative">
              <h2 className="text-xl sm:text-2xl font-bold text-destructive mb-6 flex items-center">
                <span className="mr-2">🕒</span>URGENCE & COMPTE À REBOURS
              </h2>
              
              <div className="mb-6 text-lg sm:text-xl font-bold">
                <div className="flex items-center justify-center mb-3">
                  <span className="mr-2">⏱️</span> Offre spéciale DOPE CONTENT expire dans:
                </div>
                <div className="flex justify-center gap-3 mb-6">
                  <div className="bg-gradient-to-b from-destructive to-destructive/80 text-white px-4 py-2 rounded shadow-lg">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <span className="text-2xl">:</span>
                  <div className="bg-gradient-to-b from-destructive to-destructive/80 text-white px-4 py-2 rounded shadow-lg">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span className="text-2xl">:</span>
                  <div className="bg-gradient-to-b from-destructive to-destructive/80 text-white px-4 py-2 rounded shadow-lg">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 border border-white/5 rounded-lg p-6 mb-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-destructive font-bold mr-3 mt-1">💥</span> 
                    <span className="font-semibold text-lg">Prix actuel : 15.000 FCFA – paiement unique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive font-bold mr-3 mt-1">🔒</span> 
                    <span className="font-semibold text-lg">Accès sécurisé via code admin UNIQUE (1 seul accès par personne)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive font-bold mr-3 mt-1">🎁</span> 
                    <span className="font-semibold text-lg">Bonus offerts aux 100 premiers uniquement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive font-bold mr-3 mt-1">🚫</span> 
                    <span>Après ? Le prix monte et les bonus disparaissent.</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3 mb-6">
                <p className="text-lg leading-relaxed">
                  Imagine un instant : tu as une chance unique de transformer ta manière de créer du contenu, de devenir une machine à attirer des clients, mais cette opportunité a une limite. Ce compte à rebours, là, juste au-dessus, c'est le temps qu'il te reste pour saisir cette formation à un prix ridicule de 15.000 FCFA.
                </p>
                
                <p className="mb-2 text-lg">Dès que tu payes, tu reçois un <strong className="text-primary">code confidentiel d'accès</strong>.</p>
                <p className="mb-2 text-lg">Ce code est <strong className="text-primary">unique, valable une seule fois</strong>.</p>
                <p className="mb-2 text-lg">C'est lui qui débloque <strong className="text-primary">l'inscription à la plateforme</strong>.</p>
                <p className="mb-2 text-lg"><strong className="text-primary">Pas de double usage. Pas de partage. Pas de triche.</strong></p>
              </div>
              
              <div className="bg-gradient-to-r from-destructive/20 to-destructive/10 p-4 rounded-lg border border-destructive/30">
                <p className="text-xl font-bold text-center">
                  Tu veux cette clé ? Bouge avant que le timer ne tombe.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-10">
            <Button 
              onClick={onJoinNow} 
              className="pro-button text-lg group relative overflow-hidden" 
              size="lg"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                Obtenir mon code d'accès
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button 
              variant="outline" 
              onClick={onHaveCode} 
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-300"
            >
              J'ai déjà un code
            </Button>
          </div>
        </div>
        
        {/* Video/Image preview */}
        <div className="relative overflow-hidden rounded-xl pro-card backdrop-blur-sm mx-auto max-w-4xl">
          <div className="aspect-video w-full">
            <img 
              src="/lovable-uploads/b6c88338-3a6c-4e48-b5f6-accf90245eb2.png" 
              alt="Emma-Alk DOHOU" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/80 to-black/70">
              <div className="text-center p-8 max-w-3xl">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Salut, moi c'est Emma-Alk
                </h3>
                <p className="text-white text-lg leading-relaxed mb-6">
                  Il y a encore 2 ans, j'étais comme toi : zéro idée, zéro temps, et mes contenus ne décollaient pas.
                  Aujourd'hui, je crée des posts qui buzzent, des vidéos qui captivent, et des clients qui affluent.
                </p>
                <p className="text-primary text-xl font-bold bg-black/50 p-4 rounded-lg backdrop-blur-sm border border-primary/20 inline-block">
                  Comment ? L'IA. J'ai appris à me cloner avec elle, et en 20 vidéos, je te montre tout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
