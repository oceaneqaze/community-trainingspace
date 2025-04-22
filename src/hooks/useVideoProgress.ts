
import { useState, useEffect } from 'react';
import { useFetchProgress } from './video-progress/useFetchProgress';
import { useUpdateProgress } from './video-progress/useUpdateProgress';

export const useVideoProgress = (videoId?: string) => {
  // Initialiser tous les états d'abord
  const [progress, setProgress] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  
  // Ensuite, initialiser les hooks personnalisés
  const { loading: fetchLoading, error: fetchError, fetchProgress, fetchMultipleProgress } = useFetchProgress();
  const { loading: updateLoading, error: updateError, updateProgress } = useUpdateProgress();

  // Enfin, utiliser useEffect
  useEffect(() => {
    if (videoId) {
      fetchProgress(videoId).then(data => {
        if (data) {
          setProgress(data.progress || 0);
          setCompleted(data.completed || false);
        }
      });
    }
  }, [videoId, fetchProgress]);

  const markAsCompleted = async (id: string) => {
    const result = await updateProgress(id, 100, true);
    if (result) {
      setProgress(100);
      setCompleted(true);
    }
    return result;
  };

  const resetProgress = async (id: string) => {
    const result = await updateProgress(id, 0, false);
    if (result) {
      setProgress(0);
      setCompleted(false);
    }
    return result;
  };

  return {
    progress,
    completed,
    loading: fetchLoading || updateLoading,
    error: fetchError || updateError,
    updateProgress,
    markAsCompleted,
    resetProgress,
    fetchMultipleProgress
  };
};
