
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface VideoDetail {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  category: string;
  date: string;
  likes: number;
  progress: number;
  completed: boolean;
  comments: any[];
}

export const useVideoData = (videoId: string | undefined) => {
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchVideoData = async () => {
    if (!videoId) return;
    
    setIsLoading(true);
    try {
      const { data: videoData, error: videoError } = await supabase
        .from('videos')
        .select('*')
        .eq('id', videoId)
        .maybeSingle();

      if (videoError) throw videoError;
      if (!videoData) {
        toast({
          title: "Erreur",
          description: "Vidéo non trouvée",
          variant: "destructive",
        });
        navigate('/videos');
        return;
      }

      console.log("Données vidéo chargées:", videoData);

      const formattedVideo: VideoDetail = {
        id: videoData.id,
        title: videoData.title,
        description: videoData.description || '',
        videoUrl: videoData.video_url,
        duration: videoData.duration || '00:00',
        category: videoData.category || 'Sans catégorie',
        date: new Date(videoData.created_at).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        likes: 0,
        progress: 0,
        completed: false,
        comments: [],
      };
      setVideo(formattedVideo);
    } catch (error) {
      console.error("Erreur lors du chargement de la vidéo:", error);
      setVideoError("Impossible de charger les détails de la vidéo");
      toast({
        title: "Erreur",
        description: "Impossible de charger la vidéo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  return {
    video,
    setVideo,
    isLoading,
    videoError,
    navigate
  };
};
