
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const login = async (email: string, password: string) => {
  try {
    console.log("Opération de connexion démarrée pour:", email);
    
    // La fonction cleanupAuthState a été retirée pour éviter les perturbations
    // dans l'état de connexion sur les environnements de production
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erreur d'authentification Supabase:", error);
      throw error;
    }

    console.log("Connexion réussie:", data.user?.id);
    
    // Ne pas faire de redirection ici, la gestion de redirection est dans useAuthRedirect
    return data;
  } catch (error: any) {
    console.error('Erreur de connexion:', error.message);
    toast({
      title: "Échec de connexion",
      description: error.message || "Une erreur est survenue",
      variant: "destructive",
    });
    throw error;
  }
};
