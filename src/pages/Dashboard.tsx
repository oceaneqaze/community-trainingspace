
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, Video, Activity, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import AdminVideoList from '@/components/AdminVideoList';
import { VideoProps } from '@/components/VideoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

// Mock data for charts
const videoViewsData = [
  { name: 'Jan', views: 400 },
  { name: 'Fév', views: 300 },
  { name: 'Mar', views: 600 },
  { name: 'Avr', views: 800 },
  { name: 'Mai', views: 500 },
  { name: 'Juin', views: 700 },
];

const memberActivityData = [
  { name: 'Actifs', value: 85 },
  { name: 'Inactifs', value: 15 },
];

const ACTIVITY_COLORS = ['#10b981', '#f43f5e'];

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, trend, trendValue }) => (
  <Card className="transition-all duration-300 hover:shadow-md">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            {trend && trendValue && (
              <div className={`flex items-center text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend === 'up' 
                  ? <TrendingUp className="mr-1 h-4 w-4" /> 
                  : <TrendingDown className="mr-1 h-4 w-4" />
                }
                {trendValue}
              </div>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${
          trend === 'up' ? 'bg-green-100 text-green-700' : 
          trend === 'down' ? 'bg-red-100 text-red-700' : 
          'bg-blue-100 text-blue-700'
        }`}>
          {icon}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    // Check if user is authenticated and admin
    if (!isAuthenticated || !isAdmin()) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

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

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Tableau de bord</h1>
        </div>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <p className="text-xl font-medium">Chargement des données...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Tableau de bord</h1>
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6 w-full sm:w-auto p-1 bg-muted/80 backdrop-blur-sm">
          <TabsTrigger value="overview" className="px-6 py-2.5">
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="videos" className="px-6 py-2.5">
            Gestion des vidéos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="animate-fade-in">
          {/* Stats overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard
              title="Membres"
              value={userCount.toString()}
              description="Nombre total de membres"
              icon={<Users className="h-6 w-6" />}
              trend="up"
              trendValue="12%"
            />
            <StatCard
              title="Vidéos"
              value={videos.length.toString()}
              description="Contenu total disponible"
              icon={<Video className="h-6 w-6" />}
              trend="up"
              trendValue="8%"
            />
            <StatCard
              title="Vues"
              value={viewCount.toString()}
              description="Vues totales ce mois-ci"
              icon={<Activity className="h-6 w-6" />}
              trend="up"
              trendValue="23%"
            />
            <StatCard
              title="Durée moyenne"
              value="18:30"
              description="Temps moyen par session"
              icon={<Clock className="h-6 w-6" />}
              trend="down"
              trendValue="5%"
            />
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video views chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-0">
                <CardTitle>Vues mensuelles</CardTitle>
                <CardDescription>Visualisation des vues pour les 6 derniers mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={videoViewsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          borderRadius: '8px', 
                          border: 'none', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                        }} 
                      />
                      <Bar 
                        dataKey="views" 
                        fill="url(#colorGradient)" 
                        radius={[4, 4, 0, 0]} 
                        barSize={40}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Member activity chart */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Activité des membres</CardTitle>
                <CardDescription>Membres actifs vs inactifs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex flex-col items-center justify-center">
                  <ResponsiveContainer width="100%" height="80%">
                    <PieChart>
                      <Pie
                        data={memberActivityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {memberActivityData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={ACTIVITY_COLORS[index % ACTIVITY_COLORS.length]} 
                            stroke="rgba(0,0,0,0.1)"
                            strokeWidth={1}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          borderRadius: '8px', 
                          border: 'none', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                        }} 
                      />
                      <Legend 
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        iconSize={10}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des vidéos</CardTitle>
              <CardDescription>Ajouter, modifier ou supprimer des vidéos</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminVideoList 
                videos={videos}
                onVideoAdded={handleVideoAdded}
                onVideoUpdated={handleVideoUpdated}
                onVideoDeleted={handleVideoDeleted}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
