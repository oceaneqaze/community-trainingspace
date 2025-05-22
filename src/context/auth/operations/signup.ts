
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { fetchUserProfile } from '../helpers';

export const signup = async (
  email: string, 
  password: string, 
  name: string,
  onSuccess?: (user: any, session: any, profile: any) => void
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) throw error;

    // If email confirmation is disabled, we can log the user in immediately
    if (data.session) {
      const profile = await fetchUserProfile(data.user.id);
      
      if (onSuccess) {
        onSuccess(data.user, data.session, profile);
      } else {
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès.",
        });
      }
      
      return { data, error: null };
    } else {
      toast({
        title: "Vérification requise",
        description: "Veuillez vérifier votre email pour confirmer votre compte.",
      });
      
      return { data, error: null };
    }
  } catch (error: any) {
    console.error('Signup error:', error.message);
    toast({
      title: "Échec de l'inscription",
      description: error.message || "Une erreur est survenue",
      variant: "destructive",
    });
    throw error;
  }
};
