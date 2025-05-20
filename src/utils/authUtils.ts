
/**
 * This utility file provides helper functions for authentication
 */

import { supabase } from '@/integrations/supabase/client';
import { SUPABASE_URL } from '@/integrations/supabase/client';

/**
 * Thoroughly clean up auth state to prevent limbo states
 */
export const cleanupAuthState = () => {
  console.log("Cleaning up auth state");
  
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      console.log(`Removing from localStorage: ${key}`);
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      console.log(`Removing from sessionStorage: ${key}`);
      sessionStorage.removeItem(key);
    }
  });
  
  // Clear any cookies related to authentication
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.trim().split('=')[0];
    if (name.includes('sb-') || name.includes('supabase')) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });
};

/**
 * Get the current session
 */
export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting current session:', error);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error('Exception getting session:', error);
    return null;
  }
};

/**
 * Check if the user is authenticated
 */
export const isAuthenticated = async () => {
  const session = await getCurrentSession();
  return !!session;
};
