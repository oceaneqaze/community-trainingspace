
import React from 'react';

const ProblemSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/5">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            🌟 Pourquoi DOPE Content ?
          </h2>
          
          <div className="bg-card/50 p-8 rounded-xl mb-8">
            <p className="text-lg leading-relaxed mb-6">
              Chaque jour, tu testes un nouvel outil.<br />
              Tu passes d'un tuto YouTube à un autre.<br />
              Tu passes plus de temps à apprendre... qu'à implémenter.
            </p>
            <p className="text-2xl font-bold text-primary mb-4">Stop.</p>
            <p className="text-lg font-semibold">
              DOPE Content, c'est l'antidote à la surcharge d'information.
            </p>
          </div>
          
          <div className="text-left max-w-2xl mx-auto">
            <p className="text-xl font-semibold mb-6 text-center">
              Ici, tu ne t'égares pas. Tu avances avec clarté.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
