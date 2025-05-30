
import React, { useRef, useEffect, forwardRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  description?: string;
  category?: string;
  createdAt?: string;
  uploaderName?: string;
  className?: string;
  poster?: string;
  onTimeUpdate?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onEnded?: () => void;
  initialTime?: number;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({
  videoUrl,
  title,
  description,
  category,
  createdAt,
  uploaderName,
  className,
  poster,
  onTimeUpdate,
  onEnded,
  initialTime
}, ref) => {
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = ref || internalVideoRef;

  useEffect(() => {
    if (videoRef && 'current' in videoRef && videoRef.current) {
      videoRef.current.load();
      
      // Set initial time if provided
      if (initialTime && initialTime > 0) {
        videoRef.current.currentTime = initialTime;
      }
    }
  }, [videoUrl, initialTime]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // If no title is provided, render just the video player
  if (!title) {
    return (
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        controls
        preload="metadata"
        className={`w-full aspect-video bg-black ${className || ''}`}
        poster={poster || videoUrl.replace(/\.(mp4|mov|avi|webm)$/, '.jpg')}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/mov" />
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="relative">
        <video
          ref={videoRef}
          width="100%"
          height="auto"
          controls
          preload="metadata"
          className="w-full aspect-video bg-black"
          poster={poster || videoUrl.replace(/\.(mp4|mov|avi|webm)$/, '.jpg')}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/mov" />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
        
        {category && (
          <Badge className="absolute top-2 left-2 bg-black/70 text-white">
            {category}
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          {createdAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(createdAt)}
            </span>
          )}
          {uploaderName && (
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {uploaderName}
            </span>
          )}
        </div>
        
        {description && (
          <div className="text-gray-700">
            <p className="whitespace-pre-wrap">{description}</p>
          </div>
        )}
      </div>
    </Card>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
