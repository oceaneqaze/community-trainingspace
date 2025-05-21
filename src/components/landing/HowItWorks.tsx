
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();
  
  const steps = [
    "Clique sur le bouton ci-dessous",
    "Règle les 15.000 FCFA via Mobile Money ou carte",
    "Reçois ton code d'activation unique immédiatement",
    "Crée ton compte sur notre espace privé",
    "Accède immédiatement aux formations + communauté"
  ];

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
            Comment ça marche ?
          </h2>
          <div className="space-y-4 mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-card rounded-lg">
                <span className="text-primary font-bold">{index + 1}️⃣</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold">🟢 Ton accès est valable à vie.</p>
            <p className="text-yellow-500 font-semibold">❌ Aucun remboursement. Aucune version gratuite.</p>
            <p className="text-lg">👉 Tu prends ta place ou tu restes à la traîne.</p>
            <Button onClick={() => navigate('/payment')} size="lg" className="group">
              💥 Rejoindre maintenant
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
