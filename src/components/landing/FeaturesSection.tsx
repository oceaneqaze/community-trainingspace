
import React from 'react';
import { Rocket, Star, MessageSquare } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
      {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5 text-primary" })}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Une communauté privée pour créer du contenu viral avec l'intelligence artificielle
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Rocket />}
              title="Automatisation IA"
              description="Automatise ta création de contenu avec l'IA"
            />
            <FeatureCard
              icon={<Star />}
              title="Contenu Quotidien"
              description="Publie tous les jours sans y passer 3h"
            />
            <FeatureCard
              icon={<MessageSquare />}
              title="Multi-Format"
              description="Crée des posts, vidéos, images IA à la chaîne"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
