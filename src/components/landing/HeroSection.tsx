
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
            La Communauté Privée #1 pour Créer du Contenu avec l'IA
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Automatise ta création de contenu, développe ton business, et vends en continu grâce à l'intelligence artificielle.
          </p>
          <p className="text-lg font-semibold mt-4 mb-6">
            Accède à DOPE Content pour seulement 15.000 FCFA et reçois ton code d'activation unique pour créer ton compte privé.
          </p>
          <div className="flex flex-col gap-4 items-center">
            <Button onClick={() => navigate('/payment')} size="lg" className="group">
              🎯 Obtenir mon accès maintenant
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-yellow-500 font-semibold">
              👉 Places limitées. Aucun accès gratuit ne sera distribué.
            </p>
            <p className="text-muted-foreground">
              📍 Communauté 100% francophone — pour créateurs, freelancers, infopreneurs, et entrepreneurs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
