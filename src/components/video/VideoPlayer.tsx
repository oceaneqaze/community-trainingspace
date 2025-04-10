
import React, { useEffect, useRef } from 'react';
import { DEFAULT_THUMBNAIL } from '@/data/mockData';

interface VideoPlayerProps {
  videoUrl: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, poster = DEFAULT_THUMBNAIL }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isScreenRecUrl = videoUrl?.includes('screenrec.com/share');
  
  // Handle WebVideoCore initialization for ScreenRec videos
  useEffect(() => {
    if (isScreenRecUrl && iframeRef.current) {
      const iframe = iframeRef.current;
      const videoId = videoUrl.split('/').pop();
      
      if (!videoId) return;
      
      // Set up message event listener
      const handleMessage = (event: MessageEvent) => {
        if (event.source !== iframe.contentWindow) return;
        
        const key = 'data' in event ? 'data' : 'message';
        const details = event[key];
        
        if (details?.message === 'init') {
          sendMessageToPlayer();
        }
      };
      
      // Function to send initialization data to player
      const sendMessageToPlayer = () => {
        // The m3u8 URL pattern for ScreenRec
        const m3u8Url = `https://upww.screenrec.com/videos/${videoId}.mp4/index.m3u8`;
        
        iframe.contentWindow?.postMessage({
          message: 'init',
          data: {
            customUrl: m3u8Url,
            customPoster: poster,
            colorBase: '#8B5CF6',
            colorText: '#ffffff',
            colorHover: '#9b87f5',
            threeColorsMode: true,
            playButton: true,
            playButtonStyle: 'pulsing'
          }
        }, '*');
      };
      
      // Add event listener
      window.addEventListener('message', handleMessage, false);
      
      // Initialize the player
      sendMessageToPlayer();
      
      // Clean up event listener on unmount
      return () => {
        window.removeEventListener('message', handleMessage, false);
      };
    }
  }, [videoUrl, isScreenRecUrl, poster]);
  
  // Render WebVideoCore player for ScreenRec videos
  if (isScreenRecUrl) {
    return (
      <div className="rounded-lg overflow-hidden bg-black">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            ref={iframeRef}
            src="https://play.webvideocore.net/html5.html"
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
            allowTransparency
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="ScreenRec Video"
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
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="External Video"
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
