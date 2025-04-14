import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, ShieldCheck, Lock, Gift, AlertTriangle } from 'lucide-react';
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CLONE-TOI AVEC L'IA.</span><br/>
            <span className="text-white">CRÉE DU CONTENU NON-STOP.</span><br/>
            <span className="text-primary animate-pulse">DEVIENS INARRÊTABLE.</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light leading-tight mb-10 mt-6">
            Pas d'idées, pas le temps, pas de stratégie ?<br/>
            <span className="font-semibold text-white">Transforme-toi en machine à contenu en 30 jours.</span>
          </p>
          
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
