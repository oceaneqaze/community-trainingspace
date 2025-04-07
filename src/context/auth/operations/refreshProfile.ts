
import { fetchUserProfile } from '../helpers';

export const refreshProfile = async (userId: string | undefined) => {
  if (!userId) return null;
  
  try {
    return await fetchUserProfile(userId);
  } catch (error) {
    console.error('Error refreshing profile:', error);
    return null;
  }
};
