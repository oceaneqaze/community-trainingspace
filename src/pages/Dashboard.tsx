
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemberDashboardOverview from '@/components/dashboard/MemberDashboardOverview';

const Dashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Redirect non-authenticated users or admin users to appropriate pages
    if (!isAuthenticated) {
      navigate('/login');
    } else if (isAdmin()) {
      // If an admin tries to access this page, redirect to admin dashboard
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Mon Tableau de Bord</h1>
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6 w-full sm:w-auto p-1 bg-muted/80 backdrop-blur-sm">
          <TabsTrigger value="overview" className="px-6 py-2.5">
            Vue d'ensemble
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <MemberDashboardOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
