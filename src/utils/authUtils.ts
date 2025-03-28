
/**
 * This utility file provides helper functions for authentication
 */

import { supabase } from '@/integrations/supabase/client';
import { SUPABASE_URL } from '@/integrations/supabase/client';

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
      url: SUPABASE_URL,
      hasApiKey: true, // We assume the API key is set since we're using the client
    });
    
    // Log additional details for better debugging
    if (data.session) {
      console.log('Session details:', {
        userId: data.session.user.id,
        expires: new Date(data.session.expires_at! * 1000).toISOString(),
        provider: data.session.user.app_metadata.provider,
      });
    }
    
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

/**
 * Check if the user is authenticated
 */
export const isAuthenticated = async () => {
  const session = await getCurrentSession();
  return !!session;
};
