import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType } from './auth/types';
import { isAdmin as checkIsAdmin, isBanned as checkIsBanned, isLimited as checkIsLimited } from './auth/utils/authUtils';
import { login as loginOp } from './auth/operations/login';
import { signup as signupOp } from './auth/operations/signup';
import { logout as logoutOp } from './auth/operations/logout';
import { refreshProfile as refreshProfileOp } from './auth/operations/refreshProfile';
import { updateUserStatus as updateUserStatusOp } from './auth/operations/updateUserStatus';
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState } from '@/utils/authUtils';

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

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;
    
    console.log("Setting up auth state listeners");
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event, newSession?.user?.id);
        
        if (!mounted) return;
        
        if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setUser(null);
          setSession(null);
          setProfile(null);
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        
        if (newSession) {
          // Update the basic auth state synchronously
          setUser(newSession.user);
          setSession(newSession);
          setIsAuthenticated(true);
          
          // Fetch profile separately using setTimeout
          setTimeout(async () => {
            if (!mounted) return;
            
            try {
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', newSession.user.id)
                .single();
              
              if (mounted) {
                setProfile(profileData);
                setIsLoading(false);
                
                console.log("Auth state updated with profile:", { 
                  userId: newSession.user.id, 
                  hasProfile: !!profileData,
                  role: profileData?.role,
                  isLoading: false
                });
              }
            } catch (error) {
              console.error("Error fetching profile:", error);
              if (mounted) {
                setIsLoading(false);
              }
            }
          }, 0);
        } else {
          console.log("Session is null, user is logged out");
          setUser(null);
          setSession(null);
          setProfile(null);
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth state");
        
        const { data: { session: existingSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          if (mounted) {
            setIsLoading(false);
          }
          return;
        }
        
        if (!mounted) return;
        
        if (existingSession) {
          console.log("Found existing session:", existingSession.user.id);
          
          // Update the basic auth state
          setUser(existingSession.user);
          setSession(existingSession);
          setIsAuthenticated(true);
          
          // Fetch profile separately
          setTimeout(async () => {
            if (!mounted) return;
            
            try {
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', existingSession.user.id)
                .single();
              
              if (mounted) {
                setProfile(profileData);
                setIsLoading(false);
                
                console.log("Auth initialized with profile:", { 
                  userId: existingSession.user.id, 
                  hasProfile: !!profileData,
                  role: profileData?.role
                });
              }
            } catch (error) {
              console.error("Error fetching profile during initialization:", error);
              if (mounted) {
                setIsLoading(false);
              }
            }
          }, 0);
        } else {
          console.log("No session found during initialization");
          if (mounted) {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    
    initializeAuth();

    return () => {
      console.log("Cleaning up auth state listeners");
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Auth operations
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
        setUser(user);
        setProfile(profile);
        setSession(session);
        setIsAuthenticated(true);
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
      setUser(null);
      setProfile(null);
      setSession(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate('/');
    });
  };

  const refreshProfile = async () => {
    if (!user?.id) return;
    
    const profile = await refreshProfileOp(user.id);
    if (profile) {
      setProfile(profile);
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
        if (userId === user?.id) {
          await refreshProfile();
        }
      }
    );
  };

  const isAdmin = () => {
    return checkIsAdmin(profile);
  };
  
  const isBanned = () => {
    return checkIsBanned(profile);
  };
  
  const isLimited = () => {
    return checkIsLimited(profile);
  };

  const authState = {
    user,
    profile,
    session,
    isAuthenticated,
    isLoading
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
