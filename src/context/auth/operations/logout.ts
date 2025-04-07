
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const logout = async (onLogoutSuccess: () => void) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
      toast({
        title: "Échec de la déconnexion",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
      throw error;
    }
    
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    
    onLogoutSuccess();
  } catch (error: any) {
    console.error('Logout error:', error.message);
    toast({
      title: "Échec de la déconnexion",
      description: error.message || "Une erreur est survenue",
      variant: "destructive",
    });
    throw error;
  }
};
