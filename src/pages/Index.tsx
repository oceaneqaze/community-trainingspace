
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket, Star, MessageSquare, Users, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
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

      {/* Problem Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Tu veux créer du contenu, mais tu manques de temps, d'idées ou de méthode ?
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p className="flex items-center gap-2 justify-center">
                <ArrowRight className="h-5 w-5 text-primary" /> Tu bloques devant ChatGPT sans savoir quoi lui demander.
              </p>
              <p className="flex items-center gap-2 justify-center">
                <ArrowRight className="h-5 w-5 text-primary" /> Tu veux vendre tes offres, mais personne ne clique.
              </p>
              <p className="flex items-center gap-2 justify-center">
                <ArrowRight className="h-5 w-5 text-primary" /> Tu veux publier chaque jour, mais t'es à sec après 3 posts.
              </p>
              <p className="mt-8 font-semibold text-foreground">
                Tu n'as pas besoin d'une autre formation. Tu as besoin d'un système et d'un entourage qui t'élèvent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
              Ce que tu obtiens en rejoignant DOPE Content
            </h2>
            <div className="grid gap-4 text-lg">
              <BenefitItem icon={<Users />} text="Accès immédiat au serveur privé + groupe Telegram" />
              <BenefitItem icon={<BookOpen />} text="20 vidéos de formation exclusives" />
              <BenefitItem icon={<Star />} text="Prompts prêts à l'emploi pour ChatGPT, Midjourney, Claude, etc." />
              <BenefitItem icon={<MessageSquare />} text="Modèles de posts, scripts vidéos, visuels IA" />
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold mb-4">Tarif unique : 15.000 FCFA pour l'accès à vie</p>
              <Button onClick={() => navigate('/signup')} size="lg">
                🚀 Obtenir mon accès privé
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
      {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5 text-primary" })}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const BenefitItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
    {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5 text-primary flex-shrink-0" })}
    <span>{text}</span>
  </div>
);

export default Index;
