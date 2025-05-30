
import React, { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Eye } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  description?: string;
  category?: string;
  createdAt: string;
  uploaderName?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  description,
  category,
  createdAt,
  uploaderName,
  className
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play peut être géré ici si nécessaire
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

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
          poster={videoUrl.replace(/\.(mp4|mov|avi|webm)$/, '.jpg')}
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
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(createdAt)}
          </span>
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
};

export default VideoPlayer;
