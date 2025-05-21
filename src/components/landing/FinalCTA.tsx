
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-primary/5">
      <div className="px-2 sm:container sm:px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Tu veux automatiser ton contenu ou galérer encore 6 mois ?
          </h2>
          <div className="space-y-4">
            <p className="text-lg">DOPE Content, c'est ton raccourci.</p>
            <p className="text-lg">Ta machine à créer du contenu.</p>
            <p className="text-lg">Ton arme pour vendre avec l'IA.</p>
            <p className="text-lg">Ta team de créateurs déterminés.</p>
          </div>
          <p className="text-xl font-semibold">
            Le tout pour seulement 15.000 FCFA une fois.
          </p>
          <div className="space-y-4">
            <p className="text-yellow-500">🕒 Les inscriptions sont limitées. Le code est unique.</p>
            <p className="text-primary">📩 Reçois ton code d'accès privé dès maintenant.</p>
          </div>
          <Button onClick={() => navigate('/payment')} size="lg" className="mt-8 group">
            🚀 Obtenir mon accès privé (15.000 FCFA)
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
