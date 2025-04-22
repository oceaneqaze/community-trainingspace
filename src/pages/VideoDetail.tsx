
import React from 'react';
import { useParams } from 'react-router-dom';
import { RelatedVideos } from '@/components/video';
import VideoHeader from '@/components/video/detail/VideoHeader';
import VideoMainContent from '@/components/video/detail/VideoMainContent';
import { useVideoDetailLogic } from '@/components/video/detail/useVideoDetailLogic';

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
    navigate
  } = useVideoDetailLogic(id);

  if (isLoading) return <div className="page-container">Chargement...</div>;
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
        />

        <div className="lg:col-span-1">
          <RelatedVideos />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
