
import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { AuthState } from '../types';
import { signup as signupOp } from '../operations/signup';

// We'll reuse the auth context's operations directly to avoid duplication
export const useAuthOperations = (authState: AuthState, navigate: NavigateFunction) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    // This function is now a wrapper that will be replaced in a future refactor
    // For now, we throw an error to ensure we don't have multiple login implementations
    throw new Error("Use auth context's login function directly");
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const result = await signupOp(email, password, name, (user, session, profile) => {
        setIsLoading(false);
        navigate('/videos');
      });
      
      return result;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const handleLogout = async () => {
    // This function is now a wrapper that will be replaced in a future refactor
    // For now, we throw an error to ensure we don't have multiple logout implementations
    throw new Error("Use auth context's logout function directly");
  };

  return {
    handleLogin,
    handleSignup,
    handleLogout,
    isLoading
  };
};
