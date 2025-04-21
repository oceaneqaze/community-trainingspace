
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface VideoProgressData {
  videoId: string;
  progress: number;
  completed: boolean;
  lastUpdated: Date;
}

export const useVideoProgress = (videoId?: string) => {
  const [progress, setProgress] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch progress for a specific video
  const fetchProgress = async (id: string) => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('video_views')
        .select('progress, completed')
        .eq('video_id', id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setProgress(data.progress || 0);
        setCompleted(data.completed || false);
      }
    } catch (err) {
      console.error('Error fetching video progress:', err);
      setError('Failed to load video progress');
    } finally {
      setLoading(false);
    }
  };

  // Update video progress
  const updateProgress = async (id: string, newProgress: number, isCompleted: boolean = false) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('video_views')
        .upsert({
          video_id: id,
          user_id: user.id,
          progress: newProgress,
          completed: isCompleted,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      
      setProgress(newProgress);
      setCompleted(isCompleted);
      
      return data;
    } catch (err) {
      console.error('Error updating video progress:', err);
      setError('Failed to update video progress');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Mark video as completed
  const markAsCompleted = async (id: string) => {
    return updateProgress(id, 100, true);
  };

  // Reset video progress
  const resetProgress = async (id: string) => {
    return updateProgress(id, 0, false);
  };

  // Fetch progress for multiple videos
  const fetchMultipleProgress = async (ids: string[]) => {
    if (!user || !ids.length) return {};
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('video_views')
        .select('video_id, progress, completed')
        .eq('user_id', user.id)
        .in('video_id', ids);

      if (error) throw error;
      
      // Convert to object with video_id as key
      const progressMap: Record<string, {progress: number, completed: boolean}> = {};
      data.forEach(item => {
        progressMap[item.video_id] = {
          progress: item.progress || 0,
          completed: item.completed || false
        };
      });
      
      return progressMap;
    } catch (err) {
      console.error('Error fetching multiple video progress:', err);
      setError('Failed to load video progress data');
      return {};
    } finally {
      setLoading(false);
    }
  };

  // Load progress data if videoId is provided
  useEffect(() => {
    if (videoId && user) {
      fetchProgress(videoId);
    }
  }, [videoId, user]);

  return {
    progress,
    completed,
    loading,
    error,
    updateProgress,
    markAsCompleted,
    resetProgress,
    fetchMultipleProgress
  };
};
