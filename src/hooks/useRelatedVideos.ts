
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { VideoProps } from '@/components/VideoCard';
import { DEFAULT_THUMBNAIL } from '@/data/mockData';

export const useRelatedVideos = (videoId: string | undefined, category: string | undefined) => {
  const [relatedVideos, setRelatedVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      if (!videoId || !category) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Récupérer les vidéos de la même catégorie, en excluant la vidéo actuelle
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .eq('category', category)
          .neq('id', videoId)
          .limit(5);

        if (error) throw error;

        // Si pas assez de vidéos dans la même catégorie, compléter avec d'autres vidéos
        let finalVideos = [...(data || [])];
        
        if (finalVideos.length < 3) {
          const { data: additionalVideos, error: additionalError } = await supabase
            .from('videos')
            .select('*')
            .neq('id', videoId)
            .neq('category', category)
            .limit(5 - finalVideos.length);
          
          if (!additionalError && additionalVideos) {
            finalVideos = [...finalVideos, ...additionalVideos];
          }
        }

        const formattedVideos = finalVideos.map(video => ({
          id: video.id,
          title: video.title,
          thumbnail: video.thumbnail_url || DEFAULT_THUMBNAIL,
          duration: video.duration || '00:00',
          category: video.category || 'Sans catégorie',
          date: new Date(video.created_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          videoUrl: video.video_url,
          likes: 0,
          comments: 0,
          progress: 0,
          completed: false,
        }));
        
        setRelatedVideos(formattedVideos);
      } catch (error) {
        console.error("Erreur lors du chargement des vidéos recommandées:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedVideos();
  }, [videoId, category]);

  return {
    relatedVideos,
    isLoading
  };
};
