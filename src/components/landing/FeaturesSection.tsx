
import React from 'react';
import ModernCard from '@/components/ui/modern-card';
import { Rocket, Zap, Users, Database } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <ModernCard variant="glass" className="p-6 hover-lift" hover={true}>
    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 border border-purple-500/30">
      {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5 text-purple-400" })}
    </div>
    <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </ModernCard>
);

const FeaturesSection = () => {
  const learningPoints = [
    "🔹 Créer des automatisations intelligentes avec Make, Zapier, Notion, Airtable.",
    "🔹 Créer et utiliser des agents IA (chatbots, scripts IA, closers automatisés).",
    "🔹 Gérer ton contenu, ton service client et tes ventes sans effort.",
    "🔹 Devenir stratège : ne plus subir l'IA, mais l'utiliser comme un levier de croissance."
  ];

  return (
    <section className="py-16">
      <div className="px-2 sm:container sm:px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-white">
            📈 Ce que tu vas apprendre <span className="text-gradient-purple">(et appliquer)</span>
          </h2>
          
          <ModernCard variant="glass" className="p-8 mb-8" glow="blue">
            <div className="space-y-4">
              {learningPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 text-lg">
                  <span className="mt-1 text-purple-400">{point.split(' ')[0]}</span>
                  <p className="text-gray-300">{point.substring(2)}</p>
                </div>
              ))}
            </div>
          </ModernCard>
          
          <ModernCard variant="gradient" className="p-6 text-center mb-12" glow="pink">
            <p className="text-lg font-semibold mb-2 text-white">Et surtout :</p>
            <p className="text-xl font-bold text-gradient-multi">
              🔹 Construire ton système complet pour automatiser ton business sans dépendre de prestataires.
            </p>
          </ModernCard>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Rocket />}
              title="Automatisations IA"
              description="Make, Zapier, agents intelligents"
            />
            <FeatureCard
              icon={<Zap />}
              title="Systèmes complets"
              description="Funnels, SAV, contenu automatisé"
            />
            <FeatureCard
              icon={<Users />}
              title="Communauté active"
              description="Entraide, feedback, partages"
            />
            <FeatureCard
              icon={<Database />}
              title="Templates prêts"
              description="Prompts, workflows, systèmes"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
