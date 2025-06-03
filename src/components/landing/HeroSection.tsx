
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Automatise ton business avec l'IA</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
            🚀 Automatise ton business avec l'IA
            <br />
            <span className="text-primary">(sans t'éparpiller)</span>
          </h1>
          
          <p className="mt-6 text-xl leading-8 text-muted-foreground mb-8">
            Rejoins <strong>DOPE Content</strong>, la communauté qui te forme à automatiser, optimiser, et scaler ton business grâce à l'intelligence artificielle.
          </p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-8">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✅</span>
                <span className="text-sm">Tu apprends à utiliser <strong>les bons outils IA</strong> (pas les plus populaires, les plus efficaces)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✅</span>
                <span className="text-sm">Tu crées un <strong>système d'automatisation solide</strong>, adapté à ton business</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✅</span>
                <span className="text-sm">Tu rejoins une <strong>communauté engagée</strong>, pas un groupe Facebook mort</span>
              </div>
            </div>
            
            <Button onClick={() => navigate('/payment')} size="lg" className="group text-lg px-8 py-6">
              🔗 Rejoindre DOPE Content maintenant
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <p className="text-primary font-semibold text-lg">
              15 000 FCFA une fois • Accès à vie • Formation continue
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
