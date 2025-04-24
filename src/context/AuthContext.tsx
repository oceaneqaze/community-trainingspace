
import React, { createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, AuthState } from './auth/types';
import { isAdmin as checkIsAdmin, isBanned as checkIsBanned, isLimited as checkIsLimited } from './auth/utils/authUtils';
import { login as loginOp } from './auth/operations/login';
import { signup as signupOp } from './auth/operations/signup';
import { logout as logoutOp } from './auth/operations/logout';
import { refreshProfile as refreshProfileOp } from './auth/operations/refreshProfile';
import { updateUserStatus as updateUserStatusOp } from './auth/operations/updateUserStatus';
import { useAuthState } from './auth/hooks/useAuthState';

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
    const { authState, setAuthState } = useAuthState(navigate);

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
  // This is a placeholder component that maintains the interface
  // The actual provider will be created in App.tsx with the navigate function
  return <>{children}</>;
};
