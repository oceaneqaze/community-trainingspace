
import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProblemSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Tu veux créer du contenu, mais tu manques de temps, d'idées ou de méthode ?
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p className="flex items-center gap-2 justify-center">
              <ArrowRight className="h-5 w-5 text-primary" /> Tu bloques devant ChatGPT sans savoir quoi lui demander.
            </p>
            <p className="flex items-center gap-2 justify-center">
              <ArrowRight className="h-5 w-5 text-primary" /> Tu veux vendre tes offres, mais personne ne clique.
            </p>
            <p className="flex items-center gap-2 justify-center">
              <ArrowRight className="h-5 w-5 text-primary" /> Tu veux publier chaque jour, mais t'es à sec après 3 posts.
            </p>
            <p className="mt-8 font-semibold text-foreground">
              Tu n'as pas besoin d'une autre formation. Tu as besoin d'un système et d'un entourage qui t'élèvent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
