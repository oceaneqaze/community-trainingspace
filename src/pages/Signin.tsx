
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Signin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get returnUrl from query parameters
  const searchParams = new URLSearchParams(location.search);
  const returnUrl = searchParams.get('returnUrl') || '/videos';

  // Redirect to return URL if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      const decodedReturnUrl = decodeURIComponent(returnUrl);
      console.log(`Signin page - Redirecting authenticated user to: ${decodedReturnUrl}`);
      navigate(decodedReturnUrl, { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate, returnUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log("Attempting login for:", email);
      await login(email, password);
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue sur DOPE CONTENT`,
      });
      
      // Redirection handled by useEffect above
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Show more specific error message based on the cause
      if (error.message && error.message.includes('Invalid login credentials')) {
        setError("Email ou mot de passe incorrect");
      } else {
        setError(error.message || "Une erreur est survenue lors de la connexion");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="glass-panel py-8 px-6 rounded-lg sm:px-10">
          <div className="mb-8 text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
              <img 
                src="/lovable-uploads/bb7e7daa-74a3-4cd4-8457-13ba5ae39dce.png" 
                alt="DOPE CONTENT Logo" 
                className="h-10 w-auto" 
              />
              <h2 className="text-3xl font-bold tech-text">DOPE CONTENT</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Accédez à votre espace exclusif
            </p>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  autoComplete="current-password"
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
                    Connexion en cours...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    Se connecter
                  </div>
                )}
              </Button>
            </div>

            <div className="text-sm text-center">
              <span className="text-muted-foreground">Vous n'avez pas de compte?</span>{' '}
              <Link to="/signup" className="font-medium text-primary hover:text-accent">
                Inscrivez-vous
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

export default Signin;
