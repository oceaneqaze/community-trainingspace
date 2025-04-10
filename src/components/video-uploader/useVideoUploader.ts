import { useState, useRef, useEffect } from 'react';

interface UseVideoUploaderProps {
  onVideoChange: (file: File | null) => void;
  onDurationExtracted: (duration: string) => void;
  onExternalUrlChange?: (url: string) => void;
  screenRecVideoId?: string; // ID de la vidéo ScreenRec
  screenRecPosterUrl?: string; // URL de prévisualisation (GIF)
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

  // Gestion des fichiers vidéo locaux
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Limite de taille de fichier à 1GB
      const maxSizeInBytes = 1000 * 1024 * 1024; 
      
      if (file.size > maxSizeInBytes) {
        alert("Le fichier est trop volumineux. La taille maximum est de 1GB.");
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
      setPreviewVideoUrl(externalUrl); // Prévisualisation
      setVideoFileName('Vidéo externe');
    }
  };

  // Gestion des vidéos ScreenRec
  const handleScreenRecVideoSubmit = () => {
    if (screenRecVideoId && screenRecPosterUrl) {
      const videoUrl = `https://upww.screenrec.com/videos/f_${screenRecVideoId}.mp4/index.m3u8`;
      
      setPreviewVideoUrl(videoUrl); // URL de prévisualisation
      setVideoFileName('Vidéo ScreenRec');
      setPreviewImage(screenRecPosterUrl); // Prévisualisation GIF

      // Appeler le callback si défini
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

  // Extraire la durée de la vidéo
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

  // Mise à jour de la prévisualisation du GIF
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
