
import React from 'react';

const ProblemSection = () => {
  const problems = [
    "Tu bloques devant ChatGPT.",
    "T'as 100 idées… mais rien de structuré.",
    "Tu perds des heures à faire des visuels moyens.",
    "Personne ne réagit à tes posts.",
    "Tu te démotives.",
    "Tu commences, tu abandonnes, tu recommences.",
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/5">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Tu veux publier du contenu, vendre tes services ou tes produits…
            <br />
            Mais chaque jour c'est la même galère :
          </h2>
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start gap-3 text-lg">
                <span className="text-primary">•</span>
                <p>{problem}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-lg font-semibold text-primary">
            👉 Tu n'as pas besoin de plus d'outils. Tu as besoin d'un système et d'un cercle qui te propulsent.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
