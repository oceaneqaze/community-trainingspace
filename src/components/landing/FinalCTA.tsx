
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-primary/5">
      <div className="px-2 sm:container sm:px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            🚪 On ouvre les portes à ceux qui sont prêts à faire le travail
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg">
              <div className="text-2xl mb-2">🚀</div>
              <p className="font-semibold">Si tu veux une stratégie claire</p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <p className="font-semibold">Si tu veux des outils simples, puissants, adaptés à ton niveau</p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <div className="text-2xl mb-2">📁</div>
              <p className="font-semibold">Si tu veux éviter les pertes de temps</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-xl">
            <p className="text-xl font-bold mb-4">
              📘 Rejoins maintenant la communauté qui forme les entrepreneurs du futur.
            </p>
            <Button onClick={() => navigate('/payment')} size="lg" className="group text-lg px-8 py-4">
              🔗 Rejoindre DOPE Content maintenant
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="border-t border-border pt-8">
            <div className="space-y-4">
              <p className="text-xl font-bold">Tu veux des résultats concrets ?</p>
              <p className="text-xl font-bold">Tu veux avancer avec clarté ?</p>
              <p className="text-xl font-bold">Tu veux maîtriser l'IA et l'automatisation comme un pro ?</p>
              <p className="text-2xl font-bold text-primary mt-6">Alors rejoins DOPE Content.</p>
              <p className="text-lg font-semibold text-muted-foreground">Ton business te remerciera.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
