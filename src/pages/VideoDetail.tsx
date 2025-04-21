import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

// Nouvelle interface pour le commentaire DB brut
interface DBComment {
  id: string;
  user_id: string | null;
  video_id: string | null;
  content: string;
  created_at: string | null;
  // updated_at non utilisé ici pour l’instant
}

interface VideoDetail extends Omit<VideoProps, "thumbnail" | "comments"> {
  description: string;
  videoUrl: string;
  comments: CommentProps[];
}

const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { liked, likesCount, toggleLike, processing } = useVideoLike(id || "");

  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const { isAuthenticated, user, profile } = useAuth();
  const navigate = useNavigate();

  // Récupération des commentaires
  const fetchComments = async (videoId: string) => {
    setLoadingComments(true);
    try {
      const { data: dbComments, error } = await supabase
        .from('video_comments')
        .select('*')
        .eq('video_id', videoId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // On va aussi charger les profils utilisateurs si besoin (par défaut on fake l’avatar/nickname)
      // Idéalement à optimiser (jointure ou cache), ici simple.
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
            onLike: () => {}, // à implémenter plus tard
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

  // Ajout de commentaire en base
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

      // Rafraîchit la liste après ajout
      fetchComments(id);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le commentaire.",
        variant: "destructive",
      });
    }
  };

  // Like d’un commentaire (à implémenter en base plus tard)
  const handleCommentLike = (commentId: string) => {
    // Pas d’implémentation de likes persistants ici (structure supabase non prévue pour les commentaires)
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

    // Récupère vidéo détails
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
          progress: 0,
          comments: [], // ignoré ici, géré séparément
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
  }, [id, isAuthenticated, navigate]);

  useEffect(() => {
    if (video) setVideo({ ...video, likes: likesCount });
    // eslint-disable-next-line
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
          <VideoPlayer videoUrl={video.videoUrl} />

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
