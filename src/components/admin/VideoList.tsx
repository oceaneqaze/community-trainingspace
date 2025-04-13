
import React from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import VideoCard from './VideoCard';
import EmptyVideoState from './EmptyVideoState';

interface VideoListProps {
  videos: VideoProps[];
  onEditVideo: (video: VideoProps) => void;
  onDeleteVideo: (video: VideoProps) => void;
}

const VideoList: React.FC<VideoListProps> = ({ 
  videos, 
  onEditVideo, 
  onDeleteVideo 
}) => {
  if (videos.length === 0) {
    return <EmptyVideoState />;
  }

  return (
    <div className="grid gap-4">
      {videos.map(video => (
        <VideoCard 
          key={video.id}
          video={video}
          onEdit={onEditVideo}
          onDelete={onDeleteVideo}
        />
      ))}
    </div>
  );
};

export default VideoList;
