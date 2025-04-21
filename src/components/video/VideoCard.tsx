
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import VideoProgressBar from './VideoProgressBar';

export interface VideoProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  date: string;
  likes?: number;
  comments?: number;
  progress?: number;
  completed?: boolean;
  videoUrl?: string;
}

interface VideoCardProps {
  video: VideoProps;
  onClick?: () => void;
  className?: string;
  showProgress?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  video, 
  onClick, 
  className,
  showProgress = true
}) => {
  const { 
    title, 
    thumbnail, 
    duration, 
    category, 
    date, 
    progress, 
    completed 
  } = video;

  return (
    <Card 
      className={cn("overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer", className)}
      onClick={onClick}
    >
      <div className="aspect-video relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 text-xs font-medium text-white bg-black/70 rounded">
          {duration}
        </div>
        {category && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-black/50 hover:bg-black/60 text-white border-none">
              {category}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-3">
        <h3 className="font-medium line-clamp-2 mb-1">{title}</h3>
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>{date}</span>
        </div>
        
        {showProgress && typeof progress === 'number' && (
          <VideoProgressBar 
            progress={progress} 
            completed={completed}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
