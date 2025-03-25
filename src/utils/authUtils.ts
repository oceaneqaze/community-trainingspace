
/**
 * This utility file provides helper functions for authentication
 */

import { supabase } from '@/integrations/supabase/client';

/**
 * Check if authentication is properly configured
 * This is useful for debugging authentication issues
 */
export const checkAuthConfig = async () => {
  try {
    // Check if the Supabase client is configured
    const { data, error } = await supabase.auth.getSession();
    
    console.log('Supabase auth configuration:', { 
      hasSession: !!data.session,
      url: supabase.supabaseUrl,
      hasApiKey: !!supabase.supabaseKey && supabase.supabaseKey.length > 0,
    });
    
    return {
      isConfigured: true,
      session: data.session,
      error: error ? error.message : null
    };
  } catch (error: any) {
    console.error('Supabase auth configuration error:', error);
    return {
      isConfigured: false,
      session: null,
      error: error.message
    };
  }
};

/**
 * Get the current session
 */
export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting current session:', error);
    return null;
  }
  return data.session;
};
