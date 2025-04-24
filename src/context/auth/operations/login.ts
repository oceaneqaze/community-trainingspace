
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const login = async (email: string, password: string) => {
  try {
    console.log("Login operation started for:", email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase auth error:", error);
      throw error;
    }

    console.log("Login successful:", data.user?.id);
    
    // Pas de toast ici, cela sera géré par la page de login
    return data;
  } catch (error: any) {
    console.error('Login error:', error.message);
    throw error;
  }
};
