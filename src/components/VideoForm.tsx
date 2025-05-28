
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
    console.log("📱 ScreenRec video data received:", videoData);
    // Mise à jour de l'URL externe
    if (handleExternalUrlChange) {
      handleExternalUrlChange(videoData.videoUrl);
    }
    // Mise à jour du thumbnail
    if (handleThumbnailChange) {
      handleThumbnailChange(null, videoData.thumbnailUrl);
    }
  };

  const handleFormSubmit = async (videoData: Partial<VideoProps>) => {
    console.log("🎬 VideoForm - Starting submission with data:", {
      title: videoData.title,
      videoUrl: videoData.videoUrl,
      thumbnail: videoData.thumbnail,
      duration: videoData.duration,
      category: videoData.category,
      description: description
    });

    try {
      // Préparer les données complètes pour le parent
      const completeVideoData = {
        ...videoData,
        description: description,
        // Générer un ID temporaire si pas fourni
        id: videoData.id || `temp-${Date.now()}`,
        date: new Date().toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        likes: 0,
        comments: 0,
      };

      console.log("📤 VideoForm - Sending complete data to parent:", completeVideoData);

      // Notifier le parent avec les données complètes
      if (onVideoAdded) {
        onVideoAdded(completeVideoData);
      }

      console.log("✅ VideoForm - Successfully notified parent");

      // Fermer le dialog
      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      console.error('❌ VideoForm - Error in form submission:', error);
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
