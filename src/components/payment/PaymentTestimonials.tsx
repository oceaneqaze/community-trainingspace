
import React from 'react';

interface Testimonial {
  name: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Thomas K.",
    content: "DOPE Content a révolutionné ma création de contenu. Je gagne un temps fou chaque jour !"
  },
  {
    name: "Marie L.",
    content: "Les formations sont incroyables, j'ai quintuplé mon engagement sur les réseaux en 3 semaines."
  },
  {
    name: "Pascal M.",
    content: "Meilleur investissement pour mon business en ligne cette année. Hautement recommandé."
  }
];

const PaymentTestimonials: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Ce qu'en disent nos membres</h3>
      <div className="space-y-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-card/70 p-3 rounded-lg">
            <p className="text-sm italic">"{testimonial.content}"</p>
            <p className="text-xs text-muted-foreground mt-1">— {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentTestimonials;
