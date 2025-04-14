
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Resource } from '@/types/resource.types';
import { toast } from '@/components/ui/use-toast';
import { useFileUpload } from '@/hooks/useFileUpload';
import { v4 as uuidv4 } from 'uuid';

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { uploadFile, status: uploadStatus } = useFileUpload();

  const fetchResourcesByVideo = async (videoId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('video_resources')
        .select('*')
        .eq('video_id', videoId);

      if (error) throw error;
      setResources(data as Resource[]);
    } catch (error) {
      console.error('Erreur lors du chargement des ressources:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les ressources associées à cette vidéo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadResource = async (file: File, videoId: string, title: string, description?: string) => {
    if (!file || !videoId) {
      toast({
        title: "Erreur",
        description: "Fichier et ID de vidéo requis",
        variant: "destructive",
      });
      return null;
    }

    try {
      setIsLoading(true);

      // Upload du fichier au bucket ressources
      const fileUrl = await uploadFile(file, 'resources', 'pdf/');
      
      if (!fileUrl) throw new Error('Échec de l\'upload du fichier');
      
      // Création de l'entrée dans la table video_resources
      const resourceData = {
        id: uuidv4(),
        title,
        file_url: fileUrl,
        video_id: videoId,
        file_size: file.size,
        file_type: file.type,
        description: description || null
      };
      
      const { data, error } = await supabase
        .from('video_resources')
        .insert(resourceData)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Ressource ajoutée",
        description: "Le document a été associé avec succès à la vidéo",
      });
      
      return data as Resource;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la ressource:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la ressource",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteResource = async (resourceId: string) => {
    try {
      setIsLoading(true);
      
      // Récupération de l'URL du fichier avant la suppression
      const { data: resourceData, error: fetchError } = await supabase
        .from('video_resources')
        .select('file_url')
        .eq('id', resourceId)
        .single();
        
      if (fetchError) throw fetchError;
      
      // Suppression de l'enregistrement dans la base de données
      const { error } = await supabase
        .from('video_resources')
        .delete()
        .eq('id', resourceId);
        
      if (error) throw error;
      
      // Suppression du fichier dans le stockage
      // Extraction du chemin du fichier depuis l'URL complète
      const fileUrl = resourceData?.file_url;
      if (fileUrl) {
        const filePath = fileUrl.split('/').slice(-2).join('/');
        
        const { error: storageError } = await supabase.storage
          .from('resources')
          .remove([filePath]);
          
        if (storageError) {
          console.warn('Le fichier n\'a pas pu être supprimé du stockage:', storageError);
        }
      }
      
      toast({
        title: "Ressource supprimée",
        description: "La ressource a été supprimée avec succès",
      });
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de la ressource:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la ressource",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resources,
    isLoading,
    uploadStatus,
    fetchResourcesByVideo,
    uploadResource,
    deleteResource
  };
};
