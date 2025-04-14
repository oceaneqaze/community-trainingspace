
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-card/30">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <h2 className="text-xl sm:text-3xl font-bold text-center mb-8">👥 CE QU'ILS EN DISENT</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-primary/30 bg-card/80 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold">Julien K.</h3>
                <p className="text-sm text-muted-foreground">Freelance Marketing</p>
              </div>
              <p className="text-center italic">
                "J'étais nul en écriture, je passais des heures pour un post minable. Avec cette formation, en 2 semaines, j'ai triplé mes vues et décroché 3 clients. L'IA, c'est ma nouvelle arme."
              </p>
              <div className="flex justify-center mt-4">
                <span className="text-primary font-bold">+300%</span>
                <span className="mx-2 text-muted-foreground">de visibilité</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/30 bg-card/80 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold">Sarah M.</h3>
                <p className="text-sm text-muted-foreground">Entrepreneuse E-commerce</p>
              </div>
              <p className="text-center italic">
                "Je n'avais jamais le temps pour du contenu. Maintenant, je poste tous les jours, et ma communauté adore. Les ventes ont augmenté de 27% en un mois!"
              </p>
              <div className="flex justify-center mt-4">
                <span className="text-primary font-bold">Posts quotidiens</span>
                <span className="mx-2 text-muted-foreground">sans effort</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/30 bg-card/80 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold">Marc T.</h3>
                <p className="text-sm text-muted-foreground">Coach Business</p>
              </div>
              <p className="text-center italic">
                "Les prompts IA sont géniaux! En une semaine j'ai créé autant de contenu qu'en un mois avant. Mes clients me demandent comment je fais!"
              </p>
              <div className="flex justify-center mt-4">
                <span className="text-primary font-bold">400%</span>
                <span className="mx-2 text-muted-foreground">de productivité</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-lg font-bold text-primary">93% des participants créent leur premier contenu IA en moins de 7 jours.</p>
          <p className="text-muted-foreground">Et toi, tu seras le prochain.</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
