
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

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Mon Tableau de Bord</h1>
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
      ) : (
        <DashboardTabs />
      )}
    </div>
  );
};

export default Dashboard;
