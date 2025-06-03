
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModernButton from '@/components/ui/modern-button';
import ModernCard from '@/components/ui/modern-card';
import { ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();
  
  const criteria = [
    "🔹 Tu veux tout centraliser (clients, contenus, automatisation, ventes).",
    "🔹 Tu veux arrêter de payer des outils que tu ne maîtrises pas.",
    "🔹 Tu veux apprendre avec des vrais humains (pas juste des replays)."
  ];

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-white">
            🚫 Si tu veux juste "voir ce que ça donne"... <span className="text-gradient-multi">passe ton chemin</span>
          </h2>
          
          <ModernCard variant="glass" className="p-8 mb-8 text-center" glow="pink">
            <p className="text-lg mb-4 text-gray-300">On ne vend pas du rêve.</p>
            <p className="text-lg mb-4 text-gray-300">Tu n'auras pas 10K en 10 jours.</p>
            <p className="text-lg font-semibold text-gradient-purple">
              Mais tu vas récupérer ton temps, ton focus, et une stratégie qui rapporte vraiment.
            </p>
          </ModernCard>
          
          <div className="mb-8">
            <p className="text-xl font-semibold text-center mb-6 text-white">DOPE Content, c'est pour toi si :</p>
            <div className="space-y-4">
              {criteria.map((criterion, index) => (
                <ModernCard key={index} variant="glass" className="p-4 hover-lift">
                  <div className="flex items-start gap-3 text-lg">
                    <span className="mt-1 text-purple-400">{criterion.split(' ')[0]}</span>
                    <span className="text-gray-300">{criterion.substring(2)}</span>
                  </div>
                </ModernCard>
              ))}
            </div>
          </div>
          
          <ModernCard variant="gradient" className="p-6 text-center mb-8" glow="blue">
            <p className="text-lg font-semibold mb-2 text-white">Et surtout :</p>
            <p className="text-xl font-bold text-gradient-multi">
              🔹 Tu veux une activité qui tourne, même quand toi tu te reposes.
            </p>
          </ModernCard>

          <div className="text-center space-y-6">
            <ModernCard variant="glass" className="p-6" glow="purple">
              <h3 className="text-2xl font-bold mb-4 text-white">📉 Tarification simple, accès intelligent</h3>
              <p className="text-lg mb-4 text-gray-300">DOPE Content n'est pas une formation à 200 000 FCFA. Ni un abonnement piège.</p>
              <p className="text-xl mb-4 text-gray-300">Tu accèdes à tout pour : <span className="text-2xl font-bold text-gradient-purple">15 000 FCFA une fois.</span></p>
              <p className="text-lg font-semibold text-green-400">🎁 Et tu restes membre à vie.</p>
              <p className="text-sm text-gray-400">Même quand le prix montera. Et crois-moi, il montera.</p>
            </ModernCard>
            
            <ModernButton 
              variant="gradient" 
              glow={true} 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => navigate('/payment')}
            >
              📘 Rejoindre DOPE Content maintenant
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ModernButton>
            
            <ModernCard variant="gradient" className="p-4" glow="pink">
              <p className="text-lg font-semibold text-white">
                🚀 Si tu veux une stratégie claire.<br />
                📊 Si tu veux des outils simples, puissants, adaptés à ton niveau.<br />
                📁 Si tu veux éviter les pertes de temps.
              </p>
            </ModernCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
