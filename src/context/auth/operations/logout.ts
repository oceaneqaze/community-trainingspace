
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { cleanupAuthState } from '@/utils/authUtils';

export const logout = async (onLogoutSuccess: () => void) => {
  try {
    console.log('Logout operation started');
    
    // Clean up existing auth state first
    cleanupAuthState();
    
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
    
    // Force page refresh to ensure clean slate
    window.location.href = '/signin';
  } catch (error: any) {
    console.error('Logout error:', error.message);
    toast({
      title: "Échec de la déconnexion",
      description: error.message || "Une erreur est survenue",
      variant: "destructive",
    });
    
    // Still try to clean up auth state and redirect, even if there was an error
    cleanupAuthState();
    window.location.href = '/signin';
    
    throw error;
  }
};
