
import { updateUserStatus as updateStatus } from '../helpers';

export const updateUserStatus = async (
  userId: string, 
  status: { banned?: boolean, limited?: boolean }, 
  isAdmin: boolean,
  onSuccess: () => Promise<void>
) => {
  const success = await updateStatus(userId, status, isAdmin);
  
  // If updating current user, refresh profile
  if (success && onSuccess) {
    await onSuccess();
  }
  
  return success;
};
