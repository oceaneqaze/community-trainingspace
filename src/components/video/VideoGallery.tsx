
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Calendar, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface Video {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  duration: string | null;
  category: string | null;
  created_at: string;
  updated_at: string | null;
  uploader_name?: string;
}

interface VideoGalleryProps {
  onVideoSelect?: (video: Video) => void;
  refreshTrigger?: number;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ onVideoSelect, refreshTrigger }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      
      // Fetch videos from the database
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Add a default uploader name since we don't have uploaded_by in the schema
      const videosWithUploader = (data || []).map(video => ({
        ...video,
        uploader_name: 'Utilisateur'
      }));

      setVideos(videosWithUploader);
    } catch (error: any) {
      console.error('Erreur lors du chargement des vidéos:', error);
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
    fetchVideos();
  }, [refreshTrigger]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const categories = Array.from(new Set(videos.map(v => v.category).filter(Boolean)));
  const filteredVideos = selectedCategory 
    ? videos.filter(v => v.category === selectedCategory)
    : videos;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bibliothèque vidéo</h2>
        <span className="text-sm text-gray-500">{filteredVideos.length} vidéo(s)</span>
      </div>

      {/* Filtres par catégorie */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            Toutes
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      )}

      {/* Grille des vidéos */}
      {filteredVideos.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">Aucune vidéo disponible</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    poster={video.thumbnail_url || video.video_url.replace(/\.(mp4|mov|avi|webm)$/, '.jpg')}
                    preload="none"
                  >
                    <source src={video.video_url} type="video/mp4" />
                  </video>
                </div>
                
                {/* Overlay avec bouton play */}
                <div 
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center"
                  onClick={() => onVideoSelect?.(video)}
                >
                  <div className="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-6 w-6 text-gray-800" />
                  </div>
                </div>

                {/* Badge catégorie */}
                {video.category && (
                  <Badge className="absolute top-2 left-2 bg-black/70 text-white">
                    {video.category}
                  </Badge>
                )}

                {/* Durée */}
                {video.duration && (
                  <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                    {video.duration}
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                
                {video.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {video.uploader_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(video.created_at)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
