
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <img 
              src="/lovable-uploads/bb7e7daa-74a3-4cd4-8457-13ba5ae39dce.png" 
              alt="DOPE CONTENT" 
              className="h-12 w-auto"
            />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              La communauté privée #1 pour créer du contenu avec l'<span className="text-primary">IA</span>
            </h1>
          </div>
          <p className="mt-6 text-lg leading-8 text-muted-foreground mb-8">
            Automatise ta création de contenu, clone ton style, vends plus… sans y passer des heures.
            <br />
            <strong className="text-foreground">Rejoins DOPE Content pour seulement 15.000 FCFA et débloque ton code d'accès privé.</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => navigate('/signup')} size="lg" className="group">
              🎯 Obtenir mon accès maintenant
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
