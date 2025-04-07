
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const login = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Auth state change will handle session and navigation
    // We just show a success toast here
    toast({
      title: "Connexion réussie",
      description: `Bienvenue sur DOPE CONTENT, ${email}`,
    });
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
