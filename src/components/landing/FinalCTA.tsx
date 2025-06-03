
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModernButton from '@/components/ui/modern-button';
import ModernCard from '@/components/ui/modern-card';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="px-2 sm:container sm:px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">
            🚪 On ouvre les portes à ceux qui sont prêts à <span className="text-gradient-purple">faire le travail</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ModernCard variant="glass" className="p-6" glow="purple">
              <div className="text-2xl mb-2">🚀</div>
              <p className="font-semibold text-white">Si tu veux une stratégie claire</p>
            </ModernCard>
            <ModernCard variant="glass" className="p-6" glow="pink">
              <div className="text-2xl mb-2">📊</div>
              <p className="font-semibold text-white">Si tu veux des outils simples, puissants, adaptés à ton niveau</p>
            </ModernCard>
            <ModernCard variant="glass" className="p-6" glow="blue">
              <div className="text-2xl mb-2">📁</div>
              <p className="font-semibold text-white">Si tu veux éviter les pertes de temps</p>
            </ModernCard>
          </div>
          
          <ModernCard variant="gradient" className="p-8" glow="purple">
            <p className="text-xl font-bold mb-4 text-white">
              📘 Rejoins maintenant la communauté qui forme les entrepreneurs du futur.
            </p>
            <ModernButton 
              variant="gradient" 
              glow={true} 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => navigate('/payment')}
            >
              🔗 Rejoindre DOPE Content maintenant
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ModernButton>
          </ModernCard>
          
          <div className="border-t border-white/10 pt-8">
            <ModernCard variant="glass" className="p-6" glow="pink">
              <div className="space-y-4">
                <p className="text-xl font-bold text-white">Tu veux des résultats concrets ?</p>
                <p className="text-xl font-bold text-white">Tu veux avancer avec clarté ?</p>
                <p className="text-xl font-bold text-white">Tu veux maîtriser l'IA et l'automatisation comme un pro ?</p>
                <p className="text-2xl font-bold text-gradient-multi mt-6">Alors rejoins DOPE Content.</p>
                <p className="text-lg font-semibold text-gray-300">Ton business te remerciera.</p>
              </div>
            </ModernCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
