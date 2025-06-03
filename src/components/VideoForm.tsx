
import React from 'react';
import ThumbnailUploader from './ThumbnailUploader';
import { useVideoFormData } from './video-form/useVideoFormData';
import BasicVideoDetails from './video-form/BasicVideoDetails';
import FormButtons from './video-form/FormButtons';
import UploadProgress from './video-form/UploadProgress';
import VideoUploader from './VideoUploader';
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
    handleMetadataChange,
    handleThumbnailChange,
  } = useVideoFormData();

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
    <form onSubmit={(e) => handleSubmit(e, handleFormSubmit)} className="space-y-6">
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

      <VideoUploader 
        onVideoChange={handleVideoChange} 
        onDurationExtracted={handleDurationExtracted} 
        onExternalUrlChange={handleExternalUrlChange}
        onMetadataChange={handleMetadataChange}
      />

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
