
import React from 'react';

interface Testimonial {
  name: string;
  content: string;
  business: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    business: "Coach en développement personnel",
    content: "J'ai automatisé tout mon funnel de vente. Je gagne 3h par jour et mes revenus ont doublé en 2 mois."
  },
  {
    name: "Ahmed K.",
    business: "Consultant en marketing",
    content: "Les templates IA de DOPE Content m'ont permis de créer un chatbot qui gère 80% de mon SAV automatiquement."
  },
  {
    name: "Marie L.",
    business: "Créatrice de contenu",
    content: "Grâce aux systèmes d'automatisation, je publie du contenu 7j/7 sans y passer mes soirées. Game changer !"
  }
];

const PaymentTestimonials: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">🗣️ Ce qu'en disent nos membres</h3>
      <div className="space-y-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-card/70 p-4 rounded-lg border border-border/20">
            <p className="text-sm italic mb-2">"{testimonial.content}"</p>
            <div className="text-xs text-muted-foreground">
              <p className="font-medium">— {testimonial.name}</p>
              <p>{testimonial.business}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentTestimonials;
