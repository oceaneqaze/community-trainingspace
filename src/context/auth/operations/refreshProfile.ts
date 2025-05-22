
import { fetchUserProfile } from '../helpers';
import { UserProfile } from '../types';

export const refreshProfile = async (userId: string | undefined): Promise<UserProfile | null> => {
  if (!userId) return null;
  
  try {
    return await fetchUserProfile(userId);
  } catch (error) {
    console.error('Error refreshing profile:', error);
    return null;
  }
};
