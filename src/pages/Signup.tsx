
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const signupResult = await signup(email, password, name);
      
      if (signupResult.error) throw signupResult.error;
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      });
        
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Échec de l'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="glass-panel py-8 px-6 rounded-lg sm:px-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tech-text">DOPE CONTENT</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              L'inscription se fait uniquement par invitation
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Pour créer un compte, vous devez avoir reçu un lien d'invitation.
            </p>
            <p className="text-sm text-muted-foreground">
              Si vous avez reçu une invitation, cliquez sur le lien dans votre email ou message.
            </p>
            
            <div className="space-y-4 pt-4">
              <Button 
                onClick={() => navigate('/signin')}
                className="w-full"
              >
                Se connecter
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full"
              >
                Retour à l'accueil
              </Button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              DOPE CONTENT par Emma-Alk DOHOU
            </p>
            <a 
              href="https://wa.me/22954155702" 
              className="text-xs text-primary hover:text-accent mt-1 inline-block"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Contact: wa.me/22954155702
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
