
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { cleanupAuthState } from '@/utils/authUtils';

export const logout = async (onLogoutSuccess: () => void): Promise<{error: any | null}> => {
  try {
    console.log('Logout operation started');
    
    // Clean up auth state only in development environment
    if (window.location.hostname === 'localhost') {
      cleanupAuthState();
    }
    
    // Then perform sign out
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    
    if (error) {
      console.error('Logout error:', error.message);
      throw error;
    }
    
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    
    // Callback after successful logout
    onLogoutSuccess();
    
    return { error: null };
  } catch (error: any) {
    console.error('Logout error:', error.message);
    toast({
      title: "Échec de la déconnexion",
      description: error.message || "Une erreur est survenue",
      variant: "destructive",
    });
    
    return { error };
  }
};
