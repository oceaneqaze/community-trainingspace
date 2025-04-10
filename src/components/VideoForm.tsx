
import React from 'react';
import { VideoProps } from './VideoCard';
import ThumbnailUploader from './ThumbnailUploader';
import VideoUploader from './VideoUploader';
import { useVideoFormData } from './video-form/useVideoFormData';
import BasicVideoDetails from './video-form/BasicVideoDetails';
import UploadProgress from './video-form/UploadProgress';
import FormButtons from './video-form/FormButtons';
import VideoFormTabs from './video-form/VideoFormTabs';

interface VideoFormProps {
  onSubmit: (video: Partial<VideoProps>) => void;
  video?: VideoProps;
  onCancel?: () => void;
  isLoading?: boolean;
}

const VideoForm: React.FC<VideoFormProps> = ({ 
  onSubmit, 
  video, 
  onCancel, 
  isLoading = false 
}) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    duration,
    thumbnailPreview,
    activeTab,
    setActiveTab,
    uploadStatus,
    handleThumbnailChange,
    handleVideoChange,
    handleExternalUrlChange,
    handleDurationExtracted,
    handleSubmit
  } = useVideoFormData(video);

  const VideoFormContent = (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="space-y-4">
      <BasicVideoDetails 
        title={title}
        description={description}
        category={category}
        duration={duration}
        isLoading={isLoading || uploadStatus.isLoading}
        setTitle={setTitle}
        setDescription={setDescription}
        setCategory={setCategory}
      />
      
      <VideoUploader
        disabled={isLoading || uploadStatus.isLoading}
        onVideoChange={handleVideoChange}
        onDurationExtracted={handleDurationExtracted}
        onExternalUrlChange={handleExternalUrlChange}
      />
      
      <ThumbnailUploader
        initialPreview={thumbnailPreview}
        disabled={isLoading || uploadStatus.isLoading}
        onThumbnailChange={handleThumbnailChange}
      />
      
      <UploadProgress progress={uploadStatus.progress} />
      
      <FormButtons 
        isLoading={isLoading} 
        uploadLoading={uploadStatus.isLoading}
        onCancel={onCancel}
        isEdit={!!video}
      />
    </form>
  );

  return (
    <div>
      {video?.id ? (
        <VideoFormTabs 
          videoId={video.id} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        >
          {VideoFormContent}
        </VideoFormTabs>
      ) : (
        VideoFormContent
      )}
    </div>
  );
};

export default VideoForm;
