
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import MultiPlatformVideoUploader from "./video-uploader/MultiPlatformVideoUploader";
import VideoPreview from "./video-uploader/VideoPreview";

interface VideoUploaderProps {
  disabled?: boolean;
  onVideoChange: (file: File | null) => void;
  onDurationExtracted: (duration: string) => void;
  onExternalUrlChange?: (url: string) => void;
  onMetadataChange?: (metadata: { title?: string; thumbnail?: string; platform?: string }) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ 
  disabled = false, 
  onVideoChange, 
  onDurationExtracted,
  onExternalUrlChange,
  onMetadataChange
}) => {
  const [selectedVideo, setSelectedVideo] = useState<{
    name: string;
    url?: string;
    platform?: string;
    thumbnail?: string;
    isFile: boolean;
  } | null>(null);

  const handleVideoData = (data: {
    videoUrl: string;
    thumbnailUrl?: string;
    platform?: string;
    title?: string;
    duration?: string;
  }) => {
    console.log('📹 VideoUploader - Received video data:', data);
    
    // Notifier le parent de l'URL de la vidéo
    if (onExternalUrlChange) {
      onExternalUrlChange(data.videoUrl);
    }
    
    // Notifier des métadonnées
    if (onMetadataChange) {
      onMetadataChange({
        title: data.title,
        thumbnail: data.thumbnailUrl,
        platform: data.platform,
      });
    }
    
    // Si on a une durée, la transmettre
    if (data.duration && onDurationExtracted) {
      onDurationExtracted(data.duration);
    }
    
    // Mettre à jour l'état local pour l'affichage
    setSelectedVideo({
      name: data.platform ? `Vidéo ${data.platform}` : 'Vidéo externe',
      url: data.videoUrl,
      platform: data.platform,
      thumbnail: data.thumbnailUrl,
      isFile: false,
    });
  };

  const handleFileUpload = (file: File) => {
    console.log('📁 VideoUploader - File uploaded:', file.name);
    
    // Notifier le parent du fichier
    onVideoChange(file);
    
    // Mettre à jour l'état local pour l'affichage
    setSelectedVideo({
      name: file.name,
      isFile: true,
    });
  };

  const clearVideo = () => {
    setSelectedVideo(null);
    onVideoChange(null);
    if (onExternalUrlChange) {
      onExternalUrlChange('');
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="video" className="text-base font-medium">
        Fichier vidéo
      </Label>
      
      {!selectedVideo ? (
        <MultiPlatformVideoUploader
          onVideoData={handleVideoData}
          onFileUpload={handleFileUpload}
          disabled={disabled}
        />
      ) : (
        <VideoPreview
          fileName={selectedVideo.name}
          isExternalUrl={!selectedVideo.isFile}
          previewVideoUrl={selectedVideo.url}
          thumbnailUrl={selectedVideo.thumbnail}
          platform={selectedVideo.platform}
          onClear={clearVideo}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default VideoUploader;
