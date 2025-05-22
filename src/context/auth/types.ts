
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  banned?: boolean;
  limited?: boolean;
  role?: 'admin' | 'member';
  invitation_code?: string;
  invitation_used?: boolean;
  created_at: string;
}

export interface AuthState {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  session: any;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{data: any, error: any}>;
  signup: (email: string, password: string, name?: string) => Promise<{data: any, error: any}>;
  logout: () => Promise<{error: any | null}>;  // Updated return type
  isAdmin: () => boolean;
  refreshProfile: () => Promise<UserProfile | null>;  // Updated return type
  isBanned: () => boolean;
  isLimited: () => boolean;
  updateUserStatus: (
    userId: string,
    status: { banned?: boolean; limited?: boolean; role?: 'admin' | 'member' }
  ) => Promise<boolean>;
}
