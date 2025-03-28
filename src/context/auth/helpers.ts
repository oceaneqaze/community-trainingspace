
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from './types';
import { toast } from '@/components/ui/use-toast';

// Fetch user profile data from Supabase
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
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

    return data as UserProfile;
  } catch (error) {
    console.error('Error in fetchUserProfile:', error);
    return null;
  }
};

// Check if a user is banned and handle the logout if needed
export const checkUserBanned = async (profile: UserProfile | null, signOut: () => Promise<void>) => {
  if (profile?.banned) {
    // If user is banned, log them out
    await signOut();
    toast({
      title: "Accès refusé",
      description: "Votre compte a été suspendu.",
      variant: "destructive",
    });
    return true;
  }
  return false;
};

// Update a user's status (banned or limited)
export const updateUserStatus = async (
  userId: string, 
  status: { banned?: boolean, limited?: boolean },
  isAdmin: boolean
) => {
  if (!isAdmin) {
    toast({
      title: "Accès refusé",
      description: "Vous n'avez pas les droits d'administrateur.",
      variant: "destructive",
    });
    return false;
  }
  
  try {
    // Use type assertion to work around the type checking limitation
    const updateData: any = {};
    
    if (status.banned !== undefined) {
      updateData.banned = status.banned;
    }
    
    if (status.limited !== undefined) {
      updateData.limited = status.limited;
    }
    
    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);
      
    if (error) throw error;
    
    toast({
      title: "Statut mis à jour",
      description: "Le statut de l'utilisateur a été mis à jour avec succès.",
    });
    
    return true;
  } catch (error: any) {
    console.error('Error updating user status:', error.message);
    toast({
      title: "Erreur",
      description: error.message || "Impossible de mettre à jour le statut",
      variant: "destructive",
    });
    return false;
  }
};
