
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThumbnailUploader from './ThumbnailUploader';
import { useVideoFormData } from './video-form/useVideoFormData';
import BasicVideoDetails from './video-form/BasicVideoDetails';
import FormButtons from './video-form/FormButtons';
import UploadProgress from './video-form/UploadProgress';
import VideoUploader from './VideoUploader';
import ScreenRecUploader from './video-uploader/ScreenRecUploader';

const VideoForm: React.FC = () => {
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
    // Mise à jour de l'URL externe
    if (handleExternalUrlChange) {
      handleExternalUrlChange(videoData.videoUrl);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, () => {})} className="space-y-4">
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
