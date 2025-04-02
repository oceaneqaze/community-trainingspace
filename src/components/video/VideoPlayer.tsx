
import React from 'react';
import { DEFAULT_THUMBNAIL } from '@/data/mockData';

interface VideoPlayerProps {
  videoUrl: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, poster = DEFAULT_THUMBNAIL }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-black">
      <video 
        controls 
        className="w-full aspect-video"
        poster={poster}
        src={videoUrl}
        preload="metadata"
        controlsList="nodownload"
      >
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  );
};

export default VideoPlayer;
