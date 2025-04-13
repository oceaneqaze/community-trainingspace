
import React, { useState } from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import VideoList from './admin/VideoList';
import VideoDialogs from './admin/VideoDialogs';

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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Add video function
  const handleAddVideo = async (videoData: Partial<VideoProps>) => {
    setIsLoading(true);
    try {
      // Convert the form data to Supabase format
      const { data, error } = await supabase
        .from('videos')
        .insert({
          title: videoData.title,
          thumbnail_url: videoData.thumbnail,
          duration: videoData.duration,
          category: videoData.category,
          video_url: videoData.videoUrl
        })
        .select();

      if (error) throw error;

      // If successful, close dialog and update UI
      const newVideo = {
        id: data[0].id,
        title: videoData.title || '',
        thumbnail: videoData.thumbnail || '',
        duration: videoData.duration || '',
        category: videoData.category || '',
        videoUrl: videoData.videoUrl || '',
        date: new Date().toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        likes: 0,
        comments: 0
      };

      onVideoAdded(newVideo);
      toast({
        title: "Vidéo ajoutée",
        description: "La vidéo a été ajoutée avec succès",
      });
      setIsAddDialogOpen(false);
    } catch (error: any) {
      console.error('Error adding video:', error);
      toast({
        title: "Erreur",
        description: `Impossible d'ajouter la vidéo: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Edit video function
  const handleEditVideo = async (videoData: Partial<VideoProps>) => {
    if (!selectedVideo) return;
    
    setIsLoading(true);
    try {
      // Convert the form data to Supabase format
      const { error } = await supabase
        .from('videos')
        .update({
          title: videoData.title,
          thumbnail_url: videoData.thumbnail,
          duration: videoData.duration,
          category: videoData.category,
          video_url: videoData.videoUrl
        })
        .eq('id', selectedVideo.id);

      if (error) throw error;

      // If successful, close dialog and update UI
      const updatedVideo = {
        ...selectedVideo,
        ...videoData
      };

      onVideoUpdated(updatedVideo);
      toast({
        title: "Vidéo mise à jour",
        description: "La vidéo a été mise à jour avec succès",
      });
      setIsEditDialogOpen(false);
    } catch (error: any) {
      console.error('Error updating video:', error);
      toast({
        title: "Erreur",
        description: `Impossible de mettre à jour la vidéo: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete video function
  const handleDeleteVideo = async () => {
    if (!selectedVideo) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', selectedVideo.id);

      if (error) throw error;

      onVideoDeleted(selectedVideo.id);
      toast({
        title: "Vidéo supprimée",
        description: "La vidéo a été supprimée avec succès",
      });
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      console.error('Error deleting video:', error);
      toast({
        title: "Erreur",
        description: `Impossible de supprimer la vidéo: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle video edit button click
  const handleEditButtonClick = (video: VideoProps) => {
    setSelectedVideo(video);
    setIsEditDialogOpen(true);
  };

  // Handle video delete button click
  const handleDeleteButtonClick = (video: VideoProps) => {
    setSelectedVideo(video);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Vidéos ({videos.length})</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une vidéo
        </Button>
      </div>

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
