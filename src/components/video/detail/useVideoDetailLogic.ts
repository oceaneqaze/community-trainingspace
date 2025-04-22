
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useVideoLike } from '@/hooks/useVideoLike';
import { useVideoData } from '@/hooks/useVideoData';
import { useVideoTimeTracking } from '@/hooks/useVideoTimeTracking';
import { useVideoComments } from '@/hooks/useVideoComments';

export const useVideoDetailLogic = (videoId: string | undefined) => {
  const { isAuthenticated, user } = useAuth();
  const { video, setVideo, isLoading, videoError, navigate } = useVideoData(videoId);
  const { liked, likesCount, toggleLike, processing } = useVideoLike(videoId || "");
  const { comments, loadingComments, fetchComments, handleAddComment } = useVideoComments(videoId || "");
  const {
    videoRef,
    progress,
    completed,
    handleTimeUpdate,
    handleVideoEnd,
    handleMarkCompleted,
    handleResetProgress
  } = useVideoTimeTracking(videoId);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (videoId) {
      fetchComments(videoId);
    }
  }, [videoId, isAuthenticated]);

  useEffect(() => {
    if (video) setVideo({ ...video, likes: likesCount });
  }, [likesCount]);

  const onAddComment = (content: string) => {
    handleAddComment(content, user);
  };

  return {
    video,
    isLoading,
    comments,
    loadingComments,
    videoRef,
    liked,
    likesCount,
    toggleLike,
    processing,
    progress,
    completed,
    handleTimeUpdate,
    handleVideoEnd,
    handleMarkCompleted,
    handleResetProgress,
    handleAddComment: onAddComment,
    navigate,
    videoError
  };
};
