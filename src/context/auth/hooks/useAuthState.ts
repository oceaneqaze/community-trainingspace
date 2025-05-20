
import { useState, useEffect } from 'react';
import { AuthState } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { fetchUserProfile, checkUserBanned } from '../helpers';

// Initial state
export const initialState: AuthState = {
  user: null,
  profile: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthState = (navigate: (path: string) => void) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    let mounted = true;
    
    console.log("Setting up auth state listeners");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (!mounted) return;
        
        if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setAuthState({
            ...initialState,
            isLoading: false,
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
              
              // Handle banned users
              if (profile && await checkUserBanned(profile, async () => {
                const { error } = await supabase.auth.signOut();
                if (error) console.error('Error signing out:', error);
              })) {
                setAuthState({
                  ...initialState,
                  isLoading: false,
                });
                return;
              }
              
              setAuthState(prev => ({
                ...prev,
                profile,
                isLoading: false,
              }));
              
              console.log("Auth state updated with profile:", { 
                userId: session.user.id, 
                hasProfile: !!profile,
                isLoading: false
              });
            } catch (error) {
              console.error("Error fetching profile:", error);
              setAuthState(prev => ({
                ...prev,
                isLoading: false,
              }));
            }
          }, 0);
        } else {
          console.log("Session is null, user is logged out");
          setAuthState({
            ...initialState,
            isLoading: false,
          });
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth state");
        const { data: { session } } = await supabase.auth.getSession();
        
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
          
          try {
            const profile = await fetchUserProfile(session.user.id);
            
            // Handle banned users
            if (profile && await checkUserBanned(profile, async () => {
              const { error } = await supabase.auth.signOut();
              if (error) console.error('Error signing out:', error);
            })) {
              setAuthState({
                ...initialState,
                isLoading: false,
              });
              return;
            }
            
            setAuthState(prev => ({
              ...prev,
              profile,
              isLoading: false,
            }));
            
            console.log("Auth initialized with profile:", { 
              userId: session.user.id, 
              hasProfile: !!profile 
            });
          } catch (error) {
            console.error("Error fetching profile during initialization:", error);
            setAuthState(prev => ({
              ...prev,
              isLoading: false,
            }));
          }
        } else {
          console.log("No session found during initialization");
          setAuthState({
            ...initialState,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        if (mounted) {
          setAuthState({
            ...initialState,
            isLoading: false,
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
