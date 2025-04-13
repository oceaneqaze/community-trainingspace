
import React from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import VideoList from './admin/VideoList';
import VideoDialogs from './admin/VideoDialogs';
import VideoHeader from './admin/VideoHeader';
import { useVideoOperations } from '@/hooks/useVideoOperations';

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
    <div className="space-y-8">
      <VideoHeader 
        videoCount={videos.length} 
        onAddClick={() => setIsAddDialogOpen(true)} 
      />

      {/* Video List Component */}
      <VideoList 
        videos={videos}
        onEditVideo={handleEditButtonClick}
        onDeleteVideo={handleDeleteButtonClick}
      />

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
    </div>
  );
};

export default AdminVideoList;
