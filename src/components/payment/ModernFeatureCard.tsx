
import React from 'react';
import { CheckCircle, Rocket } from 'lucide-react';
import ModernCard from '@/components/ui/modern-card';

const ModernFeatureCard: React.FC = () => {
  const features = [
    {
      icon: "🌊",
      title: "Le Hub DOPE :",
      description: "base de connaissances IA + automatisation complète"
    },
    {
      icon: "🏋️",
      title: "Templates IA :",
      description: "prompts pour contenus, relances, closing, funnels"
    },
    {
      icon: "📖",
      title: "Fiches pratiques :",
      description: "\"que faire\" + \"comment faire\" pour chaque outil"
    },
    {
      icon: "🕊️",
      title: "Communauté privée :",
      description: "support + retours d'expérience en temps réel"
    },
    {
      icon: "📲",
      title: "Mises à jour continues :",
      description: "nouvelles ressources chaque semaine"
    }
  ];

  return (
    <ModernCard variant="glass" className="p-8 space-y-6 animate-fade-in" glow="pink">
      <h2 className="text-2xl font-semibold flex items-center text-white">
        <Rocket className="h-6 w-6 mr-3 text-purple-400" />
        Ce que tu reçois immédiatement
      </h2>
      
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-4 group">
            <span className="text-2xl transition-transform group-hover:scale-110">
              {feature.icon}
            </span>
            <div>
              <span className="font-semibold text-white">{feature.title}</span>
              <span className="text-gray-300"> {feature.description}</span>
            </div>
          </li>
        ))}
      </ul>
      
      <ModernCard 
        variant="gradient" 
        className="p-6 border-green-500/30"
        glow="blue"
      >
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="h-6 w-6 text-green-400" />
          <span className="font-bold text-green-300 text-lg">Garantie à vie</span>
        </div>
        <p className="text-gray-300">
          🔒 Un seul paiement • Accès permanent • Toutes les mises à jour incluses
        </p>
      </ModernCard>
    </ModernCard>
  );
};

export default ModernFeatureCard;
