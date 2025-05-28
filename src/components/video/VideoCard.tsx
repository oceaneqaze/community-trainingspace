
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
  description?: string; // Add description as optional property
}

interface VideoCardProps extends VideoProps {
  onClick?: () => void;
  className?: string;
  showStats?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnail,
  duration,
  category,
  date,
  likes,
  comments,
  onClick,
  className,
  showStats = true
}) => {
  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border/40 bg-card/80 backdrop-blur-sm overflow-hidden",
        className
      )}
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-black/70 text-white border-0">
            {category}
          </Badge>
        </div>
        <div className="absolute bottom-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white border-0 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration}
          </Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{date}</p>
        
        {showStats && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {comments}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
