
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

    console.log("Auth redirect check - Path:", location.pathname, "Auth:", isAuthenticated, "Admin:", isAdmin());
    
    // Public pages that don't require authentication
    const publicPaths = ['/signin', '/signup', '/'];
    const isPublicPath = publicPaths.includes(location.pathname);
    
    // Check banned status first if authenticated
    if (isAuthenticated && isBanned && isBanned()) {
      console.log("User is banned, redirecting to home");
      toast({
        title: "Accès refusé",
        description: "Votre compte a été suspendu.",
        variant: "destructive",
      });
      navigate('/', { replace: true });
      return;
    }

    // If user is authenticated and on an auth page, redirect them
    if (isAuthenticated && (location.pathname === '/signin' || location.pathname === '/signup')) {
      console.log("Authenticated user on auth page, redirecting");
      navigate('/videos', { replace: true });
      return;
    }

    // If page requires authentication and user is not authenticated
    if (!isAuthenticated && !isPublicPath) {
      console.log("Unauthenticated user on protected page, redirecting to /signin");
      navigate('/signin', { replace: true });
      return;
    }

    // Admin rights check only if specified and user is authenticated
    if (isAuthenticated && requiresAdmin && !isAdmin()) {
      console.log("Non-admin user on admin page, redirecting to /videos");
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'administrateur pour accéder à cette page.",
        variant: "destructive",
      });
      navigate('/videos', { replace: true });
      return;
    }
  }, [isAuthenticated, isAdmin, isBanned, isLoading, location.pathname, navigate, requiresAdmin]);

  return { 
    isAuthenticated, 
    isAdmin: isAdmin(), 
    isLoading 
  };
};
