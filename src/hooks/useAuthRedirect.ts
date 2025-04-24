
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

    if (!isAuthenticated) {
      // Store the intended destination to redirect back after login
      const returnUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?returnUrl=${returnUrl}`);
      toast({
        title: "Accès refusé",
        description: "Veuillez vous connecter pour accéder à cette page.",
      });
      return;
    }

    if (isBanned && isBanned()) {
      navigate('/');
      toast({
        title: "Accès refusé",
        description: "Votre compte a été suspendu.",
        variant: "destructive",
      });
      return;
    }

    if (requiresAdmin && !isAdmin()) {
      navigate('/videos');
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'administrateur pour accéder à cette page.",
        variant: "destructive",
      });
      return;
    }
  }, [isAuthenticated, isAdmin, isBanned, isLoading, location, navigate, requiresAdmin]);

  return { isAuthenticated, isAdmin: isAdmin ? isAdmin() : false, isLoading };
};
