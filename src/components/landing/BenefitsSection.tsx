
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const BenefitsSection = () => {
  const navigate = useNavigate();
  
  const communityFeatures = [
    "🌐 Un espace privé (pas un Slack anonyme) avec entraide, feedback, partages de systèmes.",
    "📅 Des rendez-vous mensuels (live, replay, challenges thématiques).",
    "📄 Des templates prêts à l'emploi pour automatiser en quelques clics.",
    "🪜 Des tutos sans blabla, et des études de cas concrets.",
    "🧬 Des experts qui te guident pas à pas (et qui utilisent eux-mêmes l'IA au quotidien)."
  ];

  const fourWeeksResults = [
    "Avoir un funnel automatisé de A à Z avec emails, paiements, relances, support.",
    "Gérer ton SAV avec un chatbot intelligent relié à WhatsApp.",
    "Poster automatiquement ton contenu avec repurposing IA.",
    "Récupérer des leads sans lever le petit doigt.",
    "Closer des ventes en dormant. Littéralement."
  ];

  const accessContent = [
    "🌊 Le Hub DOPE : base de connaissances IA + automatisation",
    "🏋️ Templates IA : prompts pour contenus, relances, closing, funnels",
    "📖 Fiches pratiques : \"que faire\" + \"comment faire\" pour chaque outil",
    "🕊️ Accès à la communauté (support + retours d'expérience)",
    "📲 Notifications des MAJ, lives, ressources nouvelles chaque semaine"
  ];

  return (
    <section className="py-16 bg-card/50">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Community Section */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
              🤖 Une communauté IA 100% orientée résultats
            </h2>
            <div className="bg-card p-6 rounded-xl mb-6">
              <p className="text-lg mb-4">
                Tu veux des réponses concrètes.<br />
                Tu veux implémenter maintenant.<br />
                Tu veux éviter les pièges que d'autres ont déjà rencontré.
              </p>
              <p className="font-semibold text-primary">DOPE Content, c'est :</p>
            </div>
            <div className="space-y-4">
              {communityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="mt-1">{feature.split(' ')[0]}</span>
                  <span>{feature.substring(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Different Section */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
              ✨ Pourquoi c'est différent (et mieux)
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-card p-6 rounded-lg">
                <p className="font-semibold mb-2">🔹 Ce n'est pas une formation.</p>
                <p className="text-sm text-muted-foreground">C'est un système vivant qui évolue avec les outils, les tendances et les besoins de la communauté.</p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <p className="font-semibold mb-2">🔹 Ce n'est pas un groupe Facebook désert.</p>
                <p className="text-sm text-muted-foreground">C'est un espace actif avec des entrepreneurs ambitieux et solidaires.</p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <p className="font-semibold mb-2">🔹 Ce n'est pas un pack de PDF à lire.</p>
                <p className="text-sm text-muted-foreground">C'est de la mise en pratique, des templates actionnables, de l'accompagnement.</p>
              </div>
            </div>
          </div>

          {/* 4 Weeks Results */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
              🚀 En 4 semaines, tu peux :
            </h2>
            <div className="space-y-4 mb-6">
              {fourWeeksResults.map((result, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-card rounded-lg">
                  <span className="text-green-500 text-xl">•</span>
                  <span>{result}</span>
                </div>
              ))}
            </div>
            <div className="bg-primary/10 p-6 rounded-xl">
              <p className="text-lg mb-2">💸 Tu ne vends pas de formation ?</p>
              <p className="mb-2">Tu proposes des services ? des produits ?</p>
              <p className="font-semibold">Pas de souci. Les mêmes méthodes s'adaptent à <strong>tous les modèles</strong>.</p>
            </div>
          </div>

          {/* Access Content */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
              🎓 Ce que tu reçois en accès immédiat
            </h2>
            <div className="space-y-4 mb-6">
              {accessContent.map((content, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-primary">{content.split(' ')[0]}</span>
                  <span>{content.substring(2)}</span>
                </div>
              ))}
            </div>
            <div className="bg-yellow-500/10 p-4 rounded-lg">
              <p className="font-semibold text-yellow-600">Bonus :</p>
              <p>🎯 Des mini-formations surprises, des masterclass, des systèmes partagés en exclusivité.</p>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={() => navigate('/payment')} size="lg" className="group text-lg px-8 py-4">
              🚀 Rejoindre maintenant (15 000 FCFA)
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
