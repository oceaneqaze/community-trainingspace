
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
    <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Main headline - massive typography */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold tracking-tight text-foreground mb-6 leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CLONE-TOI AVEC L'IA.<br/>
            <span className="text-white">CRÉE DU CONTENU NON-STOP.</span><br/>
            <span className="text-primary animate-pulse">DEVIENS INARRÊTABLE.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl lg:text-[40px] text-muted-foreground font-light leading-tight mb-8 mt-4">
            Pas d'idées, pas le temps, pas de stratégie ?<br/>
            <span className="font-semibold text-white">Transforme-toi en machine à contenu en 30 jours.</span>
          </p>
          
          {/* BLOC 1: URGENCE & COMPTE À REBOURS */}
          <Card className="mb-10 border-destructive/50 bg-card/90 shadow-lg tech-border">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-destructive mb-4">🕒 URGENCE & COMPTE À REBOURS</h2>
              
              <div className="mb-4 text-lg sm:text-xl font-bold">
                ⏱️ Offre spéciale DOPE CONTENT expire dans: 
                <div className="flex justify-center gap-2 mt-2">
                  <span className="bg-destructive text-white px-3 py-1 rounded-md">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-xl">:</span>
                  <span className="bg-destructive text-white px-3 py-1 rounded-md">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-xl">:</span>
                  <span className="bg-destructive text-white px-3 py-1 rounded-md">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
              </div>
              
              <blockquote className="border-l-4 border-destructive pl-4 py-2 mb-4">
                <p className="mb-2"><span className="text-destructive font-bold">💥</span> <strong>Prix actuel : 15.000 FCFA – paiement unique</strong></p>
                <p className="mb-2"><span className="text-destructive font-bold">🔒</span> <strong>Accès sécurisé via code admin UNIQUE (1 seul accès par personne)</strong></p>
                <p className="mb-2"><span className="text-destructive font-bold">🎁</span> <strong>Bonus offerts aux 100 premiers uniquement</strong></p>
                <p><span className="text-destructive font-bold">🚫</span> Après ? Le prix monte et les bonus disparaissent.</p>
              </blockquote>
              
              <p className="text-sm md:text-base mb-4">
                Imagine un instant : tu as une chance unique de transformer ta manière de créer du contenu, de devenir une machine à attirer des clients, mais cette opportunité a une limite. Ce compte à rebours, là, juste au-dessus, c'est le temps qu'il te reste pour saisir cette formation à un prix ridicule de 15.000 FCFA.
              </p>
              
              <p className="mb-2">Dès que tu payes, tu reçois un <strong>code confidentiel d'accès</strong>.</p>
              <p className="mb-2">Ce code est <strong>unique, valable une seule fois</strong>.</p>
              <p className="mb-2">C'est lui qui débloque <strong>l'inscription à la plateforme</strong>.</p>
              <p className="mb-4"><strong>Pas de double usage. Pas de partage. Pas de triche.</strong></p>
              
              <p className="font-bold">Tu veux cette clé ? Bouge avant que le timer ne tombe.</p>
            </CardContent>
          </Card>
          
          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button 
              onClick={onJoinNow} 
              className="tech-button text-lg shadow-md hover:shadow-lg transition-all" 
              size="lg"
            >
              Obtenir mon code d'accès
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={onHaveCode} 
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/20"
            >
              J'ai déjà un code
            </Button>
          </div>
        </div>
        
        {/* Video/Image preview */}
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm shadow-xl mx-auto max-w-4xl">
          <div className="aspect-video w-full">
            <img 
              src="/lovable-uploads/0cc014bc-d4f7-4cba-9002-f23dfd3daf89.png" 
              alt="DOPE CONTENT Preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <div className="text-center p-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Salut, moi c'est Emma-Alk</h3>
                <p className="text-white text-lg mb-4">
                  Il y a encore 2 ans, j'étais comme toi : zéro idée, zéro temps, et mes contenus ne décollaient pas.
                  Aujourd'hui, je crée des posts qui buzzent, des vidéos qui captivent, et des clients qui affluent.
                </p>
                <p className="text-primary text-xl font-bold">
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
