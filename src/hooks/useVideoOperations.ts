
import { useState } from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import { supabase } from '@/integrations/supabase/client';
import { showSuccessToast, showErrorToast } from '@/utils/toastHelpers';

export const useVideoOperations = (
  onVideoAdded: (video: Partial<VideoProps>) => void,
  onVideoUpdated: (video: Partial<VideoProps>) => void,
  onVideoDeleted: (videoId: string) => void
) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to safely parse dates
  const safeParseDate = (dateStr: string | undefined): Date => {
    if (!dateStr) return new Date();
    
    try {
      const parsedDate = new Date(dateStr);
      return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    } catch (error) {
      console.error("Error parsing date:", error);
      return new Date();
    }
  };

  // Add video function
  const handleAddVideo = async (videoData: Partial<VideoProps>) => {
    setIsLoading(true);
    try {
      // Déterminer la date à utiliser pour created_at
      const now = new Date();
      let createdAt = now;
      
      // Si une date personnalisée a été spécifiée, l'utiliser pour created_at
      if (videoData.date) {
        try {
          createdAt = safeParseDate(videoData.date);
        } catch (error) {
          console.error("Erreur lors du parsing de la date:", error);
        }
      }

      // Convert the form data to Supabase format
      const { data, error } = await supabase
        .from('videos')
        .insert({
          title: videoData.title,
          thumbnail_url: videoData.thumbnail,
          duration: videoData.duration,
          category: videoData.category,
          video_url: videoData.videoUrl,
          created_at: createdAt.toISOString() // Utiliser la date spécifiée ou la date actuelle
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
        date: videoData.date || new Date().toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        likes: 0,
        comments: 0
      };

      onVideoAdded(newVideo);
      showSuccessToast("Vidéo ajoutée", "La vidéo a été ajoutée avec succès");
      setIsAddDialogOpen(false);
    } catch (error: any) {
      console.error('Error adding video:', error);
      showErrorToast("Erreur", `Impossible d'ajouter la vidéo: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit video function
  const handleEditVideo = async (videoData: Partial<VideoProps>) => {
    if (!selectedVideo) return;
    
    setIsLoading(true);
    try {
      // Préparer les données à mettre à jour
      const updateData: any = {
        title: videoData.title,
        thumbnail_url: videoData.thumbnail,
        duration: videoData.duration,
        category: videoData.category,
        video_url: videoData.videoUrl
      };
      
      // Si une date personnalisée a été spécifiée, mettre à jour created_at
      if (videoData.date) {
        try {
          const newDate = safeParseDate(videoData.date);
          updateData.created_at = newDate.toISOString();
        } catch (error) {
          console.error("Erreur lors du parsing de la date:", error);
        }
      }

      // Convert the form data to Supabase format
      const { error } = await supabase
        .from('videos')
        .update(updateData)
        .eq('id', selectedVideo.id);

      if (error) throw error;

      // If successful, close dialog and update UI
      const updatedVideo = {
        ...selectedVideo,
        ...videoData
      };

      onVideoUpdated(updatedVideo);
      showSuccessToast("Vidéo mise à jour", "La vidéo a été mise à jour avec succès");
      setIsEditDialogOpen(false);
    } catch (error: any) {
      console.error('Error updating video:', error);
      showErrorToast("Erreur", `Impossible de mettre à jour la vidéo: ${error.message}`);
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
      showSuccessToast("Vidéo supprimée", "La vidéo a été supprimée avec succès");
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      console.error('Error deleting video:', error);
      showErrorToast("Erreur", `Impossible de supprimer la vidéo: ${error.message}`);
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

  return {
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
  };
};
