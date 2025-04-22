
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();
  
  const steps = [
    "Clique sur le bouton ci-dessous",
    "Règle les 15.000 FCFA via Mobile Money ou carte",
    "Reçois ton code d'activation unique par email",
    "Crée ton compte et accède à la communauté"
  ];

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
            Comment rejoindre DOPE Content ?
          </h2>
          <div className="space-y-4 mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-card rounded-lg">
                <span className="text-primary font-bold">{index + 1}️⃣</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <p className="text-lg font-semibold text-center mb-6 text-yellow-600">
            ⚠️ Attention : accès limité, aucun code gratuit ne sera distribué.
          </p>
          <div className="text-center">
            <Button onClick={() => navigate('/signup')} size="lg">
              💥 Rejoindre maintenant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
