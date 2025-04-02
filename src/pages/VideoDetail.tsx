
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

// Modified interface to avoid the type conflict with 'comments'
interface VideoDetail extends Omit<VideoProps, "thumbnail" | "comments"> {
  description: string;
  videoUrl: string;
  comments: CommentProps[];
}

// Mock data for the video details
const getMockVideoData = (id: string): VideoDetail => {
  return {
    id,
    title: 'Techniques avancées de résolution',
    description: 'Dans cette vidéo, nous explorons des techniques avancées pour résoudre des problèmes complexes. Apprenez comment aborder méthodiquement chaque défi et développer des solutions efficaces.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '24:15',
    category: 'Avancé',
    date: '18 Juillet 2023',
    likes: 42,
    progress: 45,
    comments: [
      {
        id: '1',
        userId: 'user1',
        username: 'Sophie Martin',
        avatar: 'https://i.pravatar.cc/150?img=1',
        content: 'Excellente vidéo ! J\'ai beaucoup appris sur ces techniques avancées.',
        timestamp: 'Il y a 2 jours',
        likes: 5,
        onLike: () => {}
      },
      {
        id: '2',
        userId: 'user2',
        username: 'Thomas Dubois',
        avatar: 'https://i.pravatar.cc/150?img=2',
        content: 'Pourriez-vous faire une vidéo sur des cas pratiques spécifiques ?',
        timestamp: 'Il y a 1 jour',
        likes: 3,
        onLike: () => {}
      }
    ]
  };
};

const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const { isAuthenticated, user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (id) {
      // In a real app, this would be an API call
      const videoData = getMockVideoData(id);
      setVideo(videoData);
    }
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

  if (!video) return <div className="page-container">Chargement...</div>;

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
