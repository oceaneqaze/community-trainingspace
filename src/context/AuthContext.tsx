
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  avatar?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
};

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// Mock admin user (this would come from your backend in a real application)
const mockAdmin: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Check for existing session (e.g., from localStorage)
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the token with your backend
        const savedUser = localStorage.getItem('user');
        
        if (savedUser) {
          setAuthState({
            user: JSON.parse(savedUser),
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
        console.error('Authentication check failed:', error);
        setAuthState({
          ...initialState,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock implementation. In a real app, you would call your API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login - In a real app, validate credentials with your backend
      if (email === 'admin@example.com' && password === 'password') {
        // Set user in state
        setAuthState({
          user: mockAdmin,
          isAuthenticated: true,
          isLoading: false,
        });
        
        // Save to localStorage (for persistence)
        localStorage.setItem('user', JSON.stringify(mockAdmin));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear user data
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const isAdmin = () => {
    return authState.user?.role === 'admin';
  };

  const value = {
    ...authState,
    login,
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
