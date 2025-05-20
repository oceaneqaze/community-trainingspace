
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState } from '@/utils/authUtils';

export const login = async (email: string, password: string) => {
  try {
    console.log("Login operation started for:", email);
    
    // Clean up existing auth state to prevent conflicts
    cleanupAuthState();
    
    // Attempt global sign out first to ensure clean state
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Continue even if this fails
      console.log("Ignoring global sign out error during login preparation");
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
    
    // Toast handled by the Signin component
    return data;
  } catch (error: any) {
    console.error('Login error:', error.message);
    throw error;
  }
};
