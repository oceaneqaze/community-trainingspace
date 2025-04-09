
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

type UploadStatus = {
  isLoading: boolean;
  progress: number;
  error: string | null;
};

/**
 * Hook for handling file uploads to Supabase storage
 * Supports larger file sizes and provides progress updates
 */
export const useFileUpload = () => {
  const [status, setStatus] = useState<UploadStatus>({
    isLoading: false,
    progress: 0,
    error: null,
  });

  const uploadFile = async (file: File, bucket: string, path: string) => {
    if (!file) return null;
    
    setStatus({ isLoading: true, progress: 0, error: null });
    
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${path}${uuidv4()}.${fileExt}`;
      
      // Pour les fichiers volumineux, nous suivons la progression manuellement
      // avec des mises à jour à intervalles réguliers
      let uploadProgress = 0;
      
      // Démarrer un intervalle pour simuler la progression
      const progressInterval = setInterval(() => {
        uploadProgress += 5; // Incrémentation plus rapide pour donner l'impression de vitesse
        if (uploadProgress <= 95) { // Ne jamais atteindre 100% avant la fin réelle
          setStatus(prev => ({ ...prev, progress: uploadProgress }));
        }
      }, 300); // Intervalle plus court pour des mises à jour plus fréquentes
      
      // Upload du fichier
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      // Arrêter l'intervalle une fois le téléchargement terminé
      clearInterval(progressInterval);
        
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
        
      setStatus({ isLoading: false, progress: 100, error: null });
      return publicUrl;
    } catch (error: any) {
      setStatus({ isLoading: false, progress: 0, error: error.message });
      throw error;
    }
  };

  return {
    uploadFile,
    status,
  };
};
