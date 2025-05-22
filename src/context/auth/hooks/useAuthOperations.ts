
import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { AuthState } from '../types';
import { login as loginOp } from '../operations/login';
import { signup as signupOp } from '../operations/signup';
import { logout as logoutOp } from '../operations/logout';
import { refreshProfile as refreshProfileOp } from '../operations/refreshProfile';
import { updateUserStatus as updateUserStatusOp } from '../operations/updateUserStatus';

export const useAuthOperations = (authState: AuthState, navigate: NavigateFunction) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await loginOp(email, password);
      // Auth state change event will handle the rest
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const result = await signupOp(email, password, name, (user, session, profile) => {
        // The state update now happens via onAuthStateChange
        setIsLoading(false);
        navigate('/videos');
      });
      
      // Return the result so that Signup.tsx can access data and error properties
      return result;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const handleLogout = async () => {
    await logoutOp(() => {
      // The state update now happens via onAuthStateChange
      navigate('/');
    });
  };

  const refreshProfile = async () => {
    if (!authState.user?.id) return null;
    
    const profile = await refreshProfileOp(authState.user.id);
    return profile;
  };

  const handleUpdateUserStatus = async (
    userId: string, 
    status: { banned?: boolean, limited?: boolean, role?: 'admin' | 'member' }
  ) => {
    await updateUserStatusOp(
      userId, 
      status, 
      authState.profile?.role === 'admin', 
      async () => {
        if (userId === authState.user?.id) {
          await refreshProfile();
        }
      }
    );
  };

  return {
    handleLogin,
    handleSignup,
    handleLogout,
    refreshProfile,
    handleUpdateUserStatus
  };
};
