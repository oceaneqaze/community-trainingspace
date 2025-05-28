
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThumbnailUploader from './ThumbnailUploader';
import { useVideoFormData } from './video-form/useVideoFormData';
import BasicVideoDetails from './video-form/BasicVideoDetails';
import FormButtons from './video-form/FormButtons';
import UploadProgress from './video-form/UploadProgress';
import VideoUploader from './VideoUploader';
import ScreenRecUploader from './video-uploader/ScreenRecUploader';
import { VideoProps } from '@/components/video/VideoCard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface VideoFormProps {
  onVideoAdded?: (video: Partial<VideoProps>) => void;
  onClose?: () => void;
}

const VideoForm: React.FC<VideoFormProps> = ({ onVideoAdded, onClose }) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    duration,
    uploadStatus,
    handleSubmit,
    handleVideoChange,
    handleDurationExtracted,
    handleExternalUrlChange,
    handleThumbnailChange,
  } = useVideoFormData();

  // Gestionnaire pour les vidéos ScreenRec
  const handleScreenRecVideoSubmit = (videoData: { videoUrl: string; thumbnailUrl: string; videoId: string }) => {
    console.log("ScreenRec video data received:", videoData);
    // Mise à jour de l'URL externe
    if (handleExternalUrlChange) {
      handleExternalUrlChange(videoData.videoUrl);
    }
  };

  const handleFormSubmit = async (videoData: Partial<VideoProps>) => {
    console.log("🎬 Starting video submission process:", {
      title: videoData.title,
      videoUrl: videoData.videoUrl,
      thumbnail: videoData.thumbnail,
      duration: videoData.duration,
      category: videoData.category
    });

    try {
      // Ajouter la description et sauvegarder en base
      const videoToSave = {
        ...videoData,
        description: description,
      };

      console.log("📝 Preparing video data for database:", videoToSave);

      const { data, error } = await supabase
        .from('videos')
        .insert({
          title: videoToSave.title,
          description: videoToSave.description || '',
          thumbnail_url: videoToSave.thumbnail,
          video_url: videoToSave.videoUrl,
          duration: videoToSave.duration,
          category: videoToSave.category,
        })
        .select()
        .single();

      if (error) {
        console.error("❌ Database error:", error);
        throw error;
      }

      console.log("✅ Video successfully saved to database:", data);

      // Créer l'objet vidéo complet pour l'UI
      const completedVideo = {
        ...videoToSave,
        id: data.id,
        date: new Date().toLocaleDateString('fr-FR'),
        likes: 0,
        comments: 0,
      };

      console.log("📤 Notifying parent component with video:", completedVideo);

      // Notifier le parent
      if (onVideoAdded) {
        onVideoAdded(completedVideo);
      }

      toast({
        title: "Succès",
        description: "La vidéo a été ajoutée avec succès",
      });

      console.log("🎉 Video addition process completed successfully");

      // Fermer le dialog
      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      console.error('❌ Error saving video:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'ajout de la vidéo",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, handleFormSubmit)} className="space-y-4">
      <BasicVideoDetails
        title={title}
        description={description}
        category={category}
        duration={duration}
        isLoading={uploadStatus.isLoading}
        setTitle={setTitle}
        setDescription={setDescription}
        setCategory={setCategory}
      />

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload de fichier</TabsTrigger>
          <TabsTrigger value="screenrec">Ajouter une vidéo ScreenRec</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <VideoUploader 
            onVideoChange={handleVideoChange} 
            onDurationExtracted={handleDurationExtracted} 
            onExternalUrlChange={handleExternalUrlChange}
          />
        </TabsContent>

        <TabsContent value="screenrec">
          <ScreenRecUploader onVideoSubmit={handleScreenRecVideoSubmit} />
        </TabsContent>
      </Tabs>

      <ThumbnailUploader onThumbnailChange={handleThumbnailChange} />

      <UploadProgress progress={uploadStatus.progress} />
      <FormButtons 
        isLoading={uploadStatus.isLoading} 
        uploadLoading={uploadStatus.isLoading} 
        isEdit={false} 
      />
    </form>
  );
};

export default VideoForm;
