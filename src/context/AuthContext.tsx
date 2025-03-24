import React, { createContext, useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session) {
            const profile = await fetchUserProfile(session.user.id);
            setAuthState({
              user: session.user,
              profile,
              session,
              isAuthenticated: true,
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

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const profile = await fetchUserProfile(session.user.id);
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
        setAuthState({
          ...initialState,
          isLoading: false,
        });
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const profile = await fetchUserProfile(data.user.id);
      
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
          description: `Bienvenue, ${profile.name || email}`,
        });
        
        navigate('/videos');
      }
    } catch (error: any) {
      console.error('Login error:', error.message);
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
        toast({
          title: "Vérification requise",
          description: "Veuillez vérifier votre email pour confirmer votre compte.",
        });
      }
    } catch (error: any) {
      console.error('Signup error:', error.message);
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

  const isAdmin = () => {
    return authState.profile?.role === 'admin';
  };

  const value = {
    ...authState,
    login,
    signup,
    logout,
    isAdmin,
  };

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
