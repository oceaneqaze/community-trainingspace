
import { useState, useRef, useEffect } from 'react';

interface UseVideoUploaderProps {
  onVideoChange: (file: File | null) => void;
  onDurationExtracted: (duration: string) => void;
  onExternalUrlChange?: (url: string) => void;
  screenRecVideoId?: string;
  screenRecPosterUrl?: string;
}

export const useVideoUploader = ({ 
  onVideoChange, 
  onDurationExtracted,
  onExternalUrlChange,
  screenRecVideoId,
  screenRecPosterUrl
}: UseVideoUploaderProps) => {
  const [videoFileName, setVideoFileName] = useState<string>('');
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string>('');
  const [externalUrl, setExternalUrl] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>("upload");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Gestion des fichiers vidéo locaux avec Firebase
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Limite de taille de fichier à 10GB (Firebase Storage limite)
      const maxSizeInBytes = 10 * 1024 * 1024 * 1024; 
      
      if (file.size > maxSizeInBytes) {
        alert("Le fichier est trop volumineux. La taille maximum est de 10GB.");
        return;
      }

      // Vérifier le type de fichier
      const supportedTypes = ['video/mp4', 'video/webm', 'video/mov', 'video/avi', 'video/quicktime'];
      if (!supportedTypes.includes(file.type)) {
        alert("Format de fichier non supporté. Utilisez MP4, WEBM, MOV ou AVI.");
        return;
      }
      
      onVideoChange(file);
      setVideoFileName(file.name);
      
      // Créer une URL temporaire pour la prévisualisation
      const videoURL = URL.createObjectURL(file);
      setPreviewVideoUrl(videoURL);
    }
  };

  // Gestion de l'URL externe
  const handleExternalUrlSubmit = () => {
    if (externalUrl && onExternalUrlChange) {
      onExternalUrlChange(externalUrl);
      setPreviewVideoUrl(externalUrl);
      setVideoFileName('Vidéo externe');
    }
  };

  const handleScreenRecVideoSubmit = () => {
    if (screenRecVideoId && screenRecPosterUrl) {
      const videoUrl = `https://upww.screenrec.com/videos/f_${screenRecVideoId}.mp4/index.m3u8`;
      
      setPreviewVideoUrl(videoUrl);
      setVideoFileName('Vidéo ScreenRec');
      setPreviewImage(screenRecPosterUrl);

      if (onExternalUrlChange) onExternalUrlChange(videoUrl);
    }
  };

  const clearVideo = () => {
    onVideoChange(null);
    if (onExternalUrlChange) onExternalUrlChange('');
    setVideoFileName('');
    setPreviewVideoUrl('');
    setExternalUrl('');
    setPreviewImage('');
  };

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

  useEffect(() => {
    if (screenRecPosterUrl) {
      setPreviewImage(screenRecPosterUrl);
    }
  }, [screenRecPosterUrl]);

  return {
    videoFileName,
    previewVideoUrl,
    externalUrl,
    setExternalUrl,
    previewImage,
    activeTab,
    setActiveTab,
    videoRef,
    handleVideoChange,
    handleExternalUrlSubmit,
    handleScreenRecVideoSubmit,
    clearVideo
  };
};
