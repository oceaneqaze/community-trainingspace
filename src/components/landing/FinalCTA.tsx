
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Tu veux passer du mode "je galère" au mode "je performe" ?
          </h2>
          <p className="text-lg mb-4">
            DOPE Content, c'est bien plus qu'un groupe. C'est ta machine à créer du contenu, 
            booster ta visibilité, et vendre mieux avec l'IA.
          </p>
          <p className="text-lg font-semibold mb-8">
            💥 L'accès est privé. L'inscription se fait uniquement par code d'activation. 
            Rejoins maintenant tant qu'il reste des places !
          </p>
          <Button onClick={() => navigate('/signup')} size="lg">
            🚀 Obtenir mon accès privé (15.000 FCFA)
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
