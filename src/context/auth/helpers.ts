
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from './types';

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchUserProfile:', error);
    return null;
  }
}

export async function updateUserStatus(
  userId: string, 
  status: { banned?: boolean; limited?: boolean; role?: 'admin' | 'member' },
  isAdmin: boolean
): Promise<boolean> {
  try {
    if (!isAdmin) {
      console.error('Only admins can update user status');
      return false;
    }
    
    const { error } = await supabase
      .from('profiles')
      .update(status)
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating user status:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateUserStatus:', error);
    return false;
  }
}
