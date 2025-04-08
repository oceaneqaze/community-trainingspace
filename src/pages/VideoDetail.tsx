
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

// Modified interface to include all the fields we need
interface VideoDetail extends Omit<VideoProps, "thumbnail" | "comments"> {
  description: string;
  videoUrl: string;
  comments: CommentProps[];
}

const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!id) return;

    const fetchVideoData = async () => {
      setIsLoading(true);
      try {
        // Fetch the video data from Supabase
        const { data: videoData, error: videoError } = await supabase
          .from('videos')
          .select('*')
          .eq('id', id)
          .single();

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

        // Fetch comments for this video (if we had a comments table)
        // For now, we'll use empty comments
        const comments: CommentProps[] = [];

        // Format the video data for our component
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
          comments: comments
        };

        setVideo(formattedVideo);
      } catch (error) {
        console.error('Error fetching video:', error);
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
  }, [id, isAuthenticated, navigate]);

  const handleCommentLike = (commentId: string) => {
    if (video) {
      const updatedComments = video.comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        return comment;
      });
      setVideo({ ...video, comments: updatedComments });
    }
  };

  const handleAddComment = (content: string) => {
    if (video && user) {
      const newCommentObj: CommentProps = {
        id: `comment-${Date.now()}`,
        userId: user.id,
        username: profile?.name || 'Utilisateur',
        avatar: profile?.avatar_url || 'https://i.pravatar.cc/150?img=3',
        content: content,
        timestamp: 'À l\'instant',
        likes: 0,
        onLike: () => {}
      };

      setVideo({
        ...video,
        comments: [newCommentObj, ...video.comments]
      });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

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
            initialLikes={video.likes}
            videoId={video.id}
          />

          <CommentSection 
            comments={video.comments}
            onAddComment={handleAddComment}
            onLikeComment={handleCommentLike}
          />
        </div>

        <div className="lg:col-span-1">
          <RelatedVideos />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
