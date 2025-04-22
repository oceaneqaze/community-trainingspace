
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export const useUpdateProgress = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const updateProgress = async (id: string, newProgress: number, isCompleted: boolean = false) => {
    if (!user) return null;
    
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
      
      return data;
    } catch (err) {
      console.error('Error updating video progress:', err);
      setError('Failed to update video progress');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateProgress
  };
};
