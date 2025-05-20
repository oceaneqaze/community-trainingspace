
/**
 * This utility file provides helper functions for authentication
 */

import { supabase } from '@/integrations/supabase/client';
import { SUPABASE_URL } from '@/integrations/supabase/client';

/**
 * Thoroughly clean up auth state to prevent limbo states
 */
export const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
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
