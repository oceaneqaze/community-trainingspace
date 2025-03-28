
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AuthButtons = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => navigate('/login')}>
        Connexion
      </Button>
      <Button onClick={() => navigate('/signup')}>
        Inscription
      </Button>
    </div>
  );
};

export default AuthButtons;
