
import React from 'react';
import { DEFAULT_THUMBNAIL } from '@/data/mockData';

interface VideoPlayerProps {
  videoUrl: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, poster = DEFAULT_THUMBNAIL }) => {
  // Check if the URL is from screenrec.com
  const isScreenRecUrl = videoUrl?.includes('screenrec.com/share');
  
  if (isScreenRecUrl) {
    // Parse the screenrec share URL to get the video ID
    const videoId = videoUrl.split('/').pop();
    if (!videoId) return null;
    
    // Construct the embedding URL for screenrec
    const embedUrl = `https://screenrec.com/embed/${videoId}`;
    
    return (
      <div className="rounded-lg overflow-hidden bg-black">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video externe"
          ></iframe>
        </div>
      </div>
    );
  }
  
  // Handle other external video URLs
  const isExternalUrl = videoUrl?.startsWith('http') && !videoUrl?.includes('storage.googleapis.com');
  
  if (isExternalUrl) {
    return (
      <div className="rounded-lg overflow-hidden bg-black">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={videoUrl}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video externe"
          ></iframe>
        </div>
      </div>
    );
  }
  
  // Default video player for uploaded videos
  return (
    <div className="rounded-lg overflow-hidden bg-black">
      <video 
        controls 
        className="w-full aspect-video"
        poster={poster}
        src={videoUrl}
        preload="metadata"
        controlsList="nodownload"
        playsInline
      >
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  );
};

export default VideoPlayer;
