
import React, { useState } from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import AdminVideoList from '@/components/AdminVideoList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import VideoForm from '@/components/VideoForm';

interface VideoManagementProps {
  videos: VideoProps[];
  onVideoAdded: (video: Partial<VideoProps>) => void;
  onVideoUpdated: (video: Partial<VideoProps>) => void;
  onVideoDeleted: (videoId: string) => void;
}

const VideoManagement: React.FC<VideoManagementProps> = ({
  videos,
  onVideoAdded,
  onVideoUpdated,
  onVideoDeleted
}) => {
  const [isAddVideoDialogOpen, setIsAddVideoDialogOpen] = useState(false);

  const handleVideoAdded = (video: Partial<VideoProps>) => {
    console.log("🎬 VideoManagement received new video:", video);
    console.log("📊 Current videos count before adding:", videos.length);
    
    // Appeler la fonction parent
    onVideoAdded(video);
    
    console.log("✅ Video added successfully, closing dialog");
    setIsAddVideoDialogOpen(false);
  };

  console.log("📋 VideoManagement render - Total videos:", videos.length);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Vidéos</h2>
        <Button 
          onClick={() => {
            console.log("➕ Opening add video dialog");
            setIsAddVideoDialogOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter une vidéo
        </Button>
      </div>

      <AdminVideoList
        videos={videos}
        onVideoAdded={onVideoAdded}
        onVideoUpdated={onVideoUpdated}
        onVideoDeleted={onVideoDeleted}
      />

      <Dialog open={isAddVideoDialogOpen} onOpenChange={setIsAddVideoDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle vidéo</DialogTitle>
          </DialogHeader>
          <VideoForm 
            onVideoAdded={handleVideoAdded} 
            onClose={() => {
              console.log("🚪 Closing video form dialog");
              setIsAddVideoDialogOpen(false);
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoManagement;
