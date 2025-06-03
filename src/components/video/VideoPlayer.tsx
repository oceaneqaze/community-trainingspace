
import React, { useRef, useEffect, forwardRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import HLSVideoPlayer from './HLSVideoPlayer';

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
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Détecter si c'est une vidéo HLS (.m3u8) ou ScreenRec
  const isHLS = videoUrl.includes('.m3u8') || videoUrl.includes('screenrec.com');

  // Si pas de titre, renvoyer seulement le lecteur vidéo
  if (!title) {
    return (
      <HLSVideoPlayer
        ref={ref}
        src={videoUrl}
        poster={poster || videoUrl.replace(/\.(mp4|mov|avi|webm)$/, '.jpg')}
        className={`w-full aspect-video bg-black ${className || ''}`}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        initialTime={initialTime}
      />
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="relative">
        <HLSVideoPlayer
          ref={ref}
          src={videoUrl}
          poster={poster || videoUrl.replace(/\.(mp4|mov|avi|webm)$/, '.jpg')}
          className="w-full aspect-video bg-black"
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          initialTime={initialTime}
        />
        
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
