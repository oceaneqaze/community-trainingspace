
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

interface Ebook {
  id: string;
  title: string;
  description?: string;
  file_url: string;
  file_size?: number;
  category?: string;
  created_at: string;
}

export const useEbooks = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchEbooks = async () => {
    try {
      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEbooks(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des ebooks:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les documents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  interface UploadEbookParams {
    title: string;
    description?: string;
    category?: string;
    file: File;
  }

  const uploadEbook = async (values: UploadEbookParams) => {
    try {
      // Upload file to storage
      const fileExt = values.file.name.split('.').pop();
      const filePath = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('ebooks')
        .upload(filePath, values.file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('ebooks')
        .getPublicUrl(filePath);

      // Insert ebook record
      const { error: insertError } = await supabase
        .from('ebooks')
        .insert({
          title: values.title,
          description: values.description,
          category: values.category,
          file_url: publicUrl,
          file_size: values.file.size,
          uploaded_by: user?.id,
        });

      if (insertError) throw insertError;

      // Refresh ebooks list
      fetchEbooks();
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      throw error;
    }
  };

  const deleteEbook = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ebooks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEbooks(prev => prev.filter(ebook => ebook.id !== id));
      toast({
        title: "Document supprimé",
        description: "Le document a été supprimé avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le document",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEbooks();
  }, []);

  return {
    ebooks,
    isLoading,
    uploadEbook,
    deleteEbook,
  };
};
