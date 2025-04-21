
import React, { useState, useEffect } from 'react';
import { VideoProps } from '@/components/VideoCard';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { DEFAULT_THUMBNAIL } from '@/data/mockData';
import { 
  Card, 
  CardHeader, 
  CardContent 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

// Importing our components
import VideosHeader from '@/components/video/VideosHeader';
import VideoSearch from '@/components/video/VideoSearch';
import VideoFilters from '@/components/video/VideoFilters';
import VideoViewToggle from '@/components/video/VideoViewToggle';
import VideoGridView from '@/components/video/VideoGridView';
import VideoListView from '@/components/video/VideoListView';
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

const getCategories = (videos: VideoProps[]) => Array.from(new Set(videos.map(video => video.category)));

const Videos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const { isAuthenticated, isAdmin, user } = useAuth();
  const navigate = useNavigate();
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
    setCategories(getCategories(videos));
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleVideoClick = (videoId: string) => {
    navigate(`/videos/${videoId}`);
  };

  const videosByCategory = React.useMemo(() => {
    if (!filteredVideos.length) return {};
    
    return filteredVideos.reduce((acc: Record<string, VideoProps[]>, video) => {
      const category = video.category || 'Sans catégorie';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(video);
      return acc;
    }, {});
  }, [filteredVideos]);

  const sortedCategories = React.useMemo(() => {
    return Object.keys(videosByCategory).sort();
  }, [videosByCategory]);

  return (
    <div className="page-container bg-background">
      <Card className="bg-card border-border shadow-lg mb-4 sm:mb-8">
        <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
          <VideosHeader isAdmin={isAdmin && isAdmin()} />
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6">
          <div className="mb-6 sm:mb-8 grid grid-cols-1 gap-3 sm:gap-4">
            <VideoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <VideoFilters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
                
                <div className="relative">
                  <select
                    className="h-full px-2.5 sm:px-3 pr-8 py-2 sm:py-2 text-sm border border-input rounded-md shadow-sm focus:ring-primary focus:border-primary appearance-none bg-background"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'in-progress' | 'completed')}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="in-progress">En cours</option>
                    <option value="completed">Terminés</option>
                  </select>
                </div>
              </div>
              
              <VideoViewToggle activeView={activeView} setActiveView={setActiveView} />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {statusFilter !== 'all' && (
                <Badge variant="outline" className="bg-primary/10">
                  {statusFilter === 'completed' ? 'Vidéos terminées' : 'Vidéos en cours'}
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="outline" className="bg-secondary/10">
                  {selectedCategory}
                </Badge>
              )}
              {(statusFilter !== 'all' || selectedCategory) && (
                <Badge 
                  variant="outline" 
                  className="bg-destructive/10 cursor-pointer"
                  onClick={() => {
                    setStatusFilter('all');
                    setSelectedCategory(null);
                  }}
                >
                  Effacer les filtres
                </Badge>
              )}
            </div>
          </div>
          
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'grid' | 'list')}>
            <TabsList className="hidden">
              <TabsTrigger value="grid">Grille</TabsTrigger>
              <TabsTrigger value="list">Liste</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid" className="mt-0">
              <VideoGridView
                isLoading={isLoading}
                videosByCategory={videosByCategory}
                filteredVideos={filteredVideos}
                selectedCategory={selectedCategory}
                sortedCategories={sortedCategories}
                onVideoClick={handleVideoClick}
              />
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              <VideoListView
                isLoading={isLoading}
                videosByCategory={videosByCategory}
                filteredVideos={filteredVideos}
                selectedCategory={selectedCategory}
                sortedCategories={sortedCategories}
                onVideoClick={handleVideoClick}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Videos;
