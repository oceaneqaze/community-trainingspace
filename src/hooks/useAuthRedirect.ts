
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useAuthRedirect = (requiresAdmin = false) => {
  const { isAuthenticated, isAdmin, isBanned, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Ne pas effectuer de redirection pendant le chargement de l'authentification
    if (isLoading) {
      console.log("Auth est en cours de chargement, redirection différée");
      return;
    }

    // Éviter la redirection si l'URL contient déjà le bon chemin
    const currentPath = location.pathname;

    // Pages publiques qui ne nécessitent pas d'authentification
    const publicPaths = ['/signin', '/signup', '/login', '/'];
    const isPublicPath = publicPaths.some(path => currentPath === path || currentPath.startsWith(path + '/'));
    
    // Pour déboguer
    console.log(`Vérification de redirection - Chemin: ${currentPath}, Auth: ${isAuthenticated}, Admin: ${isAdmin && isAdmin()}, Public: ${isPublicPath}`);
    
    // Normaliser le chemin /login vers /signin
    if (currentPath === '/login') {
      console.log("Normalisation de /login vers /signin");
      navigate('/signin', { replace: true });
      return;
    }

    // Vérifier le statut de ban d'abord si authentifié
    if (isAuthenticated && isBanned && isBanned()) {
      console.log("Utilisateur banni, redirection vers l'accueil");
      toast({
        title: "Accès refusé",
        description: "Votre compte a été suspendu.",
        variant: "destructive",
      });
      navigate('/', { replace: true });
      return;
    }

    // Si l'utilisateur est authentifié et sur une page d'auth, le rediriger vers /videos
    if (isAuthenticated && (currentPath === '/signin' || currentPath === '/signup' || currentPath === '/login')) {
      console.log("Utilisateur authentifié sur une page d'auth, redirection vers /videos");
      navigate('/videos', { replace: true });
      return;
    }

    // Si la page nécessite une authentification et que l'utilisateur n'est pas authentifié
    if (!isAuthenticated && !isPublicPath) {
      console.log("Utilisateur non authentifié sur une page protégée, redirection vers /signin");
      navigate('/signin', { replace: true });
      return;
    }

    // Vérification des droits d'administrateur uniquement si spécifié et si l'utilisateur est authentifié
    if (isAuthenticated && requiresAdmin && isAdmin && !isAdmin()) {
      console.log("Utilisateur non-administrateur sur une page admin, redirection vers /videos");
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
    isAdmin: isAdmin && isAdmin(), 
    isLoading 
  };
};
