
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModernButton from '@/components/ui/modern-button';

const AuthButtons = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-3">
      <ModernButton 
        variant="outline" 
        size="sm"
        onClick={() => navigate('/signin')}
      >
        Connexion
      </ModernButton>
      <ModernButton 
        variant="gradient" 
        size="sm"
        glow={true}
        onClick={() => navigate('/signup')}
      >
        Inscription
      </ModernButton>
    </div>
  );
};

export default AuthButtons;
