
import React from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import VideoList from './admin/VideoList';
import VideoDialogs from './admin/VideoDialogs';
import VideoHeader from './admin/VideoHeader';
import { useVideoOperations } from '@/hooks/useVideoOperations';
import { Card, CardContent } from '@/components/ui/card';

interface AdminVideoListProps {
  videos: VideoProps[];
  onVideoAdded: (video: Partial<VideoProps>) => void;
  onVideoUpdated: (video: Partial<VideoProps>) => void;
  onVideoDeleted: (videoId: string) => void;
}

const AdminVideoList: React.FC<AdminVideoListProps> = ({ 
  videos, 
  onVideoAdded, 
  onVideoUpdated, 
  onVideoDeleted 
}) => {
  const {
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedVideo,
    isLoading,
    handleAddVideo,
    handleEditVideo,
    handleDeleteVideo,
    handleEditButtonClick,
    handleDeleteButtonClick
  } = useVideoOperations(onVideoAdded, onVideoUpdated, onVideoDeleted);

  return (
    <Card className="border border-border/40 shadow-lg bg-card/60 backdrop-blur-sm animate-fade-in">
      <CardContent className="p-6">
        <VideoHeader 
          videoCount={videos.length} 
          onAddClick={() => setIsAddDialogOpen(true)} 
        />

        {/* Video List Component */}
        <div className="transition-all duration-500 ease-in-out">
          <VideoList 
            videos={videos}
            onEditVideo={handleEditButtonClick}
            onDeleteVideo={handleDeleteButtonClick}
          />
        </div>

        {/* Dialogs Components */}
        <VideoDialogs
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          selectedVideo={selectedVideo}
          isLoading={isLoading}
          handleAddVideo={handleAddVideo}
          handleEditVideo={handleEditVideo}
          handleDeleteVideo={handleDeleteVideo}
        />
      </CardContent>
    </Card>
  );
};

export default AdminVideoList;
