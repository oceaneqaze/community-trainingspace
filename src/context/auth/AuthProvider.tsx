
import React, { ReactNode, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthState, AuthContextType, UserProfile } from './types';
import { fetchUserProfile, updateUserStatus as updateStatus } from './helpers';
import { cleanupAuthState } from '@/utils/authUtils';

interface AuthProviderProps {
  children: ReactNode;
  AuthContext: React.Context<AuthContextType | undefined>;
}

// Initial state
const initialState: AuthState = {
  user: null,
  profile: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  loading: false, // Will be removed in a future refactoring
  error: null
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children,
  AuthContext
}) => {
  const [authState, setAuthState] = React.useState<AuthState>(initialState);

  React.useEffect(() => {
    let mounted = true;
    
    console.log("Setting up auth state listeners");
    
    // Clean up existing auth state to prevent conflicts in development environments
    if (window.location.hostname === 'localhost') {
      cleanupAuthState();
    }
    
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
            loading: false
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
                  loading: false
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
                  loading: false,
                  error: error instanceof Error ? error.message : 'Unknown error fetching profile'
                }));
              }
            }
          }, 0);
        } else {
          console.log("Session is null, user is logged out");
          setAuthState({
            ...initialState,
            isLoading: false,
            loading: false
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
              loading: false,
              error: error.message
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
                  loading: false
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
                  loading: false,
                  error: error instanceof Error ? error.message : 'Unknown error fetching profile'
                }));
              }
            }
          }, 0);
        } else {
          console.log("No session found during initialization");
          setAuthState({
            ...initialState,
            isLoading: false,
            loading: false
          });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        if (mounted) {
          setAuthState({
            ...initialState,
            isLoading: false,
            loading: false,
            error: error instanceof Error ? error.message : 'Unknown error checking authentication'
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
  }, []);

  // Authentication operations
  const login = async (email: string, password: string) => {
    setAuthState({ ...authState, isLoading: true, loading: true, error: null });
    
    try {
      console.log("Login operation started for:", email);
      
      // Only clean up auth state in development environments
      if (window.location.hostname === 'localhost') {
        cleanupAuthState();
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      // Auth state will be updated by the onAuthStateChange listener
      return { data, error: null };
    } catch (error: any) {
      console.error('Login error:', error.message);
      
      setAuthState(prev => ({
        ...prev, 
        isLoading: false, 
        loading: false,
        error: error.message
      }));
      
      return { data: null, error };
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    setAuthState({ ...authState, isLoading: true, loading: true, error: null });
    
    try {
      // Only clean up auth state in development environments
      if (window.location.hostname === 'localhost') {
        cleanupAuthState();
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });

      if (error) throw error;
      
      // Auth state will be updated by the onAuthStateChange listener
      return { data, error: null };
    } catch (error: any) {
      console.error('Signup error:', error.message);
      
      setAuthState(prev => ({
        ...prev, 
        isLoading: false, 
        loading: false,
        error: error.message
      }));
      
      return { data: null, error };
    }
  };

  const logout = async (): Promise<{error: any | null}> => {
    setAuthState({ ...authState, isLoading: true, loading: true });
    
    try {
      console.log('Logout operation started');
      
      // Only clean up auth state in development environments
      if (window.location.hostname === 'localhost') {
        cleanupAuthState();
      }
      
      // Perform sign out
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) throw error;
      
      // Auth state will be updated by the onAuthStateChange listener
      return { error: null };
    } catch (error: any) {
      console.error('Logout error:', error.message);
      
      setAuthState(prev => ({
        ...prev, 
        isLoading: false, 
        loading: false,
        error: error.message
      }));
      
      return { error };
    }
  };

  const refreshProfile = async (): Promise<UserProfile | null> => {
    if (!authState.user?.id) return null;
    
    setAuthState({ ...authState, isLoading: true, loading: true });
    
    try {
      const profile = await fetchUserProfile(authState.user.id);
      
      setAuthState(prev => ({
        ...prev,
        profile,
        isLoading: false,
        loading: false
      }));
      
      return profile;
    } catch (error) {
      console.error('Error refreshing profile:', error);
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error refreshing profile'
      }));
      
      return null;
    }
  };

  const isAdmin = () => {
    return authState.profile?.role === 'admin';
  };

  const isBanned = () => {
    return !!authState.profile?.banned;
  };

  const isLimited = () => {
    return !!authState.profile?.limited;
  };

  const updateUserStatus = async (
    userId: string,
    status: { banned?: boolean; limited?: boolean; role?: 'admin' | 'member' }
  ) => {
    const success = await updateStatus(userId, status, isAdmin());
    
    // If updating current user, refresh profile
    if (success && userId === authState.user?.id) {
      await refreshProfile();
    }
    
    return success;
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    isAdmin,
    refreshProfile,
    isBanned,
    isLimited,
    updateUserStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
