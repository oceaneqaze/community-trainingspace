
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, Heart, Send, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { VideoProps } from '@/components/VideoCard';

// Types
interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

// Modified interface to avoid the type conflict with 'comments'
interface VideoDetail extends Omit<VideoProps, "thumbnail" | "comments"> {
  description: string;
  videoUrl: string;
  comments: Comment[];
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
        likes: 5
      },
      {
        id: '2',
        userId: 'user2',
        username: 'Thomas Dubois',
        avatar: 'https://i.pravatar.cc/150?img=2',
        content: 'Pourriez-vous faire une vidéo sur des cas pratiques spécifiques ?',
        timestamp: 'Il y a 1 jour',
        likes: 3
      }
    ]
  };
};

const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { isAuthenticated, user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (id) {
      // In a real app, this would be an API call
      const videoData = getMockVideoData(id);
      setVideo(videoData);
      setLikesCount(videoData.likes);
    }
  }, [id, isAuthenticated, navigate]);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

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

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (video && user) {
      const newCommentObj: Comment = {
        id: `comment-${Date.now()}`,
        userId: user.id,
        username: profile?.name || 'Utilisateur',
        avatar: profile?.avatar_url || 'https://i.pravatar.cc/150?img=3',
        content: newComment,
        timestamp: 'À l\'instant',
        likes: 0
      };

      setVideo({
        ...video,
        comments: [newCommentObj, ...video.comments]
      });
      setNewComment('');
      
      toast({
        title: "Commentaire ajouté",
        description: "Votre commentaire a été publié avec succès.",
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
          <div className="rounded-lg overflow-hidden bg-black">
            <video 
              controls 
              className="w-full aspect-video"
              poster={`https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80`}
              src={video.videoUrl}
            >
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold">{video.title}</h1>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">{video.category} • {video.date}</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleLike}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full border hover:bg-gray-50"
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}`} />
                  <span>{likesCount}</span>
                </button>
              </div>
            </div>

            <p className="mt-4 text-gray-700">{video.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Commentaires ({video.comments.length})
            </h2>

            <form onSubmit={handleSubmitComment} className="mt-4 flex gap-2">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                className="flex-grow"
              />
              <Button type="submit" size="sm">
                <Send className="h-4 w-4 mr-1" />
                Envoyer
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              {video.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Avatar className="h-8 w-8 mr-3">
                      <img src={comment.avatar} alt={comment.username} />
                    </Avatar>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{comment.username}</h4>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="mt-1 text-gray-700">{comment.content}</p>
                      <div className="mt-2 flex items-center">
                        <button 
                          onClick={() => handleCommentLike(comment.id)}
                          className="flex items-center text-gray-500 text-sm hover:text-rose-500"
                        >
                          <Heart className="h-3 w-3 mr-1" />
                          {comment.likes} J'aime
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Vidéos similaires</h3>
          <div className="space-y-4">
            {/* Liste de vidéos recommandées */}
            <p className="text-gray-500 text-sm">Les recommandations personnalisées seront bientôt disponibles.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
