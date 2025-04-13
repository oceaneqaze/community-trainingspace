
import React from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import AdminVideoList from '@/components/AdminVideoList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface VideoManagementProps {
  videos: VideoProps[];
  onVideoAdded: (newVideo: Partial<VideoProps>) => void;
  onVideoUpdated: (updatedVideo: Partial<VideoProps>) => void;
  onVideoDeleted: (videoId: string) => void;
}

const VideoManagement: React.FC<VideoManagementProps> = ({ 
  videos, 
  onVideoAdded, 
  onVideoUpdated, 
  onVideoDeleted 
}) => {
  return (
    <div className="animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des vidéos</CardTitle>
          <CardDescription>Ajouter, modifier ou supprimer des vidéos</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminVideoList 
            videos={videos}
            onVideoAdded={onVideoAdded}
            onVideoUpdated={onVideoUpdated}
            onVideoDeleted={onVideoDeleted}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoManagement;
