
import React, { useState } from 'react';
import { Play, Clock, Heart, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
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
};

interface VideoCardProps {
  video: VideoProps;
  className?: string;
  onClick?: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, className, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes || 0);
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/video/${video.id}`);
  };

  return (
    <div 
      className={cn(
        "overflow-hidden rounded-lg bg-white shadow card-hover cursor-pointer animate-scale-in", 
        className
      )}
      onClick={onClick}
    >
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <div className="absolute bottom-3 right-3 flex items-center justify-center">
          <span className="flex items-center space-x-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
            <Clock className="h-3 w-3" />
            <span>{video.duration}</span>
          </span>
        </div>
        
        {video.viewed && (
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
      
      <div className="p-4">
        <span className="text-xs font-medium text-blue-600">{video.category}</span>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold text-gray-900">{video.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">{video.date}</span>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1 text-gray-600 hover:text-rose-500 transition-colors"
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="text-xs">{likesCount}</span>
            </button>
            
            <button 
              onClick={handleComments}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{video.comments || 0}</span>
            </button>
          </div>
        </div>
        
        {video.progress !== undefined && video.progress > 0 && (
          <div className="mt-2">
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
              <div 
                className="h-full rounded-full bg-blue-600" 
                style={{ width: `${video.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
