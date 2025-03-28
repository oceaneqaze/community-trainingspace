
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { AuthContextType, AuthState, UserProfile } from '@/types/auth.types';
import { fetchUserProfile, checkUserBanned, updateUserStatus as updateStatus } from '@/utils/authHelpers';

// Initial state
const initialState: AuthState = {
  user: null,
  profile: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (!mounted) return;
        
        if (session) {
          try {
            // Use setTimeout to prevent potential deadlock
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
              if (await checkUserBanned(profile, supabase.auth.signOut)) {
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
          if (await checkUserBanned(profile, supabase.auth.signOut)) {
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

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Auth state change will handle session and navigation
      // We just show a success toast here
      toast({
        title: "Connexion réussie",
        description: `Bienvenue sur DOPE CONTENT, ${email}`,
      });
    } catch (error: any) {
      console.error('Login error:', error.message);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast({
        title: "Échec de la connexion",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      });
      
      // If email confirmation is disabled, we can log the user in immediately
      if (data.session) {
        const profile = await fetchUserProfile(data.user.id);
        setAuthState({
          user: data.user,
          profile,
          session: data.session,
          isAuthenticated: true,
          isLoading: false,
        });
        navigate('/videos');
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        toast({
          title: "Vérification requise",
          description: "Veuillez vérifier votre email pour confirmer votre compte.",
        });
      }
    } catch (error: any) {
      console.error('Signup error:', error.message);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast({
        title: "Échec de l'inscription",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setAuthState({
        user: null,
        profile: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      });
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error.message);
      toast({
        title: "Échec de la déconnexion",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const refreshProfile = async () => {
    if (!authState.user?.id) return;
    
    try {
      const profile = await fetchUserProfile(authState.user.id);
      if (profile) {
        setAuthState(prev => ({
          ...prev,
          profile
        }));
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const handleUpdateUserStatus = async (userId: string, status: { banned?: boolean, limited?: boolean }) => {
    const success = await updateStatus(userId, status, isAdmin());
    
    // If updating current user, refresh profile
    if (success && userId === authState.user?.id) {
      await refreshProfile();
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

  const value = useMemo(() => ({
    ...authState,
    login,
    signup,
    logout,
    isAdmin,
    refreshProfile,
    isBanned,
    isLimited,
    updateUserStatus: handleUpdateUserStatus
  }), [authState]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
