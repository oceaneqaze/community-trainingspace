
import React from 'react';
import { Users, Video, Activity, Clock } from 'lucide-react';
import StatCard from './StatCard';

interface DashboardStatsProps {
  userCount: number;
  videoCount: number;
  viewCount: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ userCount, videoCount, viewCount }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatCard
        title="Membres"
        value={userCount.toString()}
        description="Nombre total de membres"
        icon={<Users className="h-6 w-6" />}
        trend="up"
        trendValue="12%"
      />
      <StatCard
        title="Vidéos"
        value={videoCount.toString()}
        description="Contenu total disponible"
        icon={<Video className="h-6 w-6" />}
        trend="up"
        trendValue="8%"
      />
      <StatCard
        title="Vues"
        value={viewCount.toString()}
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
  );
};

export default DashboardStats;
