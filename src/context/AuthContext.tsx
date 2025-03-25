
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Types
type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  avatar_url?: string;
  banned?: boolean;
  limited?: boolean;
};

type AuthState = {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  refreshProfile: () => Promise<void>;
  isBanned: () => boolean;
  isLimited: () => boolean;
  updateUserStatus: (userId: string, status: { banned?: boolean, limited?: boolean }) => Promise<void>;
};

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

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  // Optimized auth state checking
  useEffect(() => {
    let mounted = true;
    
    // First, try to get session from storage to avoid flickering
    const savedSession = supabase.auth.getSession();
    
    // Set up auth state listener with optimized handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (!mounted) return;
        
        if (session) {
          try {
            const profile = await fetchUserProfile(session.user.id);
            
            if (profile?.banned) {
              // If user is banned, log them out
              await supabase.auth.signOut();
              toast({
                title: "Accès refusé",
                description: "Votre compte a été suspendu.",
                variant: "destructive",
              });
              setAuthState({
                ...initialState,
                isLoading: false,
              });
              return;
            }
            
            setAuthState({
              user: session.user,
              profile,
              session,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            console.error('Error handling auth state change:', error);
            setAuthState({
              ...initialState,
              isLoading: false,
            });
          }
        } else if (event === 'SIGNED_OUT') {
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
        const { data: { session } } = await savedSession;
        
        if (!mounted) return;
        
        if (session) {
          const profile = await fetchUserProfile(session.user.id);
          
          if (profile?.banned) {
            // If user is banned, log them out
            await supabase.auth.signOut();
            toast({
              title: "Accès refusé",
              description: "Votre compte a été suspendu.",
              variant: "destructive",
            });
            setAuthState({
              ...initialState,
              isLoading: false,
            });
            return;
          }
          
          setAuthState({
            user: session.user,
            profile,
            session,
            isAuthenticated: true,
            isLoading: false,
          });
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
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const profile = await fetchUserProfile(data.user.id);
      
      if (profile?.banned) {
        await supabase.auth.signOut();
        toast({
          title: "Accès refusé",
          description: "Votre compte a été suspendu.",
          variant: "destructive",
        });
        setAuthState({
          ...initialState,
          isLoading: false,
        });
        throw new Error("Votre compte a été suspendu.");
      }
      
      if (profile) {
        setAuthState({
          user: data.user,
          profile,
          session: data.session,
          isAuthenticated: true,
          isLoading: false,
        });
        
        toast({
          title: "Connexion réussie",
          description: `Bienvenue sur DOPE CONTENT, ${profile.name || email}`,
        });
        
        navigate('/videos');
      }
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

  const updateUserStatus = async (userId: string, status: { banned?: boolean, limited?: boolean }) => {
    if (!isAdmin()) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'administrateur.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(status)
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: "Statut mis à jour",
        description: "Le statut de l'utilisateur a été mis à jour avec succès.",
      });
      
      // If updating current user, refresh profile
      if (userId === authState.user?.id) {
        await refreshProfile();
      }
    } catch (error: any) {
      console.error('Error updating user status:', error.message);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
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
    updateUserStatus
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
