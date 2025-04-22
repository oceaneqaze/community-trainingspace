
import React, { useRef, useEffect, forwardRef, ForwardRefRenderFunction, useState } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  onTimeUpdate?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onEnded?: () => void;
  initialTime?: number;
  className?: string;
  poster?: string;
}

const VideoPlayer: ForwardRefRenderFunction<HTMLVideoElement, VideoPlayerProps> = (
  { videoUrl, onTimeUpdate, onEnded, initialTime = 0, className = "", poster },
  ref
) => {
  const internalRef = useRef<HTMLVideoElement>(null);
  const resolvedRef = ref || internalRef;
  const [error, setError] = useState<string | null>(null);
  
  // Set initial time if provided
  useEffect(() => {
    if (initialTime > 0 && typeof resolvedRef !== 'function' && resolvedRef.current) {
      resolvedRef.current.currentTime = initialTime;
    }
  }, [initialTime, resolvedRef]);

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error("Erreur de lecture vidéo:", e);
    setError("Impossible de lire cette vidéo. Vérifiez l'URL ou le format.");
  };

  const isExternalVideo = videoUrl?.includes('screenrec.com') || 
                          (videoUrl?.startsWith('http') && 
                          !videoUrl?.includes('storage.googleapis.com'));

  // Logging pour diagnostic
  useEffect(() => {
    console.log("URL vidéo chargée:", videoUrl);
    console.log("Est une vidéo externe:", isExternalVideo);
  }, [videoUrl, isExternalVideo]);

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
          onError={() => setError("Impossible de charger la vidéo externe")}
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white">
            <p>{error}</p>
          </div>
        )}
      </div>
    );
  }

  // Render native video player for uploaded videos
  return (
    <div className="relative">
      <video
        ref={resolvedRef as React.RefObject<HTMLVideoElement>}
        controls
        className={`aspect-video w-full bg-black ${className}`}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onError={handleError}
        poster={poster}
      >
        <source src={videoUrl} type="video/mp4" />
        Votre navigateur ne prend pas en charge la lecture vidéo.
      </video>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default forwardRef(VideoPlayer);
