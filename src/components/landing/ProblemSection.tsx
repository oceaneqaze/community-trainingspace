
import React from 'react';
import ModernCard from '@/components/ui/modern-card';

const ProblemSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-white">
            🌟 Pourquoi <span className="text-gradient-purple">DOPE Content</span> ?
          </h2>
          
          <ModernCard variant="glass" className="p-8 mb-8" glow="purple">
            <p className="text-lg leading-relaxed mb-6 text-gray-300">
              Chaque jour, tu testes un nouvel outil.<br />
              Tu passes d'un tuto YouTube à un autre.<br />
              Tu passes plus de temps à apprendre... qu'à implémenter.
            </p>
            <p className="text-2xl font-bold text-gradient-multi mb-4">Stop.</p>
            <p className="text-lg font-semibold text-white">
              DOPE Content, c'est l'antidote à la surcharge d'information.
            </p>
          </ModernCard>
          
          <div className="text-left max-w-2xl mx-auto">
            <ModernCard variant="gradient" className="p-6" glow="pink">
              <p className="text-xl font-semibold text-center text-white">
                Ici, tu ne t'égares pas. Tu avances avec clarté.
              </p>
            </ModernCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
