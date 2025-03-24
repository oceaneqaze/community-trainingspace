
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Video, Activity, Clock } from 'lucide-react';
import AdminVideoList from '@/components/AdminVideoList';
import { VideoProps } from '@/components/VideoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for videos - We'll manage this with state now
import { mockVideos } from '@/data/mockData';

// Mock data
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
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <div className="flex items-center">
      <div className="p-3 rounded-md bg-blue-50 text-blue-600">
        {icon}
      </div>
      <div className="ml-5">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {trend && trendValue && (
            <span className={`ml-2 text-sm font-medium ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </span>
          )}
        </div>
      </div>
    </div>
    <p className="mt-2 text-sm text-gray-500">{description}</p>
  </div>
);

const Dashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState<VideoProps[]>([]);

  useEffect(() => {
    // Load videos from mock data initially
    setVideos(mockVideos);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

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

  return (
    <div className="page-container">
      <h1 className="text-4xl font-bold mb-8 text-center sm:text-left">Tableau de bord</h1>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="videos">Gestion des vidéos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          {/* Stats overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Membres"
              value="24"
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
              value="1,256"
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
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Vues mensuelles</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={videoViewsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                    />
                    <Bar 
                      dataKey="views" 
                      fill="#3b82f6" 
                      radius={[4, 4, 0, 0]} 
                      barSize={40} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Member activity chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Activité des membres</h2>
              <div className="h-80 flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={memberActivityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {memberActivityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ACTIVITY_COLORS[index % ACTIVITY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-8 mt-4">
                  {memberActivityData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: ACTIVITY_COLORS[index % ACTIVITY_COLORS.length] }}
                      />
                      <span className="text-sm text-gray-600">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <AdminVideoList 
            videos={videos}
            onVideoAdded={handleVideoAdded}
            onVideoUpdated={handleVideoUpdated}
            onVideoDeleted={handleVideoDeleted}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
