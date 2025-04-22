
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, Star, MessageSquare } from 'lucide-react';

interface BenefitItemProps {
  icon: React.ReactNode;
  text: string;
}

const BenefitItem = ({ icon, text }: BenefitItemProps) => (
  <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
    {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5 text-primary flex-shrink-0" })}
    <span>{text}</span>
  </div>
);

const BenefitsSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
            Ce que tu obtiens en rejoignant DOPE Content
          </h2>
          <div className="grid gap-4 text-lg">
            <BenefitItem icon={<Users />} text="Accès immédiat au serveur privé + groupe Telegram" />
            <BenefitItem icon={<BookOpen />} text="20 vidéos de formation exclusives" />
            <BenefitItem icon={<Star />} text="Prompts prêts à l'emploi pour ChatGPT, Midjourney, Claude, etc." />
            <BenefitItem icon={<MessageSquare />} text="Modèles de posts, scripts vidéos, visuels IA" />
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold mb-4">Tarif unique : 15.000 FCFA pour l'accès à vie</p>
            <Button onClick={() => navigate('/signup')} size="lg">
              🚀 Obtenir mon accès privé
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
