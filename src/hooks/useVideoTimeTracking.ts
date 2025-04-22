
import { useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useVideoProgress } from '@/hooks/useVideoProgress';

export const useVideoTimeTracking = (videoId: string | undefined) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { progress, completed, updateProgress, markAsCompleted, resetProgress } = useVideoProgress(videoId);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!videoId) return;
    
    try {
      const video = e.currentTarget;
      const currentProgress = Math.floor((video.currentTime / video.duration) * 100);
      
      if (currentProgress % 5 === 0 || currentProgress > 95) {
        const isCompleted = currentProgress > 95;
        updateProgress(videoId, currentProgress, isCompleted);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du temps de lecture:", error);
    }
  };

  const handleVideoEnd = () => {
    if (videoId) {
      markAsCompleted(videoId);
      toast({
        title: "Vidéo terminée",
        description: "Cette vidéo a été marquée comme terminée",
      });
    }
  };

  const handleMarkCompleted = () => {
    if (videoId) {
      markAsCompleted(videoId);
      toast({
        title: "Vidéo marquée comme terminée",
        description: "Vous pouvez continuer à la regarder à tout moment",
      });
    }
  };

  const handleResetProgress = () => {
    if (videoId) {
      resetProgress(videoId);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
      toast({
        title: "Progression réinitialisée",
        description: "La progression de cette vidéo a été remise à zéro",
      });
    }
  };

  return {
    videoRef,
    progress,
    completed,
    handleTimeUpdate,
    handleVideoEnd,
    handleMarkCompleted,
    handleResetProgress
  };
};
