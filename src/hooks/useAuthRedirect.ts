
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
      console.log("Auth loading, skipping redirect checks");
      return;
    }

    console.log("useAuthRedirect running with:", { 
      isAuthenticated, 
      path: location.pathname, 
      isLoading, 
      requiresAdmin 
    });

    // Get return URL from parameters if it exists
    const params = new URLSearchParams(location.search);
    const returnUrl = params.get('returnUrl');
    
    // Public pages that don't require authentication
    const publicPaths = ['/signin', '/signup', '/']; 
    const isPublicPath = publicPaths.includes(location.pathname);

    // If user is authenticated and on an auth page, redirect them
    if (isAuthenticated && (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/login')) {
      const decodedReturnUrl = returnUrl ? decodeURIComponent(returnUrl) : '/videos';
      console.log(`User is authenticated and on auth page, redirecting to: ${decodedReturnUrl}`);
      
      // Use replace to avoid adding to history stack
      navigate(decodedReturnUrl, { replace: true });
      return;
    }

    // If page requires authentication and user is not authenticated
    if (!isAuthenticated && !isPublicPath) {
      // Store the intended destination to redirect back after login
      const returnUrl = encodeURIComponent(location.pathname + location.search);
      console.log(`User not authenticated, redirecting to signin with returnUrl: ${returnUrl}`);
      
      // Use replace to avoid adding to history stack
      navigate(`/signin?returnUrl=${returnUrl}`, { replace: true });
      toast({
        title: "Accès refusé",
        description: "Veuillez vous connecter pour accéder à cette page.",
      });
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
      console.log("User is not admin but page requires admin, redirecting to videos");
      navigate('/videos', { replace: true });
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
