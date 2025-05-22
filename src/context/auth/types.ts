
// Add or update the AuthContextType interface to include the correct return type for signup

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  avatar_url?: string;
  banned?: boolean;
  limited?: boolean;
  invitation_code?: string;
  invitation_used?: boolean;
  created_at?: string;
}

export interface AuthState {
  user: any;
  profile: UserProfile | null;
  session: any;
  isAuthenticated: boolean;
  isLoading: boolean;
}

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
