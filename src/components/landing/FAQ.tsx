import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "Est-ce que je dois être expert en intelligence artificielle ?",
      answer: "Non. Tu es guidé pas à pas même si tu débutes complètement."
    },
    {
      question: "Est-ce que je peux accéder depuis mon téléphone ?",
      answer: "Oui. Tout est accessible sur mobile, tablette ou ordinateur."
    },
    {
      question: "Comment payer ?",
      answer: "Tu peux régler via Mobile Money (MTN, Moov) ou par carte bancaire."
    },
    {
      question: "Y a-t-il des paiements récurrents ?",
      answer: "Non. Tu paies une fois 15.000 FCFA, ton accès est à vie."
    },
    {
      question: "Puis-je partager mon accès ?",
      answer: "Non. Ton code est personnel et actif pour un seul compte."
    }
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="px-2 sm:container sm:px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
          FAQ – Tu te poses sûrement ces questions :
        </h2>
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
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
