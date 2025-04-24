
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const login = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Pas de toast ici, cela sera géré par la page de login
    return data;
  } catch (error: any) {
    console.error('Login error:', error.message);
    toast({
      title: "Échec de la connexion",
      description: error.message || "Une erreur est survenue",
      variant: "destructive",
    });
    throw error;
  }
};
