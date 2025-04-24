
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
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (!mounted) return;
        
        if (session) {
          try {
            // First update the basic auth state synchronously
            setAuthState(prev => ({
              ...prev,
              user: session.user,
              session,
              isAuthenticated: true,
            }));
            
            // Fetch profile separately to avoid deadlock
            setTimeout(async () => {
              if (!mounted) return;
              const profile = await fetchUserProfile(session.user.id);
              
              // Handle banned users
              if (await checkUserBanned(profile, async () => {
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
            }, 0);

            // Navigate to videos page after successful login
            if (event === 'SIGNED_IN') {
              navigate('/videos');
            }
          } catch (error) {
            console.error('Error handling auth state change:', error);
            setAuthState({
              ...initialState,
              isLoading: false,
            });
          }
        } else {
          setAuthState({
            ...initialState,
            isLoading: false,
          });
        }
      }
    );

    // Initial auth check
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (session) {
          setAuthState(prev => ({
            ...prev,
            user: session.user,
            session,
            isAuthenticated: true,
          }));
          
          const profile = await fetchUserProfile(session.user.id);
          
          // Handle banned users
          if (await checkUserBanned(profile, async () => {
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
        } else {
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
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return {
    authState,
    setAuthState,
  };
};
