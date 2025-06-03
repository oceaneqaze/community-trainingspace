
import React, { useEffect } from 'react';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import ModernBackground from '@/components/ui/modern-background';
import ModernCard from '@/components/ui/modern-card';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { useDashboardData } from '@/hooks/useDashboardData';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import { useAuth } from '@/context/AuthContext';
import VideoManagement from '@/components/dashboard/VideoManagement';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuthRedirect(true);
  const { userCount, videos, viewCount, isLoading, handleVideoAdded, handleVideoUpdated, handleVideoDeleted } = useDashboardData(isAuthenticated, isAdmin);
  const { profile } = useAuth();
  const navigate = useNavigate();

  console.log("Dashboard rendering - Is Admin:", isAdmin, "Profile role:", profile?.role);
  
  useEffect(() => {
    if (!isLoading && profile && profile.role !== 'admin') {
      console.log("Not an admin, redirecting from dashboard");
      navigate('/videos', { replace: true });
    }
  }, [isLoading, profile, navigate]);

  return (
    <ModernBackground variant="default">
      <div className="container mx-auto px-4 py-8">
        <ModernCard variant="glass" className="mb-8" glow="purple">
          <div className="p-6">
            <h1 className="text-4xl font-bold text-gradient-multi mb-2">
              Tableau de Bord Administrateur
            </h1>
            <p className="text-gray-400">Gérez votre communauté et vos contenus</p>
          </div>
        </ModernCard>
        
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
    </ModernBackground>
  );
};

export default Dashboard;
