
import React from 'react';
import { useParams } from 'react-router-dom';
import { RelatedVideos } from '@/components/video';
import VideoHeader from '@/components/video/detail/VideoHeader';
import VideoMainContent from '@/components/video/detail/VideoMainContent';
import { useVideoDetailLogic } from '@/components/video/detail/useVideoDetailLogic';
import { Skeleton } from '@/components/ui/skeleton';

const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
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
    navigate,
    videoError
  } = useVideoDetailLogic(id);

  if (isLoading) return (
    <div className="page-container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-[60vh] w-full mb-6" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-24 w-full mb-4" />
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-32 w-full mb-4" />
        </div>
      </div>
    </div>
  );
  
  if (!video) return <div className="page-container">Vidéo non trouvée</div>;

  return (
    <div className="page-container">
      <VideoHeader onBack={() => navigate(-1)} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <VideoMainContent
          videoUrl={video.videoUrl}
          videoRef={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          progress={progress}
          completed={completed}
          onMarkCompleted={handleMarkCompleted}
          onResetProgress={handleResetProgress}
          initialTime={progress ? (progress / 100) * (videoRef.current?.duration || 0) : 0}
          title={video.title}
          description={video.description}
          category={video.category}
          date={video.date}
          likesCount={likesCount}
          videoId={video.id}
          liked={liked}
          onLike={toggleLike}
          likeProcessing={processing}
          comments={comments}
          onAddComment={handleAddComment}
          onLikeComment={() => {}}
          loadingComments={loadingComments}
          videoError={videoError}
        />

        <div className="lg:col-span-1">
          <RelatedVideos videoId={video.id} category={video.category} />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
