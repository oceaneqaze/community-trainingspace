import React, { useState, useEffect } from 'react';
import VideoCard, { VideoProps } from '@/components/VideoCard';
import { Search, Filter, MessageCircle, BookOpen, Library } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { DEFAULT_THUMBNAIL } from '@/data/mockData';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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

  useEffect(() => {
    setCategories(getCategories(videos));
  }, [videos]);

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

  const handleVideoClick = (videoId: string) => {
    navigate(`/video/${videoId}`);
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
      <Card className="bg-card border-border shadow-lg mb-8">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <CardTitle className="text-4xl font-bold text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Bibliothèque de vidéos
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Explorez notre collection de vidéos éducatives
              </CardDescription>
            </div>
            
            <div className="flex space-x-2 self-end sm:self-auto mt-4 sm:mt-0">
              <Button 
                variant="outline" 
                onClick={() => navigate('/chat')} 
                className="transition-all hover:bg-primary/10"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Accéder au Chat
              </Button>
              
              {isAdmin() && (
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/library-manager')} 
                  className="transition-all hover:bg-primary/10"
                >
                  <Library className="mr-2 h-4 w-4" />
                  Gérer la bibliothèque
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-input rounded-md shadow-sm focus:ring-primary focus:border-primary bg-background"
                placeholder="Rechercher une vidéo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="relative">
                <select
                  className="h-full px-3 pr-10 py-2 border border-input rounded-md shadow-sm focus:ring-primary focus:border-primary appearance-none bg-background"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">Toutes les catégories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="flex items-center bg-secondary rounded-md">
                <Button 
                  variant={activeView === 'grid' ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActiveView('grid')}
                  className="rounded-r-none"
                >
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-2 h-2 bg-current rounded-sm"></div>
                    <div className="w-2 h-2 bg-current rounded-sm"></div>
                    <div className="w-2 h-2 bg-current rounded-sm"></div>
                    <div className="w-2 h-2 bg-current rounded-sm"></div>
                  </div>
                </Button>
                <Button 
                  variant={activeView === 'list' ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActiveView('list')}
                  className="rounded-l-none"
                >
                  <div className="flex flex-col gap-1 items-center justify-center">
                    <div className="w-4 h-0.5 bg-current rounded-sm"></div>
                    <div className="w-4 h-0.5 bg-current rounded-sm"></div>
                    <div className="w-4 h-0.5 bg-current rounded-sm"></div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'grid' | 'list')}>
            <TabsContent value="grid" className="mt-0">
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-medium text-foreground">Chargement des vidéos...</h3>
                </div>
              ) : filteredVideos.length > 0 ? (
                <div className="space-y-8">
                  {!selectedCategory ? (
                    sortedCategories.map(category => (
                      <div key={category} className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground border-b pb-2">
                          {category}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {videosByCategory[category].map((video) => (
                            <VideoCard
                              key={video.id}
                              video={video}
                              onClick={() => handleVideoClick(video.id)}
                              className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredVideos.map((video) => (
                        <VideoCard
                          key={video.id}
                          video={video}
                          onClick={() => handleVideoClick(video.id)}
                          className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 bg-secondary/20 rounded-lg">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="mt-2 text-lg font-medium text-foreground">Aucune vidéo trouvée</h3>
                  <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
                    Essayez d'ajuster vos critères de recherche ou sélectionnez une autre catégorie.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-medium text-foreground">Chargement des vidéos...</h3>
                </div>
              ) : filteredVideos.length > 0 ? (
                <div className="space-y-8">
                  {!selectedCategory ? (
                    sortedCategories.map(category => (
                      <div key={category} className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground border-b pb-2">
                          {category}
                        </h2>
                        <div className="overflow-hidden rounded-lg border bg-card">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[300px]">Titre</TableHead>
                                <TableHead>Durée</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {videosByCategory[category].map((video) => (
                                <TableRow key={video.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleVideoClick(video.id)}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center space-x-3">
                                      <div className="h-12 w-20 rounded overflow-hidden flex-shrink-0">
                                        <img 
                                          src={video.thumbnail} 
                                          alt={video.title}
                                          className="h-full w-full object-cover" 
                                        />
                                      </div>
                                      <span className="line-clamp-1">{video.title}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>{video.duration}</TableCell>
                                  <TableCell>{video.date}</TableCell>
                                  <TableCell className="text-right">
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleVideoClick(video.id);
                                      }}
                                    >
                                      Voir
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="overflow-hidden rounded-lg border bg-card">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[300px]">Titre</TableHead>
                            <TableHead>Catégorie</TableHead>
                            <TableHead>Durée</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredVideos.map((video) => (
                            <TableRow key={video.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleVideoClick(video.id)}>
                              <TableCell className="font-medium">
                                <div className="flex items-center space-x-3">
                                  <div className="h-12 w-20 rounded overflow-hidden flex-shrink-0">
                                    <img 
                                      src={video.thumbnail} 
                                      alt={video.title}
                                      className="h-full w-full object-cover" 
                                    />
                                  </div>
                                  <span className="line-clamp-1">{video.title}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                  {video.category}
                                </span>
                              </TableCell>
                              <TableCell>{video.duration}</TableCell>
                              <TableCell>{video.date}</TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleVideoClick(video.id);
                                  }}
                                >
                                  Voir
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 bg-secondary/20 rounded-lg">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="mt-2 text-lg font-medium text-foreground">Aucune vidéo trouvée</h3>
                  <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
                    Essayez d'ajuster vos critères de recherche ou sélectionnez une autre catégorie.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Videos;
