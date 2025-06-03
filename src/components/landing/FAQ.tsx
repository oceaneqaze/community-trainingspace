
import React from 'react';
import ModernCard from '@/components/ui/modern-card';

const FAQ = () => {
  const faqs = [
    {
      question: "C'est vraiment différent des autres formations IA ?",
      answer: "Oui. Ici, pas de théorie sans fin. Tu apprends en automatisant ton propre business avec des outils concrets et un accompagnement personnalisé."
    },
    {
      question: "Je ne suis pas technique, est-ce que je peux suivre ?",
      answer: "Absolument. Nos systèmes sont conçus pour être accessibles sans compétences techniques. Tu es guidé pas à pas avec des templates prêts à l'emploi."
    },
    {
      question: "Combien de temps faut-il pour voir des résultats ?",
      answer: "En 4 semaines, tu peux déjà avoir ton premier système d'automatisation fonctionnel. Mais tout dépend de ton investissement et de ton modèle business."
    },
    {
      question: "Y a-t-il des frais cachés ou récurrents ?",
      answer: "Non. 15 000 FCFA une fois, accès à vie. Tu ne repayes jamais, même pour les nouvelles formations et mises à jour."
    },
    {
      question: "Que se passe-t-il si je ne suis pas satisfait ?",
      answer: "Nous ne proposons pas de remboursement car tu as accès immédiatement à tout le contenu. C'est pourquoi nous sommes transparents sur ce que tu vas recevoir."
    }
  ];

  return (
    <section className="py-16">
      <div className="px-2 sm:container sm:px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-white">
          Questions <span className="text-gradient-purple">fréquentes</span>
        </h2>
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {faqs.map((faq, index) => (
            <ModernCard key={index} variant="glass" className="p-6 hover-lift" glow="purple">
              <h3 className="text-lg font-semibold mb-2 text-white">→ {faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </ModernCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
