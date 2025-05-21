
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
    question: "Comment fonctionne le paiement mobile ?",
    answer: "Sélectionnez votre opérateur mobile et suivez les instructions pour effectuer le paiement via votre téléphone. Vous recevrez une notification pour confirmer la transaction."
  },
  {
    question: "Combien de temps ai-je accès au contenu ?",
    answer: "Votre achat vous donne un accès à vie à DOPE Content. Vous bénéficiez également de toutes les mises à jour futures sans frais supplémentaires."
  },
  {
    question: "Puis-je demander un remboursement ?",
    answer: "Non, aucun remboursement n'est possible après l'achat. Nous sommes transparents sur ce point car nous offrons un produit digital de grande valeur avec un accès immédiat."
  },
  {
    question: "Quand vais-je recevoir mon code d'accès ?",
    answer: "Vous recevrez votre code d'invitation immédiatement après la confirmation du paiement. Ce code vous permettra de créer votre compte sur notre plateforme."
  }
];

const PaymentFAQ: React.FC = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">Questions fréquentes</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-sm">{item.question}</AccordionTrigger>
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
