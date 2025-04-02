
import React from 'react';
import { Clock, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoThumbnailProps {
  thumbnail: string;
  title: string;
  duration: string;
  viewed?: boolean;
  onClick?: () => void;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  thumbnail,
  title,
  duration,
  viewed,
  onClick
}) => {
  return (
    <div className="relative" onClick={onClick}>
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img 
          src={thumbnail} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="absolute bottom-3 right-3 flex items-center justify-center">
        <span className="flex items-center space-x-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
          <Clock className="h-3 w-3" />
          <span>{duration}</span>
        </span>
      </div>
      
      {viewed && (
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-green-500/90 px-2 py-0.5 text-xs text-white">
            Vu
          </span>
        </div>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100 bg-black/10 backdrop-blur-[2px]">
        <div className="rounded-full bg-white/90 p-3 shadow-lg">
          <Play className="h-6 w-6 text-primary" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
