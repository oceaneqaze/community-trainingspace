
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useAuthRedirect = (requiresAdmin = false) => {
  const { isAuthenticated, isAdmin, isBanned, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Skip redirect checks while authentication is loading
    if (isLoading) {
      console.log("Auth is loading, skipping redirect check");
      return;
    }

    console.log("Auth redirect check - Path:", location.pathname, "Auth:", isAuthenticated, "Admin:", isAdmin ? isAdmin() : false);
    
    // Public pages that don't require authentication
    const publicPaths = ['/signin', '/signup', '/'];
    const isPublicPath = publicPaths.includes(location.pathname);

    // If user is authenticated and on an auth page, redirect them to dashboard or videos
    if (isAuthenticated && (location.pathname === '/signin' || location.pathname === '/signup')) {
      console.log("Authenticated user on auth page, redirecting to /dashboard");
      if (isAdmin && isAdmin()) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/videos', { replace: true });
      }
      return;
    }

    // If page requires authentication and user is not authenticated
    if (!isAuthenticated && !isPublicPath) {
      console.log("Unauthenticated user on protected page, redirecting to /signin");
      navigate('/signin', { replace: true });
      return;
    }

    // Ban check only if user is authenticated
    if (isAuthenticated && isBanned && isBanned()) {
      console.log("User is banned, redirecting to home");
      navigate('/', { replace: true });
      toast({
        title: "Accès refusé",
        description: "Votre compte a été suspendu.",
        variant: "destructive",
      });
      return;
    }

    // Admin rights check only if specified and user is authenticated
    if (isAuthenticated && requiresAdmin && isAdmin && !isAdmin()) {
      console.log("Non-admin user on admin page, redirecting to /videos");
      navigate('/videos', { replace: true });
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'administrateur pour accéder à cette page.",
        variant: "destructive",
      });
      return;
    }
  }, [isAuthenticated, isAdmin, isBanned, isLoading, location.pathname, navigate, requiresAdmin]);

  return { 
    isAuthenticated, 
    isAdmin: typeof isAdmin === 'function' ? isAdmin() : isAdmin, 
    isLoading 
  };
};
