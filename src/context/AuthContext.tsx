
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContextType, AuthState } from './auth/types';
import { supabase } from '@/integrations/supabase/client';
import { fetchUserProfile, checkUserBanned } from './auth/helpers';
import { isAdmin as checkIsAdmin, isBanned as checkIsBanned, isLimited as checkIsLimited } from './auth/utils/authUtils';
import { login as loginOp } from './auth/operations/login';
import { signup as signupOp } from './auth/operations/signup';
import { logout as logoutOp } from './auth/operations/logout';
import { refreshProfile as refreshProfileOp } from './auth/operations/refreshProfile';
import { updateUserStatus as updateUserStatusOp } from './auth/operations/updateUserStatus';

// Initial state
export const initialState: AuthState = {
  user: null,
  profile: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Function to create the auth provider
// This is separated from the component to avoid React hook rules issues
export const createAuthProvider = (navigate: (to: string) => void) => {
  // Provider component
  const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const location = useLocation();
    const [authState, setAuthState] = useState<AuthState>(initialState);

    // Set up the authentication listener
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
    }, []);

    // Auth operations
    const handleLogin = async (email: string, password: string) => {
      try {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        await loginOp(email, password);
        // Auth state change event will handle the rest
      } catch (error) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        throw error;
      }
    };

    const handleSignup = async (email: string, password: string, name: string) => {
      try {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        await signupOp(email, password, name, (user, session, profile) => {
          setAuthState({
            user,
            profile,
            session,
            isAuthenticated: true,
            isLoading: false,
          });
          navigate('/videos');
        });
      } catch (error) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        throw error;
      }
    };

    const handleLogout = async () => {
      await logoutOp(() => {
        setAuthState({
          user: null,
          profile: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
        });
        navigate('/');
      });
    };

    const refreshProfile = async () => {
      if (!authState.user?.id) return;
      
      const profile = await refreshProfileOp(authState.user.id);
      if (profile) {
        setAuthState(prev => ({
          ...prev,
          profile
        }));
      }
    };

    const handleUpdateUserStatus = async (
      userId: string, 
      status: { banned?: boolean, limited?: boolean, role?: 'admin' | 'member' }
    ) => {
      await updateUserStatusOp(
        userId, 
        status, 
        isAdmin(), 
        async () => {
          if (userId === authState.user?.id) {
            await refreshProfile();
          }
        }
      );
    };

    const isAdmin = () => {
      return checkIsAdmin(authState.profile);
    };
    
    const isBanned = () => {
      return checkIsBanned(authState.profile);
    };
    
    const isLimited = () => {
      return checkIsLimited(authState.profile);
    };

    const contextValue = {
      ...authState,
      login: handleLogin,
      signup: handleSignup,
      logout: handleLogout,
      isAdmin,
      refreshProfile,
      isBanned,
      isLimited,
      updateUserStatus: handleUpdateUserStatus
    };

    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  return AuthProvider;
};

// Export a wrapper component that will be used in App.tsx
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // This is a placeholder to maintain the interface
  // The actual provider will be created in App.tsx with the navigate function
  return <>{children}</>;
};
