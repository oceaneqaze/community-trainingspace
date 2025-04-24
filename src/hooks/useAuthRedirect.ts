
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useAuthRedirect = (requiresAdmin = false) => {
  const { isAuthenticated, isAdmin, isBanned, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect while authentication is still loading
    if (isLoading) return;

    // Si l'utilisateur est sur la page de login et est déjà authentifié, on le redirige vers videos
    if (isAuthenticated && location.pathname === '/login') {
      navigate('/videos');
      return;
    }

    // Si la page requiert une authentification et que l'utilisateur n'est pas authentifié
    if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/signup' 
        && location.pathname !== '/' && !location.pathname.includes('/invitation/')) {
      // Store the intended destination to redirect back after login
      const returnUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?returnUrl=${returnUrl}`);
      toast({
        title: "Accès refusé",
        description: "Veuillez vous connecter pour accéder à cette page.",
      });
      return;
    }

    // Vérification du bannissement seulement si l'utilisateur est authentifié
    if (isAuthenticated && typeof isBanned === 'function' && isBanned()) {
      navigate('/');
      toast({
        title: "Accès refusé",
        description: "Votre compte a été suspendu.",
        variant: "destructive",
      });
      return;
    }

    // Vérification des droits admin seulement si spécifié et si l'utilisateur est authentifié
    if (isAuthenticated && requiresAdmin && typeof isAdmin === 'function' && !isAdmin()) {
      navigate('/videos');
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'administrateur pour accéder à cette page.",
        variant: "destructive",
      });
      return;
    }
  }, [isAuthenticated, isAdmin, isBanned, isLoading, location, navigate, requiresAdmin]);

  return { 
    isAuthenticated, 
    isAdmin: typeof isAdmin === 'function' ? isAdmin() : isAdmin, 
    isLoading 
  };
};
