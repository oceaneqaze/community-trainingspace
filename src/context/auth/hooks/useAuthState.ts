
import { useState, useEffect } from 'react';
import { AuthState } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { fetchUserProfile } from '../helpers';
import { cleanupAuthState } from '@/utils/authUtils';

// Initial state
export const initialState: AuthState = {
  user: null,
  profile: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  loading: true,  // Added this property
  error: null     // Added this property
};

export const useAuthState = (navigate: (path: string) => void) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    let mounted = true;
    
    console.log("Setting up auth state listeners");
    
    // Clean up existing auth state to prevent conflicts
    cleanupAuthState();
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (!mounted) return;
        
        if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setAuthState({
            ...initialState,
            isLoading: false,
            loading: false, // Update loading state
          });
          return;
        }
        
        if (session) {
          // First update the basic auth state synchronously
          setAuthState(prev => ({
            ...prev,
            user: session.user,
            session,
            isAuthenticated: true,
          }));
          
          // Fetch profile separately using setTimeout to prevent potential deadlocks
          setTimeout(async () => {
            if (!mounted) return;
            
            try {
              const profile = await fetchUserProfile(session.user.id);
              
              if (mounted) {
                setAuthState(prev => ({
                  ...prev,
                  profile,
                  isLoading: false,
                  loading: false, // Update loading state
                }));
                
                console.log("Auth state updated with profile:", { 
                  userId: session.user.id, 
                  hasProfile: !!profile,
                  role: profile?.role,
                  isLoading: false
                });
              }
            } catch (error) {
              console.error("Error fetching profile:", error);
              if (mounted) {
                setAuthState(prev => ({
                  ...prev,
                  isLoading: false,
                  loading: false, // Update loading state
                  error: error instanceof Error ? error.message : 'Unknown error fetching profile' // Update error state
                }));
              }
            }
          }, 0);
        } else {
          console.log("Session is null, user is logged out");
          setAuthState({
            ...initialState,
            isLoading: false,
            loading: false, // Update loading state
          });
        }
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth state");
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          if (mounted) {
            setAuthState({
              ...initialState,
              isLoading: false,
              loading: false, // Update loading state
              error: error.message // Update error state
            });
          }
          return;
        }
        
        if (!mounted) return;
        
        if (session) {
          console.log("Found existing session:", session.user.id);
          
          // First update the basic auth state
          setAuthState(prev => ({
            ...prev,
            user: session.user,
            session,
            isAuthenticated: true,
          }));
          
          // Fetch profile separately
          setTimeout(async () => {
            if (!mounted) return;
            
            try {
              const profile = await fetchUserProfile(session.user.id);
              
              if (mounted) {
                setAuthState(prev => ({
                  ...prev,
                  profile,
                  isLoading: false,
                  loading: false, // Update loading state
                }));
                
                console.log("Auth initialized with profile:", { 
                  userId: session.user.id, 
                  hasProfile: !!profile,
                  role: profile?.role
                });
              }
            } catch (error) {
              console.error("Error fetching profile during initialization:", error);
              if (mounted) {
                setAuthState(prev => ({
                  ...prev,
                  isLoading: false,
                  loading: false, // Update loading state
                  error: error instanceof Error ? error.message : 'Unknown error fetching profile' // Update error state
                }));
              }
            }
          }, 0);
        } else {
          console.log("No session found during initialization");
          setAuthState({
            ...initialState,
            isLoading: false,
            loading: false, // Update loading state
          });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        if (mounted) {
          setAuthState({
            ...initialState,
            isLoading: false,
            loading: false, // Update loading state
            error: error instanceof Error ? error.message : 'Unknown error checking authentication' // Update error state
          });
        }
      }
    };
    
    initializeAuth();

    return () => {
      console.log("Cleaning up auth state listeners");
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return {
    authState,
    setAuthState,
  };
};
