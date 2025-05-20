
/**
 * This utility file provides helper functions for authentication
 */

import { supabase } from '@/integrations/supabase/client';

/**
 * Thoroughly clean up auth state to prevent limbo states
 */
export const cleanupAuthState = () => {
  console.log("Cleaning up auth state");
  
  // Skip cleaning auth state on production to avoid redirect loops
  if (window.location.hostname !== 'localhost') {
    console.log("Skipping auth cleanup on production domain");
    return;
  }

  // Clear all storage to ensure clean state
  try {
    // Clear localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        console.log(`Removing from localStorage: ${key}`);
        localStorage.removeItem(key);
      }
    });
    
    // Clear sessionStorage
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        console.log(`Removing from sessionStorage: ${key}`);
        sessionStorage.removeItem(key);
      }
    });
  } catch (e) {
    console.error("Error during cleanup:", e);
  }
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
