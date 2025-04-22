
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <img 
                src="/lovable-uploads/bb7e7daa-74a3-4cd4-8457-13ba5ae39dce.png"
                alt="DOPE CONTENT" 
                className="h-12 w-auto"
              />
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                DOPE <span className="text-primary">CONTENT</span>
              </h1>
            </div>
            
            <p className="mt-6 text-lg leading-8 text-muted-foreground mb-8">
              Accédez à des contenus exclusifs et de haute qualité pour développer vos compétences 
              dans un environnement collaboratif et professionnel.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => navigate(isAuthenticated ? '/videos' : '/login')} size="lg">
                {isAuthenticated ? 'Voir les formations' : 'Se connecter'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              {!isAuthenticated && (
                <Button variant="outline" onClick={() => navigate('/signup')} size="lg">
                  Inscription
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
