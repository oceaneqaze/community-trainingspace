
// Add or update the AuthContextType interface to include the correct return type for signup

export interface AuthContextType {
  user: any;
  profile: any;
  session: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<{
    data: any;
    error: any;
  } | undefined>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  refreshProfile: () => Promise<any>;
  isBanned: () => boolean;
  isLimited: () => boolean;
  updateUserStatus: (userId: string, status: { 
    banned?: boolean;
    limited?: boolean;
    role?: 'admin' | 'member';
  }) => Promise<void>;
}
