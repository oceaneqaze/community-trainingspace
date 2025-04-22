
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const BenefitsSection = () => {
  const navigate = useNavigate();
  
  const benefits = [
    "Créer du contenu tous les jours sans y passer 3 heures",
    "Générer des visuels pros avec l'IA (portraits, carrousels, illustrations)",
    "Obtenir des prompts puissants prêts à l'emploi",
    "Structurer ton contenu pour vendre (posts, scripts vidéos, landing pages)",
    "Automatiser ta création de contenu sur plusieurs plateformes",
    "T'entourer de créateurs, d'entrepreneurs, de vendeurs IA comme toi",
    "Être coaché, corrigé et challengé par les meilleurs membres"
  ];

  const features = [
    {
      title: "20 vidéos de formation (système complet DOPE Content)",
      items: [
        "Créer ton clone IA pour générer ton propre style",
        "Générer du contenu multi-format avec 1 prompt",
        "Vendre avec tes posts grâce au système FLASH et ANC",
        "Créer des visuels impactants avec Artflow, Midjourney, Ideogram",
        "Automatiser ta publication grâce à des outils IA + No Code"
      ]
    },
    {
      title: "Base de prompts prête à l'emploi",
      description: "Copywriting, storytelling, carrousels viraux, visuels, contenu de vente"
    },
    {
      title: "Accès privé à la communauté Telegram",
      description: "Challenge hebdo, relecture de posts, feedback en direct"
    }
  ];

  return (
    <section className="py-16 bg-card/50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            🚀 Bienvenue dans DOPE Content
          </h2>
          
          <div className="space-y-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="space-y-8 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                {feature.items ? (
                  <ul className="space-y-2">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{feature.description}</p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <p className="text-lg font-semibold">🔒 Accès illimité et à vie (tarif unique, sans abonnement)</p>
            <p className="text-primary">🎁 Mises à jour continues incluses (tu ne repayes plus jamais)</p>
            <Button onClick={() => navigate('/signup')} size="lg">
              🚀 Obtenir mon accès
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
