
import React from 'react';
import { Rocket, Zap, Users, Database } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5 text-primary" })}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const learningPoints = [
    "🔹 Créer des automatisations intelligentes avec Make, Zapier, Notion, Airtable.",
    "🔹 Créer et utiliser des agents IA (chatbots, scripts IA, closers automatisés).",
    "🔹 Gérer ton contenu, ton service client et tes ventes sans effort.",
    "🔹 Devenir stratège : ne plus subir l'IA, mais l'utiliser comme un levier de croissance."
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="px-2 sm:container sm:px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            📈 Ce que tu vas apprendre (et appliquer)
          </h2>
          
          <div className="space-y-4 mb-8">
            {learningPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3 text-lg">
                <span className="mt-1">{point.split(' ')[0]}</span>
                <p>{point.substring(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-primary/10 p-6 rounded-xl text-center">
            <p className="text-lg font-semibold mb-2">Et surtout :</p>
            <p className="text-xl font-bold text-primary">
              🔹 Construire ton système complet pour automatiser ton business sans dépendre de prestataires.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
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
