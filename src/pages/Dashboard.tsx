
import React from 'react';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { useDashboardData } from '@/hooks/useDashboardData';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import { useAuth } from '@/context/AuthContext';
import VideoManagement from '@/components/dashboard/VideoManagement';

const Dashboard: React.FC = () => {
  // Pass true to require admin access to the page
  const { isAuthenticated, isAdmin } = useAuthRedirect(true);
  const { userCount, videos, viewCount, isLoading, handleVideoAdded, handleVideoUpdated, handleVideoDeleted } = useDashboardData(isAuthenticated, isAdmin);
  const { profile } = useAuth();

  console.log("Dashboard rendering - Is Admin:", isAdmin, "Profile role:", profile?.role);

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Tableau de Bord Administrateur</h1>
      </div>
      
      {isAdmin ? (
        <div className="space-y-8">
          <DashboardOverview 
            userCount={userCount} 
            videoCount={videos.length} 
            viewCount={viewCount} 
          />
          
          <VideoManagement 
            videos={videos}
            onVideoAdded={handleVideoAdded}
            onVideoUpdated={handleVideoUpdated}
            onVideoDeleted={handleVideoDeleted}
          />
        </div>
      ) : profile?.role === 'admin' ? (
        <div className="space-y-8">
          <p className="text-lg">Chargement du tableau de bord administrateur...</p>
          <DashboardOverview 
            userCount={userCount} 
            videoCount={videos.length} 
            viewCount={viewCount} 
          />
        </div>
      ) : (
        <DashboardTabs />
      )}
    </div>
  );
};

export default Dashboard;
