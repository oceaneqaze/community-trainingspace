
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Que se passe-t-il après le paiement ?",
    answer: "Tu reçois immédiatement ton code d'accès privé par email. Tu peux créer ton compte et accéder à tout le contenu en moins de 2 minutes."
  },
  {
    question: "C'est vraiment à vie ?",
    answer: "Oui, totalement. Tu paies une fois et tu gardes l'accès pour toujours, y compris toutes les mises à jour futures et nouveaux contenus."
  },
  {
    question: "Je ne suis pas technique, est-ce accessible ?",
    answer: "Absolument ! Nos systèmes sont conçus pour être utilisés sans compétences techniques. Tu as des templates prêts à l'emploi et un accompagnement pas à pas."
  },
  {
    question: "Y a-t-il un remboursement possible ?",
    answer: "Non, car tu as accès immédiatement à tout le contenu digital. C'est pourquoi nous sommes transparents sur ce que tu reçois exactement."
  }
];

const PaymentFAQ: React.FC = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">❓ Questions rapides</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-sm text-left">{item.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PaymentFAQ;
