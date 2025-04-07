
import { User, Session } from '@supabase/supabase-js';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  avatar_url?: string;
  banned?: boolean;
  limited?: boolean;
  invitation_code?: string;
  invitation_used?: boolean;
  created_at?: string; // Add this field
};

export type AuthState = {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  refreshProfile: () => Promise<void>;
  isBanned: () => boolean;
  isLimited: () => boolean;
  updateUserStatus: (userId: string, status: { banned?: boolean, limited?: boolean, role?: 'admin' | 'member' }) => Promise<void>;
};
