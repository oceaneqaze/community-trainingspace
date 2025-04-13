
import React from 'react';
import VideoViewsChart from './VideoViewsChart';
import MemberActivityChart from './MemberActivityChart';

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

const DashboardCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <VideoViewsChart data={videoViewsData} />
      <MemberActivityChart data={memberActivityData} colors={ACTIVITY_COLORS} />
    </div>
  );
};

export default DashboardCharts;
