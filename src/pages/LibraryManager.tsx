
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { VideoProps } from '@/components/video/VideoCard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { DEFAULT_THUMBNAIL } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CategoryManager from '@/components/admin/CategoryManager';
import VideoCategorizer from '@/components/admin/VideoCategorizer';
import { ArrowDown, ArrowUp, CheckCircle } from 'lucide-react';

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
  const [sortConfig, setSortConfig] = useState<{
    key: keyof VideoProps | 'date',
    direction: 'asc' | 'desc'
  }>({ key: 'title', direction: 'asc' });
  
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
        comments: 0
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

  // Gérer le tri des vidéos
  const requestSort = (key: keyof VideoProps | 'date') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedVideos = React.useMemo(() => {
    const sortableVideos = [...videos];
    sortableVideos.sort((a, b) => {
      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date.split(' ').reverse().join(' '));
        const dateB = new Date(b.date.split(' ').reverse().join(' '));
        return sortConfig.direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }
      
      if (a[sortConfig.key as keyof VideoProps] < b[sortConfig.key as keyof VideoProps]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof VideoProps] > b[sortConfig.key as keyof VideoProps]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableVideos;
  }, [videos, sortConfig]);

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
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Miniature</TableHead>
                        <TableHead className="cursor-pointer" onClick={() => requestSort('title')}>
                          <div className="flex items-center">
                            Titre
                            {sortConfig.key === 'title' && (
                              sortConfig.direction === 'asc' ? 
                                <ArrowUp className="ml-1 h-4 w-4" /> : 
                                <ArrowDown className="ml-1 h-4 w-4" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => requestSort('category')}>
                          <div className="flex items-center">
                            Catégorie actuelle
                            {sortConfig.key === 'category' && (
                              sortConfig.direction === 'asc' ? 
                                <ArrowUp className="ml-1 h-4 w-4" /> : 
                                <ArrowDown className="ml-1 h-4 w-4" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead className="w-[200px]">Nouvelle catégorie</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedVideos.map((video) => (
                        <TableRow key={video.id}>
                          <TableCell>
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="h-14 w-20 object-cover rounded"
                            />
                          </TableCell>
                          <TableCell>{video.title}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                              {video.category}
                            </span>
                          </TableCell>
                          <TableCell>
                            <VideoCategorizer 
                              video={video}
                              categories={categories}
                              onCategoryChange={handleCategoryChange}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
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
