
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModernButton from '@/components/ui/modern-button';
import ModernCard from '@/components/ui/modern-card';
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
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Community Section */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-white">
              🤖 Une communauté IA <span className="text-gradient-purple">100% orientée résultats</span>
            </h2>
            <ModernCard variant="glass" className="p-6 mb-6" glow="purple">
              <p className="text-lg mb-4 text-gray-300">
                Tu veux des réponses concrètes.<br />
                Tu veux implémenter maintenant.<br />
                Tu veux éviter les pièges que d'autres ont déjà rencontré.
              </p>
              <p className="font-semibold text-gradient-purple">DOPE Content, c'est :</p>
            </ModernCard>
            <div className="space-y-4">
              {communityFeatures.map((feature, index) => (
                <ModernCard key={index} variant="glass" className="p-4 hover-lift">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-purple-400">{feature.split(' ')[0]}</span>
                    <span className="text-gray-300">{feature.substring(2)}</span>
                  </div>
                </ModernCard>
              ))}
            </div>
          </div>

          {/* Why Different Section */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-white">
              ✨ Pourquoi c'est différent <span className="text-gradient-multi">(et mieux)</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <ModernCard variant="glass" className="p-6" glow="purple">
                <p className="font-semibold mb-2 text-white">🔹 Ce n'est pas une formation.</p>
                <p className="text-sm text-gray-300">C'est un système vivant qui évolue avec les outils, les tendances et les besoins de la communauté.</p>
              </ModernCard>
              <ModernCard variant="glass" className="p-6" glow="pink">
                <p className="font-semibold mb-2 text-white">🔹 Ce n'est pas un groupe Facebook désert.</p>
                <p className="text-sm text-gray-300">C'est un espace actif avec des entrepreneurs ambitieux et solidaires.</p>
              </ModernCard>
              <ModernCard variant="glass" className="p-6" glow="blue">
                <p className="font-semibold mb-2 text-white">🔹 Ce n'est pas un pack de PDF à lire.</p>
                <p className="text-sm text-gray-300">C'est de la mise en pratique, des templates actionnables, de l'accompagnement.</p>
              </ModernCard>
            </div>
          </div>

          {/* 4 Weeks Results */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-white">
              🚀 En 4 semaines, tu peux :
            </h2>
            <div className="space-y-4 mb-6">
              {fourWeeksResults.map((result, index) => (
                <ModernCard key={index} variant="glass" className="p-4 hover-lift">
                  <div className="flex items-center gap-4">
                    <span className="text-green-400 text-xl">•</span>
                    <span className="text-gray-300">{result}</span>
                  </div>
                </ModernCard>
              ))}
            </div>
            <ModernCard variant="gradient" className="p-6" glow="pink">
              <p className="text-lg mb-2 text-white">💸 Tu ne vends pas de formation ?</p>
              <p className="mb-2 text-gray-300">Tu proposes des services ? des produits ?</p>
              <p className="font-semibold text-white">Pas de souci. Les mêmes méthodes s'adaptent à <strong className="text-gradient-purple">tous les modèles</strong>.</p>
            </ModernCard>
          </div>

          {/* Access Content */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-white">
              🎓 Ce que tu reçois <span className="text-gradient-purple">en accès immédiat</span>
            </h2>
            <div className="space-y-4 mb-6">
              {accessContent.map((content, index) => (
                <ModernCard key={index} variant="glass" className="p-4 hover-lift">
                  <div className="flex items-center gap-4">
                    <span className="text-purple-400">{content.split(' ')[0]}</span>
                    <span className="text-gray-300">{content.substring(2)}</span>
                  </div>
                </ModernCard>
              ))}
            </div>
            <ModernCard variant="gradient" className="p-4" glow="blue">
              <p className="font-semibold text-yellow-400">Bonus :</p>
              <p className="text-gray-300">🎯 Des mini-formations surprises, des masterclass, des systèmes partagés en exclusivité.</p>
            </ModernCard>
          </div>

          <div className="text-center">
            <ModernButton 
              variant="gradient" 
              glow={true} 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => navigate('/payment')}
            >
              🚀 Rejoindre maintenant (15 000 FCFA)
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ModernButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
