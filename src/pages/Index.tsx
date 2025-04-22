
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">
          Bienvenue sur Dope Content
        </h1>
        
        <p className="text-muted-foreground max-w-md mx-auto">
          Accédez à des formations de haute qualité et développez vos compétences.
        </p>
        
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => navigate(isAuthenticated ? '/videos' : '/login')}
            size="lg"
          >
            {isAuthenticated ? 'Voir les formations' : 'Se connecter'}
          </Button>
          
          {!isAuthenticated && (
            <Button 
              variant="outline" 
              onClick={() => navigate('/signup')} 
              size="lg"
            >
              S'inscrire
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
