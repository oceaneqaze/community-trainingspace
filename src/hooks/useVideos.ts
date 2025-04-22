
import { useState, useEffect } from 'react';
import { VideoProps } from '@/components/VideoCard';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { DEFAULT_THUMBNAIL } from '@/data/mockData';
import { useVideoProgress } from '@/hooks/useVideoProgress';

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

export type VideoViewType = 'grid' | 'list' | 'explorer';

export const useVideos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<VideoViewType>('grid');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const { isAuthenticated, user } = useAuth();
  const { fetchMultipleProgress } = useVideoProgress();

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('videos')
        .select('*');

      if (error) {
        throw error;
      }

      const transformedVideos: VideoProps[] = (data as DBVideo[]).map(video => ({
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
        likes: 0,
        comments: 0,
        videoUrl: video.video_url,
      }));

      // Fetch progress data for all videos
      if (user) {
        const videoIds = transformedVideos.map(v => v.id);
        const progressData = await fetchMultipleProgress(videoIds);
        
        // Merge progress data with videos
        const videosWithProgress = transformedVideos.map(video => ({
          ...video,
          progress: progressData[video.id]?.progress || 0,
          completed: progressData[video.id]?.completed || false,
        }));
        
        setVideos(videosWithProgress);
      } else {
        setVideos(transformedVideos);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les vidéos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchVideos();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    setCategories(Array.from(new Set(videos.map(video => video.category))));
  }, [videos]);

  useEffect(() => {
    let results = videos;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      results = results.filter(video => video.category === selectedCategory);
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      if (statusFilter === 'completed') {
        results = results.filter(video => video.completed);
      } else if (statusFilter === 'in-progress') {
        results = results.filter(video => video.progress && video.progress > 0 && !video.completed);
      }
    }
    
    setFilteredVideos(results);
  }, [searchTerm, selectedCategory, videos, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    videos,
    filteredVideos,
    selectedCategory,
    setSelectedCategory,
    categories,
    isLoading,
    activeView,
    setActiveView,
    statusFilter,
    setStatusFilter
  };
};
