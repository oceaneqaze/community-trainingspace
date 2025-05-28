
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { VideoProps } from '@/components/video/VideoCard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { DEFAULT_THUMBNAIL } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CategoryManager from '@/components/admin/CategoryManager';
import VideosTabContent from '@/components/admin/VideosTabContent';

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

const LibraryManager: React.FC = () => {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirection si non authentifié ou non admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isAdmin()) {
      navigate('/videos');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Charger les vidéos et les catégories
  const loadVideos = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('videos')
        .select('*');

      if (error) {
        throw error;
      }

      // Transformer les données de la BD en format VideoProps
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
        progress: 0,
        completed: false,
      }));

      setVideos(transformedVideos);
      
      // Extraire les catégories uniques
      const uniqueCategories = Array.from(new Set(data
        .map(video => video.category)
        .filter(Boolean) as string[]
      ));
      setCategories(uniqueCategories);
    } catch (error) {
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
    if (isAuthenticated && isAdmin()) {
      loadVideos();
    }
  }, [isAuthenticated, isAdmin]);

  // Gérer le changement de catégorie d'une vidéo
  const handleCategoryChange = (videoId: string, newCategory: string) => {
    setVideos(videos.map(video => 
      video.id === videoId ? { ...video, category: newCategory } : video
    ));
  };

  // Gérer le changement global des catégories
  const handleCategoriesChanged = () => {
    loadVideos();
  };

  return (
    <div className="page-container bg-background">
      <Card className="bg-card border-border shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Gestion de la bibliothèque vidéo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="videos" className="space-y-6">
            <TabsList className="mb-6">
              <TabsTrigger value="videos">Classification des vidéos</TabsTrigger>
              <TabsTrigger value="categories">Gestion des catégories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="videos">
              <VideosTabContent 
                videos={videos}
                isLoading={isLoading}
                categories={categories}
                onCategoryChange={handleCategoryChange}
              />
            </TabsContent>
            
            <TabsContent value="categories">
              <CategoryManager onCategoryChange={handleCategoriesChanged} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LibraryManager;
