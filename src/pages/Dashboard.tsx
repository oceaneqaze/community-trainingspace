
import React from 'react';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const Dashboard: React.FC = () => {
  useAuthRedirect();

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Mon Tableau de Bord</h1>
      </div>
      
      <DashboardTabs />
    </div>
  );
};

export default Dashboard;
