
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface AddMemberData {
  name: string;
  email: string;
  role: 'admin' | 'member';
}

export const useAddMember = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addMember = async (memberData: AddMemberData) => {
    setIsLoading(true);
    
    try {
      // Générer un mot de passe temporaire sécurisé
      const tempPassword = crypto.randomUUID() + Math.random().toString(36);
      
      // Créer le compte utilisateur avec l'API admin de Supabase
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: memberData.email,
        password: tempPassword,
        user_metadata: {
          name: memberData.name
        },
        email_confirm: true // Auto-confirmer l'email
      });

      if (authError) throw authError;

      if (authData.user) {
        // Créer le profil dans la table profiles
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            name: memberData.name,
            email: memberData.email,
            role: memberData.role,
            invitation_code: crypto.randomUUID(),
            invitation_used: true,
            created_at: new Date().toISOString()
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          throw profileError;
        }

        toast({
          title: "Membre ajouté avec succès",
          description: `${memberData.name} a été ajouté à la plateforme.`,
        });

        return { success: true, user: authData.user };
      }
    } catch (error: any) {
      console.error('Error adding member:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'ajout du membre",
        variant: "destructive",
      });
      
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addMember,
    isLoading
  };
};
