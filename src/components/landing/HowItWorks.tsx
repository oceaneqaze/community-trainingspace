
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();
  
  const criteria = [
    "🔹 Tu veux tout centraliser (clients, contenus, automatisation, ventes).",
    "🔹 Tu veux arrêter de payer des outils que tu ne maîtrises pas.",
    "🔹 Tu veux apprendre avec des vrais humains (pas juste des replays)."
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
            🚫 Si tu veux juste "voir ce que ça donne"... passe ton chemin
          </h2>
          
          <div className="bg-card p-8 rounded-xl mb-8 text-center">
            <p className="text-lg mb-4">On ne vend pas du rêve.</p>
            <p className="text-lg mb-4">Tu n'auras pas 10K en 10 jours.</p>
            <p className="text-lg font-semibold text-primary">
              Mais tu vas récupérer ton temps, ton focus, et une stratégie qui rapporte vraiment.
            </p>
          </div>
          
          <div className="mb-8">
            <p className="text-xl font-semibold text-center mb-6">DOPE Content, c'est pour toi si :</p>
            <div className="space-y-4">
              {criteria.map((criterion, index) => (
                <div key={index} className="flex items-start gap-3 text-lg">
                  <span className="mt-1">{criterion.split(' ')[0]}</span>
                  <span>{criterion.substring(2)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-primary/10 p-6 rounded-xl text-center mb-8">
            <p className="text-lg font-semibold mb-2">Et surtout :</p>
            <p className="text-xl font-bold text-primary">
              🔹 Tu veux une activité qui tourne, même quand toi tu te reposes.
            </p>
          </div>

          <div className="text-center space-y-6">
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">📉 Tarification simple, accès intelligent</h3>
              <p className="text-lg mb-4">DOPE Content n'est pas une formation à 200 000 FCFA. Ni un abonnement piège.</p>
              <p className="text-xl mb-4">Tu accèdes à tout pour : <span className="text-2xl font-bold text-primary">15 000 FCFA une fois.</span></p>
              <p className="text-lg font-semibold text-green-600">🎁 Et tu restes membre à vie.</p>
              <p className="text-sm text-muted-foreground">Même quand le prix montera. Et crois-moi, il montera.</p>
            </div>
            
            <Button onClick={() => navigate('/payment')} size="lg" className="group text-lg px-8 py-4">
              📘 Rejoindre DOPE Content maintenant
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <p className="text-lg font-semibold text-primary">
              🚀 Si tu veux une stratégie claire.<br />
              📊 Si tu veux des outils simples, puissants, adaptés à ton niveau.<br />
              📁 Si tu veux éviter les pertes de temps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
