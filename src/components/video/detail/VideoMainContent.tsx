
import React from 'react';
import { VideoPlayer, VideoInfo, CommentSection } from '@/components/video';
import VideoProgressSection from './VideoProgressSection';
import { toast } from '@/components/ui/use-toast';
import { CommentProps } from '@/components/video/CommentItem';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

interface VideoMainContentProps {
  videoUrl: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  onTimeUpdate: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onEnded: () => void;
  progress: number;
  completed: boolean;
  onMarkCompleted: () => void;
  onResetProgress: () => void;
  initialTime: number;
  title: string;
  description: string;
  category: string;
  date: string;
  likesCount: number;
  videoId: string;
  liked: boolean;
  onLike: () => void;
  likeProcessing: boolean;
  comments: CommentProps[];
  onAddComment: (content: string) => void;
  onLikeComment: (commentId: string) => void;
  loadingComments: boolean;
  videoError?: string | null;
}

const VideoMainContent: React.FC<VideoMainContentProps> = ({
  videoUrl,
  videoRef,
  onTimeUpdate,
  onEnded,
  progress,
  completed,
  onMarkCompleted,
  onResetProgress,
  initialTime,
  title,
  description,
  category,
  date,
  likesCount,
  videoId,
  liked,
  onLike,
  likeProcessing,
  comments,
  onAddComment,
  onLikeComment,
  loadingComments,
  videoError,
}) => {
  return (
    <div className="lg:col-span-2">
      {videoError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{videoError}</AlertDescription>
        </Alert>
      )}
      
      <div className="mb-4 relative">
        <VideoPlayer 
          videoUrl={videoUrl} 
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          ref={videoRef}
          initialTime={initialTime}
        />
      </div>

      <VideoProgressSection
        progress={progress}
        completed={completed}
        onMarkCompleted={onMarkCompleted}
        onResetProgress={onResetProgress}
      />

      <VideoInfo
        title={title}
        description={description}
        category={category}
        date={date}
        initialLikes={likesCount}
        videoId={videoId}
        liked={liked}
        onLike={onLike}
        likeProcessing={likeProcessing}
      />

      <CommentSection
        comments={comments}
        onAddComment={onAddComment}
        onLikeComment={onLikeComment}
        videoId={videoId}
      />
      {loadingComments && (
        <div className="text-sm text-muted-foreground mt-2">
          Chargement des commentaires...
        </div>
      )}
    </div>
  );
};

export default VideoMainContent;
