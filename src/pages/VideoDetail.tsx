import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookmarkCheck, RotateCcw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { VideoProps } from '@/components/VideoCard';
import { 
  VideoPlayer,
  VideoInfo,
  CommentSection,
  RelatedVideos
} from '@/components/video';
import { CommentProps } from '@/components/video/CommentItem';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { DEFAULT_THUMBNAIL } from '@/data/mockData';
import { useVideoLike } from "@/hooks/useVideoLike";
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { Button } from '@/components/ui/button';
import VideoProgressBar from '@/components/video/VideoProgressBar';

interface DBComment {
  id: string;
  user_id: string | null;
  video_id: string | null;
  content: string;
  created_at: string | null;
}

interface VideoDetail extends Omit<VideoProps, "thumbnail" | "comments"> {
  description: string;
  videoUrl: string;
  comments: CommentProps[];
}

const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { liked, likesCount, toggleLike, processing } = useVideoLike(id || "");
  const { 
    progress, 
    completed, 
    updateProgress, 
    markAsCompleted, 
    resetProgress 
  } = useVideoProgress(id);

  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const { isAuthenticated, user, profile } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!id) return;
    
    const video = e.currentTarget;
    const currentProgress = Math.floor((video.currentTime / video.duration) * 100);
    
    if (currentProgress % 5 === 0 || currentProgress > 95) {
      const isCompleted = currentProgress > 95;
      updateProgress(id, currentProgress, isCompleted);
    }
  };

  const handleVideoEnd = () => {
    if (id) {
      markAsCompleted(id);
      toast({
        title: "Vidéo terminée",
        description: "Cette vidéo a été marquée comme terminée",
      });
    }
  };
  
  const handleMarkCompleted = () => {
    if (id) {
      markAsCompleted(id);
      toast({
        title: "Vidéo marquée comme terminée",
        description: "Vous pouvez continuer à la regarder à tout moment",
      });
    }
  };
  
  const handleResetProgress = () => {
    if (id) {
      resetProgress(id);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
      toast({
        title: "Progression réinitialisée",
        description: "La progression de cette vidéo a été remise à zéro",
      });
    }
  };

  const fetchComments = async (videoId: string) => {
    setLoadingComments(true);
    try {
      const { data: dbComments, error } = await supabase
        .from('video_comments')
        .select('*')
        .eq('video_id', videoId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedComments: CommentProps[] = await Promise.all(
        (dbComments || []).map(async (comment: DBComment) => {
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
    if (!user || !id) {
      toast({
        title: "Non authentifié",
        description: "Veuillez vous connecter pour commenter.",
        variant: "destructive",
      });
      return;
    }
    try {
      const { data, error } = await supabase
        .from('video_comments')
        .insert({
          video_id: id,
          user_id: user.id,
          content,
        })
        .select()
        .single();

      if (error) throw error;

      fetchComments(id);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le commentaire.",
        variant: "destructive",
      });
    }
  };

  const handleCommentLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!id) return;

    const fetchVideoData = async () => {
      setIsLoading(true);
      try {
        const { data: videoData, error: videoError } = await supabase
          .from('videos')
          .select('*')
          .eq('id', id)
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
    fetchComments(id);
  }, [id, isAuthenticated, navigate, progress, completed]);

  useEffect(() => {
    if (video) setVideo({ ...video, likes: likesCount });
  }, [likesCount]);

  if (isLoading) return <div className="page-container">Chargement...</div>;
  if (!video) return <div className="page-container">Vidéo non trouvée</div>;

  return (
    <div className="page-container">
      <button
        onClick={goBack}
        className="flex items-center text-blue-600 mb-4 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Retour aux vidéos
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-4 relative">
            <VideoPlayer 
              videoUrl={video.videoUrl} 
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnd}
              ref={videoRef}
              initialTime={progress ? (progress / 100) * (videoRef.current?.duration || 0) : 0}
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Progression</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={completed}
                  onClick={handleMarkCompleted}
                  className="text-xs"
                >
                  <BookmarkCheck className="h-4 w-4 mr-1" />
                  Marquer comme terminé
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetProgress}
                  className="text-xs"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Réinitialiser
                </Button>
              </div>
            </div>
            <VideoProgressBar 
              progress={progress} 
              completed={completed} 
              className="h-2"
              showTooltip={false}
            />
          </div>

          <VideoInfo
            title={video.title}
            description={video.description}
            category={video.category}
            date={video.date}
            initialLikes={likesCount}
            videoId={video.id}
            liked={liked}
            onLike={toggleLike}
            likeProcessing={processing}
          />

          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
            onLikeComment={handleCommentLike}
            videoId={id || ""}
          />
          {loadingComments && (
            <div className="text-sm text-muted-foreground mt-2">
              Chargement des commentaires...
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <RelatedVideos />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
