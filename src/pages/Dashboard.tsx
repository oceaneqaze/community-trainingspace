
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import VideoManagement from '@/components/dashboard/VideoManagement';
import { useDashboardData } from '@/hooks/useDashboardData';

const Dashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const {
    videos,
    isLoading,
    userCount,
    viewCount,
    handleVideoAdded,
    handleVideoUpdated,
    handleVideoDeleted
  } = useDashboardData(isAuthenticated, isAdmin);

  React.useEffect(() => {
    // Check if user is authenticated and admin
    if (!isAuthenticated || !isAdmin()) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

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
        
        <TabsContent value="overview">
          <DashboardOverview 
            userCount={userCount}
            videoCount={videos.length}
            viewCount={viewCount}
          />
        </TabsContent>
        
        <TabsContent value="videos">
          <VideoManagement 
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
