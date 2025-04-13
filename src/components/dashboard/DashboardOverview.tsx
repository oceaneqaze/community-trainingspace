
import React from 'react';
import DashboardStats from './DashboardStats';
import DashboardCharts from './DashboardCharts';

interface DashboardOverviewProps {
  userCount: number;
  videoCount: number;
  viewCount: number;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ userCount, videoCount, viewCount }) => {
  return (
    <div className="animate-fade-in">
      <DashboardStats 
        userCount={userCount} 
        videoCount={videoCount} 
        viewCount={viewCount} 
      />
      <DashboardCharts />
    </div>
  );
};

export default DashboardOverview;
