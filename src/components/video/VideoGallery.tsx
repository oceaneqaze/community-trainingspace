
import React, { useState, useEffect } from 'react';
import ModernCard from '@/components/ui/modern-card';
import ModernButton from '@/components/ui/modern-button';
import { Badge } from '@/components/ui/badge';
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
      
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

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
      <ModernCard variant="glass" className="p-8 text-center" glow="purple">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-gray-400">Chargement des vidéos...</p>
      </ModernCard>
    );
  }

  return (
    <div className="space-y-6">
      <ModernCard variant="glass" className="p-6" glow="purple">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gradient-purple">Bibliothèque vidéo</h2>
          <Badge className="modern-button text-white">
            {filteredVideos.length} vidéo(s)
          </Badge>
        </div>

        {/* Filtres par catégorie */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <ModernButton
              variant={selectedCategory === null ? "gradient" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Toutes
            </ModernButton>
            {categories.map(category => (
              <ModernButton
                key={category}
                variant={selectedCategory === category ? "gradient" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </ModernButton>
            ))}
          </div>
        )}
      </ModernCard>

      {/* Grille des vidéos */}
      {filteredVideos.length === 0 ? (
        <ModernCard variant="glass" className="p-8 text-center" glow="pink">
          <p className="text-gray-400 text-lg">Aucune vidéo disponible</p>
        </ModernCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <ModernCard 
              key={video.id} 
              variant="glass"
              hover={true}
              glow="blue"
              className="group cursor-pointer overflow-hidden"
              onClick={() => onVideoSelect?.(video)}
            >
              <div className="relative">
                <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
                  <video
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    poster={video.thumbnail_url || video.video_url.replace(/\.(mp4|mov|avi|webm)$/, '.jpg')}
                    preload="none"
                  >
                    <source src={video.video_url} type="video/mp4" />
                  </video>
                </div>
                
                {/* Overlay avec bouton play */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="glass-card rounded-full p-4 border-white/30">
                    <Play className="h-6 w-6 text-white" fill="white" />
                  </div>
                </div>

                {/* Badge catégorie */}
                {video.category && (
                  <Badge className="absolute top-3 left-3 modern-button text-xs">
                    {video.category}
                  </Badge>
                )}

                {/* Durée */}
                {video.duration && (
                  <Badge className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white border-white/20">
                    {video.duration}
                  </Badge>
                )}
              </div>

              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-lg line-clamp-2 text-white group-hover:text-gradient-purple transition-all">
                  {video.title}
                </h3>
                
                {video.description && (
                  <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1 hover:text-purple-400 transition-colors">
                    <User className="h-3 w-3" />
                    {video.uploader_name}
                  </span>
                  <span className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                    <Calendar className="h-3 w-3" />
                    {formatDate(video.created_at)}
                  </span>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
