
import React, { useRef, useEffect, forwardRef, ForwardRefRenderFunction } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  onTimeUpdate?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onEnded?: () => void;
  initialTime?: number;
  className?: string;
}

const VideoPlayer: ForwardRefRenderFunction<HTMLVideoElement, VideoPlayerProps> = (
  { videoUrl, onTimeUpdate, onEnded, initialTime = 0, className = "" },
  ref
) => {
  const internalRef = useRef<HTMLVideoElement>(null);
  const resolvedRef = ref || internalRef;
  
  // Set initial time if provided
  useEffect(() => {
    if (initialTime > 0 && typeof resolvedRef !== 'function' && resolvedRef.current) {
      resolvedRef.current.currentTime = initialTime;
    }
  }, [initialTime, resolvedRef]);

  const isExternalVideo = videoUrl?.includes('screenrec.com') || 
                         (videoUrl?.startsWith('http') && 
                          !videoUrl?.includes('storage.googleapis.com'));

  // Render iframe for external videos
  if (isExternalVideo) {
    return (
      <div className={`aspect-video w-full bg-black ${className}`}>
        <iframe 
          src={videoUrl} 
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  // Render native video player for uploaded videos
  return (
    <video
      ref={resolvedRef as React.RefObject<HTMLVideoElement>}
      controls
      className={`aspect-video w-full bg-black ${className}`}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
    >
      <source src={videoUrl} type="video/mp4" />
      Votre navigateur ne prend pas en charge la lecture vidéo.
    </video>
  );
};

export default forwardRef(VideoPlayer);
