
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { useVideoLike } from '@/hooks/useVideoLike';
import { CommentProps } from '@/components/video/CommentItem';

interface VideoDetail {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  category: string;
  date: string;
  likes: number;
  progress: number;
  completed: boolean;
  comments: CommentProps[];
}

export const useVideoDetailLogic = (videoId: string | undefined) => {
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const { isAuthenticated, user, profile } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { liked, likesCount, toggleLike, processing } = useVideoLike(videoId || "");
  const { progress, completed, updateProgress, markAsCompleted, resetProgress } = useVideoProgress(videoId);

  const fetchComments = async (id: string) => {
    setLoadingComments(true);
    try {
      const { data: dbComments, error } = await supabase
        .from('video_comments')
        .select('*')
        .eq('video_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedComments: CommentProps[] = await Promise.all(
        (dbComments || []).map(async (comment: any) => {
          let username = "Utilisateur";
          let avatar = "https://i.pravatar.cc/150?img=3";
          if (comment.user_id) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('name, avatar_url')
              .eq('id', comment.user_id)
              .maybeSingle();
            if (profileData) {
              username = profileData.name || username;
              avatar = profileData.avatar_url || avatar;
            }
          }
          return {
            id: comment.id,
            userId: comment.user_id || '',
            username,
            avatar,
            content: comment.content,
            timestamp: comment.created_at
              ? new Date(comment.created_at).toLocaleString('fr-FR', {
                  day: '2-digit', month: '2-digit', year: '2-digit',
                  hour: '2-digit', minute: '2-digit'
                })
              : 'Maintenant',
            likes: 0,
            onLike: () => {},
          };
        })
      );
      setComments(mappedComments);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les commentaires.",
        variant: "destructive",
      });
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async (content: string) => {
    if (!user || !videoId) {
      toast({
        title: "Non authentifié",
        description: "Veuillez vous connecter pour commenter.",
        variant: "destructive",
      });
      return;
    }
    try {
      const { error } = await supabase
        .from('video_comments')
        .insert({
          video_id: videoId,
          user_id: user.id,
          content,
        });

      if (error) throw error;

      fetchComments(videoId);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le commentaire.",
        variant: "destructive",
      });
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!videoId) return;
    
    const video = e.currentTarget;
    const currentProgress = Math.floor((video.currentTime / video.duration) * 100);
    
    if (currentProgress % 5 === 0 || currentProgress > 95) {
      const isCompleted = currentProgress > 95;
      updateProgress(videoId, currentProgress, isCompleted);
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!videoId) return;

    const fetchVideoData = async () => {
      setIsLoading(true);
      try {
        const { data: videoData, error: videoError } = await supabase
          .from('videos')
          .select('*')
          .eq('id', videoId)
          .maybeSingle();

        if (videoError) throw videoError;
        if (!videoData) {
          toast({
            title: "Erreur",
            description: "Vidéo non trouvée",
            variant: "destructive",
          });
          navigate('/videos');
          return;
        }

        const formattedVideo: VideoDetail = {
          id: videoData.id,
          title: videoData.title,
          description: videoData.description || '',
          videoUrl: videoData.video_url,
          duration: videoData.duration || '00:00',
          category: videoData.category || 'Sans catégorie',
          date: new Date(videoData.created_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          likes: 0,
          progress: progress,
          completed: completed,
          comments: [],
        };
        setVideo(formattedVideo);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger la vidéo",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoData();
    fetchComments(videoId);
  }, [videoId, isAuthenticated, navigate, progress, completed]);

  useEffect(() => {
    if (video) setVideo({ ...video, likes: likesCount });
  }, [likesCount]);

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
    handleAddComment,
    navigate
  };
};
