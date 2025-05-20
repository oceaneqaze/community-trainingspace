
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState } from '@/utils/authUtils';
import { toast } from '@/components/ui/use-toast';

export const login = async (email: string, password: string) => {
  try {
    console.log("Login operation started for:", email);
    
    // Clean up existing auth state to prevent conflicts
    cleanupAuthState();
    
    // Attempt sign out to ensure a clean state
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (e) {
      // Continue even if this fails
      console.log("Pre-login signout attempt failed, continuing anyway");
    }
    
    // Now attempt to sign in with clean state
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase auth error:", error);
      throw error;
    }

    console.log("Login successful:", data.user?.id);
    return data;
  } catch (error: any) {
    console.error('Login error:', error.message);
    toast({
      title: "Échec de connexion",
      description: error.message || "Une erreur est survenue",
      variant: "destructive",
    });
    throw error;
  }
};
