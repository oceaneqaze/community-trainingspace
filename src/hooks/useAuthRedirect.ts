
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useAuthRedirect = (requiresAdmin = false) => {
  const { isAuthenticated, isAdmin, isBanned, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Ne pas rediriger pendant le chargement de l'authentification
    if (isLoading) {
      console.log("Auth loading, skipping redirect checks");
      return;
    }

    console.log("useAuthRedirect running with:", { 
      isAuthenticated, 
      path: location.pathname, 
      isLoading, 
      requiresAdmin 
    });

    // Pages publiques qui ne nécessitent pas d'authentification
    const publicPaths = ['/signin', '/signup', '/', '/invitation', '/login']; // Ajout de /login comme chemin public
    const isPublicPath = publicPaths.some(path => location.pathname === path) || 
                         location.pathname.includes('/invitation/');

    // Si l'utilisateur est sur la page de connexion et est déjà authentifié, on le redirige vers videos
    if (isAuthenticated && (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/login')) {
      console.log("User is authenticated and on signin/signup/login page, redirecting to /videos");
      navigate('/videos');
      return;
    }

    // Si la page requiert une authentification et que l'utilisateur n'est pas authentifié
    if (!isAuthenticated && !isPublicPath) {
      // Store the intended destination to redirect back after login
      const returnUrl = encodeURIComponent(location.pathname + location.search);
      console.log(`User not authenticated, redirecting to signin with returnUrl: ${returnUrl}`);
      navigate(`/signin?returnUrl=${returnUrl}`);
      toast({
        title: "Accès refusé",
        description: "Veuillez vous connecter pour accéder à cette page.",
      });
      return;
    }

    // Vérification du bannissement seulement si l'utilisateur est authentifié
    if (isAuthenticated && typeof isBanned === 'function' && isBanned()) {
      console.log("User is banned, redirecting to home");
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
      console.log("User is not admin but page requires admin, redirecting to videos");
      navigate('/videos');
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'administrateur pour accéder à cette page.",
        variant: "destructive",
      });
      return;
    }
  }, [isAuthenticated, isAdmin, isBanned, isLoading, location.pathname, location.search, navigate, requiresAdmin]);

  return { 
    isAuthenticated, 
    isAdmin: typeof isAdmin === 'function' ? isAdmin() : isAdmin, 
    isLoading 
  };
};
