
import { UserProfile } from '../types';

export const isAdmin = (profile: UserProfile | null) => {
  return profile?.role === 'admin';
};

export const isBanned = (profile: UserProfile | null) => {
  return !!profile?.banned;
};

export const isLimited = (profile: UserProfile | null) => {
  return !!profile?.limited;
};
