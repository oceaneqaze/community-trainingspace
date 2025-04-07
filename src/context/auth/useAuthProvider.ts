
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialState, useAuthState } from './hooks/useAuthState';
import { login } from './operations/login';
import { signup } from './operations/signup';
import { logout } from './operations/logout';
import { refreshProfile as refreshProfileOp } from './operations/refreshProfile';
import { updateUserStatus as updateUserStatusOp } from './operations/updateUserStatus';
import { isAdmin as checkIsAdmin, isBanned as checkIsBanned, isLimited as checkIsLimited } from './utils/authUtils';

export const useAuthProvider = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuthState(navigate);

  const handleLogin = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await login(email, password);
      // Auth state change event will handle the rest
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await signup(email, password, name, (user, session, profile) => {
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
    await logout(() => {
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

  const handleUpdateUserStatus = async (userId: string, status: { banned?: boolean, limited?: boolean }) => {
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

  return useMemo(() => ({
    ...authState,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    isAdmin,
    refreshProfile,
    isBanned,
    isLimited,
    updateUserStatus: handleUpdateUserStatus
  }), [authState]);
};
