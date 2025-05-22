
import React, { ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType } from './types';
import { useAuthOperations } from './hooks/useAuthOperations';
import { useAuthState } from './hooks/useAuthState';
import { isAdmin, isBanned, isLimited } from './utils/authUtils';

interface AuthProviderProps {
  children: ReactNode;
  AuthContext: React.Context<AuthContextType | undefined>;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, AuthContext }) => {
  const navigate = useNavigate();
  const { authState } = useAuthState(navigate);
  const { 
    handleLogin, 
    handleSignup, 
    handleLogout, 
    refreshProfile, 
    handleUpdateUserStatus 
  } = useAuthOperations(authState, navigate);

  const authUtils = {
    isAdmin: () => isAdmin(authState.profile),
    isBanned: () => isBanned(authState.profile),
    isLimited: () => isLimited(authState.profile)
  };

  const contextValue: AuthContextType = {
    ...authState,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    isAdmin: authUtils.isAdmin,
    refreshProfile,
    isBanned: authUtils.isBanned,
    isLimited: authUtils.isLimited,
    updateUserStatus: handleUpdateUserStatus
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
