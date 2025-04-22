
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const useAuthRedirect = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    // Suppression de la redirection des admins vers /admin/dashboard
    // car cette route n'existe pas dans l'application
  }, [isAuthenticated, navigate]);

  return { isAuthenticated, isAdmin };
};
