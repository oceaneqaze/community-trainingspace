
import React from 'react';
import ModernCard from '@/components/ui/modern-card';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Clock, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface VideoProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  date: string;
  likes: number;
  comments: number;
  videoUrl: string;
  description?: string;
  progress?: number;
  completed?: boolean;
}

interface VideoCardProps {
  video: VideoProps;
  onClick?: () => void;
  className?: string;
  showStats?: boolean;
  showProgress?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onClick,
  className,
  showStats = true,
  showProgress = false
}) => {
  const {
    title,
    thumbnail,
    duration,
    category,
    date,
    likes,
    comments,
    progress,
    completed
  } = video;

  return (
    <ModernCard 
      variant="glass"
      hover={true}
      glow="purple"
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-500 hover:scale-[1.02]",
        className
      )}
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 left-3">
          <Badge className="modern-button text-xs px-2 py-1 bg-black/70 backdrop-blur-sm border-white/20">
            {category}
          </Badge>
        </div>
        
        <div className="absolute bottom-3 right-3">
          <Badge className="bg-black/70 backdrop-blur-sm text-white border-white/20 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration}
          </Badge>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="glass-card p-4 rounded-full border-white/30">
            <Play className="h-8 w-8 text-white drop-shadow-lg" fill="white" />
          </div>
        </div>

        {/* Progress bar with modern styling */}
        {showProgress && typeof progress === 'number' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 backdrop-blur-sm">
            <div 
              className={cn(
                "h-full transition-all duration-500 bg-gradient-to-r",
                completed 
                  ? "from-green-400 to-green-600" 
                  : "from-purple-500 to-pink-500"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg line-clamp-2 text-white group-hover:text-gradient-purple transition-all duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-400">{date}</p>
        
        {showStats && (
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                <Heart className="h-4 w-4" />
                {likes}
              </span>
              <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                <MessageCircle className="h-4 w-4" />
                {comments}
              </span>
            </div>
            {showProgress && typeof progress === 'number' && (
              <span className="text-xs font-medium">
                {completed ? (
                  <span className="text-green-400">✓ Terminée</span>
                ) : (
                  <span className="text-purple-400">{progress}%</span>
                )}
              </span>
            )}
          </div>
        )}
      </div>
    </ModernCard>
  );
};

export default VideoCard;
