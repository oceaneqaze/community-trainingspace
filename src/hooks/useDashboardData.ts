
import { useState, useEffect } from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Types for database data
type DBVideo = {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  video_url: string;
  duration: string | null;
  category: string | null;
  created_at: string;
};

export const useDashboardData = (isAuthenticated: boolean, isAdmin: () => boolean) => {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  // Fetch videos and stats from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch videos
        const { data: videoData, error: videoError } = await supabase
          .from('videos')
          .select('*');
          
        if (videoError) throw videoError;
        
        // Transform to VideoProps format
        const transformedVideos: VideoProps[] = (videoData as DBVideo[]).map(video => ({
          id: video.id,
          title: video.title,
          thumbnail: video.thumbnail_url || '/placeholder.svg',
          duration: video.duration || '00:00',
          category: video.category || 'Sans catégorie',
          date: new Date(video.created_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          likes: 0,
          comments: 0,
          videoUrl: video.video_url
        }));
        
        setVideos(transformedVideos);
        
        // Fetch user count
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        if (userError) throw userError;
        
        setUserCount(userCount || 0);
        
        // Fetch view count
        const { count: viewCount, error: viewError } = await supabase
          .from('video_views')
          .select('*', { count: 'exact', head: true });
          
        if (viewError) throw viewError;
        
        setViewCount(viewCount || 0);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du tableau de bord",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAuthenticated && isAdmin()) {
      fetchData();
    }
  }, [isAuthenticated, isAdmin]);

  // Video management handlers
  const handleVideoAdded = (newVideo: Partial<VideoProps>) => {
    setVideos(prevVideos => [...prevVideos, newVideo as VideoProps]);
  };

  const handleVideoUpdated = (updatedVideo: Partial<VideoProps>) => {
    setVideos(prevVideos => 
      prevVideos.map(video => 
        video.id === updatedVideo.id ? { ...video, ...updatedVideo } : video
      )
    );
  };

  const handleVideoDeleted = (videoId: string) => {
    setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
  };

  return {
    videos,
    isLoading,
    userCount,
    viewCount,
    handleVideoAdded,
    handleVideoUpdated,
    handleVideoDeleted
  };
};
