
import React, { createContext, useContext, ReactNode } from 'react';
import { AuthContextType } from './auth/types';
import { AuthProvider as AuthProviderComponent } from './auth/AuthProvider';

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

// Re-export the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <AuthProviderComponent AuthContext={AuthContext}>{children}</AuthProviderComponent>;
};

// Export the context for direct access if needed
export { AuthContext };
