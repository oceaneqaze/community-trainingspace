
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
      await signup(email, password, name);
    } catch (error) {
      console.error('Signup error:', error);
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
              Créez votre compte pour accéder à toutes les fonctionnalités
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="text-foreground">
                Nom
              </Label>
              <div className="mt-1">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background/50"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground">
                Mot de passe
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50"
                  placeholder="Mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirmer le mot de passe
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-background/50"
                  placeholder="Confirmer le mot de passe"
                />
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full tech-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Inscription en cours...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Créer un compte
                  </div>
                )}
              </Button>
            </div>

            <div className="text-sm text-center">
              <span className="text-muted-foreground">Vous avez déjà un compte?</span>{' '}
              <Link to="/login" className="font-medium text-primary hover:text-accent">
                Connectez-vous
              </Link>
            </div>
          </form>
          
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
