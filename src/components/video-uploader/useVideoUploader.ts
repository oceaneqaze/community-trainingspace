
import { useState, useRef, useEffect } from 'react';

interface UseVideoUploaderProps {
  onVideoChange: (file: File | null) => void;
  onDurationExtracted: (duration: string) => void;
  onExternalUrlChange?: (url: string) => void;
}

export const useVideoUploader = ({ 
  onVideoChange, 
  onDurationExtracted,
  onExternalUrlChange
}: UseVideoUploaderProps) => {
  const [videoFileName, setVideoFileName] = useState<string>('');
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string>('');
  const [externalUrl, setExternalUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>("upload");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Increased file size limit to 1000MB (1GB)
      const maxSizeInBytes = 1000 * 1024 * 1024; 
      
      if (file.size > maxSizeInBytes) {
        alert("Le fichier est trop volumineux. La taille maximum est de 1GB.");
        return;
      }
      
      onVideoChange(file);
      setVideoFileName(file.name);
      
      // Create a temporary URL for preview and metadata extraction
      const videoURL = URL.createObjectURL(file);
      setPreviewVideoUrl(videoURL);
    }
  };

  const handleExternalUrlSubmit = () => {
    if (externalUrl && onExternalUrlChange) {
      onExternalUrlChange(externalUrl);
      // For preview purposes
      setPreviewVideoUrl(externalUrl);
      setVideoFileName('Vidéo externe');
    }
  };

  const clearVideo = () => {
    onVideoChange(null);
    if (onExternalUrlChange) onExternalUrlChange('');
    setVideoFileName('');
    setPreviewVideoUrl('');
    setExternalUrl('');
  };

  // Extract video duration when metadata is loaded
  useEffect(() => {
    if (videoRef.current && previewVideoUrl) {
      const handleMetadataLoaded = () => {
        if (videoRef.current) {
          const videoDuration = videoRef.current.duration;
          const minutes = Math.floor(videoDuration / 60);
          const seconds = Math.floor(videoDuration % 60);
          const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          onDurationExtracted(formattedDuration);
        }
      };

      videoRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
        }
      };
    }
  }, [previewVideoUrl, onDurationExtracted]);

  return {
    videoFileName,
    previewVideoUrl,
    externalUrl,
    setExternalUrl,
    activeTab,
    setActiveTab,
    videoRef,
    handleVideoChange,
    handleExternalUrlSubmit,
    clearVideo
  };
};
