
import React, { useState, useEffect } from 'react';
import VideoCard, { VideoProps } from '@/components/VideoCard';
import { Search, Filter, MessageCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Adapter les props aux colonnes de notre table videos
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

// Extract unique categories
const getCategories = (videos: VideoProps[]) => Array.from(new Set(videos.map(video => video.category)));

const Videos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Load videos from Supabase
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('videos')
          .select('*');

        if (error) {
          throw error;
        }

        // Transform database videos to our VideoProps format
        const transformedVideos: VideoProps[] = (data as DBVideo[]).map(video => ({
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
          comments: 0
        }));

        setVideos(transformedVideos);
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

    if (isAuthenticated) {
      fetchVideos();
    }
  }, [isAuthenticated]);

  // Update categories when videos change
  useEffect(() => {
    setCategories(getCategories(videos));
  }, [videos]);

  // Handle search and filtering
  useEffect(() => {
    let results = videos;
    
    if (searchTerm) {
      results = results.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      results = results.filter(video => video.category === selectedCategory);
    }
    
    setFilteredVideos(results);
  }, [searchTerm, selectedCategory, videos]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Handle video click
  const handleVideoClick = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-center sm:text-left mb-4 sm:mb-0">Bibliothèque de vidéos</h1>
        
        <Button variant="outline" onClick={() => navigate('/chat')} className="self-end sm:self-auto">
          <MessageCircle className="mr-2 h-4 w-4" />
          Accéder au Chat
        </Button>
      </div>
      
      {/* Search and filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Rechercher une vidéo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative inline-block">
          <select
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Videos grid */}
      {isLoading ? (
        <div className="text-center py-10">
          <h3 className="mt-2 text-lg font-medium text-gray-900">Chargement des vidéos...</h3>
        </div>
      ) : filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => handleVideoClick(video.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune vidéo trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            Essayez d'ajuster vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default Videos;
