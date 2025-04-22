
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { VideoProps } from '@/components/VideoCard';

export interface WatchHistoryItem extends VideoProps {
  last_watched: string;
  progress: number;
  completed: boolean;
}

export const useWatchHistory = () => {
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchHistory = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Requête pour obtenir l'historique de visionnage de l'utilisateur
      const { data: viewsData, error: viewsError } = await supabase
        .from('video_views')
        .select('video_id, progress, completed, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
        
      if (viewsError) throw viewsError;
      
      if (viewsData && viewsData.length > 0) {
        // Obtenir les IDs des vidéos consultées
        const videoIds = viewsData.map(view => view.video_id);
        
        // Requête pour obtenir les détails des vidéos
        const { data: videosData, error: videosError } = await supabase
          .from('videos')
          .select('*')
          .in('id', videoIds);
          
        if (videosError) throw videosError;
        
        // Créer un mapping pour faciliter l'accès aux données des vidéos
        const videosMap = videosData?.reduce((acc, video) => {
          acc[video.id] = video;
          return acc;
        }, {} as Record<string, any>) || {};
        
        // Fusionner les données de visionnage avec les données des vidéos
        const historyItems = viewsData.map(view => {
          const video = videosMap[view.video_id];
          if (!video) return null;
          
          return {
            id: video.id,
            title: video.title,
            thumbnail: video.thumbnail_url || '',
            duration: video.duration || '00:00',
            category: video.category || 'Sans catégorie',
            date: new Date(video.created_at).toLocaleDateString('fr-FR'),
            likes: 0,
            comments: 0,
            videoUrl: video.video_url,
            progress: view.progress,
            completed: view.completed,
            last_watched: new Date(view.updated_at).toLocaleString('fr-FR')
          };
        }).filter(item => item !== null) as WatchHistoryItem[];
        
        setHistory(historyItems);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique de visionnage",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('video_views')
        .delete()
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setHistory([]);
      toast({
        title: "Historique effacé",
        description: "Votre historique de visionnage a été effacé",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'historique:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'effacer l'historique",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  return {
    history,
    isLoading,
    fetchHistory,
    clearHistory
  };
};
