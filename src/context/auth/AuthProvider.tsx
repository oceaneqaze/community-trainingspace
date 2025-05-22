
import React, { ReactNode, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthState, AuthContextType, UserProfile } from './types';
import { fetchUserProfile, updateUserStatus as updateStatus } from './helpers';

interface AuthProviderProps {
  children: ReactNode;
  AuthContext: React.Context<AuthContextType | undefined>;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children,
  AuthContext
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
    isAuthenticated: false,
    isLoading: true,
    session: null
  });

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session && event !== 'SIGNED_OUT') {
          const profile = await fetchUserProfile(session.user.id);
          setAuthState({
            user: session.user,
            profile,
            loading: false,
            error: null,
            isAuthenticated: true,
            isLoading: false,
            session
          });
        } else {
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null,
            isAuthenticated: false,
            isLoading: false,
            session: null
          });
        }
      }
    );

    // Initial session check
    checkSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.message,
        isLoading: false
      });
      return;
    }

    if (data.session) {
      const profile = await fetchUserProfile(data.session.user.id);
      setAuthState({
        user: data.session.user,
        profile,
        loading: false,
        error: null,
        isAuthenticated: true,
        isLoading: false,
        session: data.session
      });
    } else {
      setAuthState({
        ...authState,
        loading: false,
        isLoading: false
      });
    }
  };

  const login = async (email: string, password: string) => {
    setAuthState({ ...authState, loading: true, error: null, isLoading: true });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.message,
        isLoading: false
      });
    }

    return { data, error };
  };

  const signup = async (email: string, password: string, name?: string) => {
    setAuthState({ ...authState, loading: true, error: null, isLoading: true });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.message,
        isLoading: false
      });
    }

    return { data, error };
  };

  const logout = async () => {
    setAuthState({ ...authState, loading: true, isLoading: true });
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.message,
        isLoading: false
      });
    }
  };

  const refreshProfile = async () => {
    if (!authState.user?.id) return;
    
    setAuthState({ ...authState, loading: true, isLoading: true });
    
    const profile = await fetchUserProfile(authState.user.id);
    
    setAuthState({
      ...authState,
      profile,
      loading: false,
      isLoading: false
    });
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
    return await updateStatus(userId, status, isAdmin());
  };

  const value = {
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
