
import React from 'react';
import { cn } from '@/lib/utils';
import VideoThumbnail from './VideoThumbnail';
import VideoActions from './VideoActions';
import VideoProgress from './VideoProgress';
import { useNavigate } from 'react-router-dom';

export type VideoProps = {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  date: string;
  viewed?: boolean;
  progress?: number;
  likes?: number;
  comments?: number;
  videoUrl?: string;
};

interface VideoCardProps {
  video: VideoProps;
  className?: string;
  onClick?: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, className, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/videos/${video.id}`);
    }
  };

  const handleComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/videos/${video.id}`);
  };

  return (
    <div 
      className={cn(
        "overflow-hidden rounded-lg bg-white shadow card-hover cursor-pointer animate-scale-in", 
        className
      )}
      onClick={handleClick}
    >
      <VideoThumbnail 
        thumbnail={video.thumbnail}
        title={video.title}
        duration={video.duration}
        viewed={video.viewed}
      />
      
      <div className="p-4">
        <span className="text-xs font-medium text-blue-600">{video.category}</span>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold text-gray-900">{video.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">{video.date}</span>
          
          <VideoActions 
            initialLikes={video.likes || 0}
            commentsCount={video.comments || 0}
            onComments={handleComments}
          />
        </div>
        
        <VideoProgress progress={video.progress} />
      </div>
    </div>
  );
};

export default VideoCard;
