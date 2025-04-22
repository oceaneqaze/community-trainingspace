
import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "Est-ce que je dois être expert en IA ?",
      answer: "Pas du tout. Tout est expliqué étape par étape, même si tu es débutant complet."
    },
    {
      question: "Est-ce que je dois déjà vendre une formation ?",
      answer: "Non. La communauté t'aide aussi à construire ton offre ou à développer ton personal branding."
    },
    {
      question: "Puis-je payer en plusieurs fois ?",
      answer: "Non. L'accès est à 15.000 FCFA une seule fois, c'est une offre à vie."
    },
    {
      question: "Est-ce que les vidéos sont mises à jour ?",
      answer: "Oui, tu auras accès aux nouvelles méthodes dès qu'elles sont disponibles dans la communauté."
    }
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
          FAQ – Tu te poses sûrement ces questions :
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">→ {faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
