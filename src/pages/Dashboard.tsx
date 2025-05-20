
import React, { useEffect } from 'react';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { useDashboardData } from '@/hooks/useDashboardData';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import { useAuth } from '@/context/AuthContext';
import VideoManagement from '@/components/dashboard/VideoManagement';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Pass true to require admin access to the page
  const { isAuthenticated, isAdmin } = useAuthRedirect(true);
  const { userCount, videos, viewCount, isLoading, handleVideoAdded, handleVideoUpdated, handleVideoDeleted } = useDashboardData(isAuthenticated, isAdmin);
  const { profile } = useAuth();
  const navigate = useNavigate();

  console.log("Dashboard rendering - Is Admin:", isAdmin, "Profile role:", profile?.role);
  
  // Extra check to ensure proper admin access
  useEffect(() => {
    if (!isLoading && profile && profile.role !== 'admin') {
      console.log("Not an admin, redirecting from dashboard");
      navigate('/videos', { replace: true });
    }
  }, [isLoading, profile, navigate]);

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
      ) : (
        <DashboardTabs />
      )}
    </div>
  );
};

export default Dashboard;
