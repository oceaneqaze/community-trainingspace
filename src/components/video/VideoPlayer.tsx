
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

  useEffect(() => {
    console.log("VideoPlayer mounted with URL:", videoUrl);
    return () => {
      console.log("VideoPlayer unmounted");
    };
  }, [videoUrl]); // Add videoUrl as dependency

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error("Erreur de lecture vidéo:", e);
    const videoElement = e.currentTarget;
    const errorCode = videoElement.error?.code;
    const errorMessage = videoElement.error?.message;
    
    console.error(`Code d'erreur: ${errorCode}, Message: ${errorMessage}`);
    
    let userMessage = "Impossible de lire cette vidéo. ";
    
    switch(errorCode) {
      case 1:
        userMessage += "L'opération d'extraction a été interrompue par l'utilisateur.";
        break;
      case 2:
        userMessage += "Erreur réseau, vérifiez votre connexion.";
        break;
      case 3:
        userMessage += "Problème de décodage, format non supporté.";
        break;
      case 4:
        userMessage += "La vidéo est inaccessible ou corrompue.";
        break;
      default:
        userMessage += "Vérifiez l'URL ou le format de la vidéo.";
    }
    
    setError(userMessage);
  };

  // Amélioration de la détection et du traitement des vidéos ScreenRec
  const extractScreenRecId = (url: string) => {
    // Format: https://upww.screenrec.com/videos/f_JwRfuHyGo4ziAWpUChcOTnEDY5N0QVrI.mp4/index.m3u8
    const regex = /\/f_([A-Za-z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const isExternalVideo = React.useMemo(() => {
    if (!videoUrl) return false;
    return videoUrl.includes('screenrec.com') || 
           (videoUrl.startsWith('http') && !videoUrl.includes('storage.googleapis.com'));
  }, [videoUrl]);

  const processedVideoUrl = React.useMemo(() => {
    if (!videoUrl) return '';
    
    if (videoUrl.includes('screenrec.com')) {
      const screenRecId = extractScreenRecId(videoUrl);
      if (screenRecId) {
        console.log("ID ScreenRec extrait:", screenRecId);
        return screenRecId;
      }
    }
    
    return videoUrl;
  }, [videoUrl]);

  // Logging pour diagnostic
  useEffect(() => {
    console.log("URL vidéo originale:", videoUrl);
    console.log("URL vidéo traitée:", processedVideoUrl);
    console.log("Est une vidéo externe:", isExternalVideo);
  }, [videoUrl, processedVideoUrl, isExternalVideo]);

  // Render iframe for external videos
  if (isExternalVideo) {
    // Pour les vidéos ScreenRec spécifiquement
    if (videoUrl.includes('screenrec.com')) {
      const screenRecId = processedVideoUrl;
      const embedUrl = `https://screenrec.com/embed/${screenRecId}`;
      
      console.log("URL d'embed ScreenRec générée:", embedUrl);
      
      return (
        <div className={`relative aspect-video w-full bg-black ${className}`}>
          <iframe 
            src={embedUrl}
            title="ScreenRec video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full"
            onError={() => setError("Impossible de charger la vidéo ScreenRec")}
          />
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4">
              <p>{error}</p>
            </div>
          )}
        </div>
      );
    }
    
    // Pour les autres vidéos externes
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
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4">
            <p>{error}</p>
          )}
        </div>
      );
    }
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
