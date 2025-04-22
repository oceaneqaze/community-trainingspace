
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export const useFetchProgress = (videoId?: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

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
      
      return data;
    } catch (err) {
      console.error('Error fetching video progress:', err);
      setError('Failed to load video progress');
      return null;
    } finally {
      setLoading(false);
    }
  };

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

  return {
    loading,
    error,
    fetchProgress,
    fetchMultipleProgress
  };
};
