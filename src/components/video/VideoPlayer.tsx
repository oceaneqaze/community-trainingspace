
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

  // Amélioration de la détection des vidéos externes
  const isExternalVideo = React.useMemo(() => {
    if (!videoUrl) return false;
    
    // Vérifier si c'est une URL ScreenRec
    if (videoUrl.includes('screenrec.com')) {
      // S'assurer que les URL ScreenRec utilisent embed plutôt que index.m3u8
      return true;
    }
    
    // Autres vidéos externes (non hébergées sur notre service)
    return videoUrl.startsWith('http') && !videoUrl.includes('storage.googleapis.com');
  }, [videoUrl]);

  // Traitement spécial pour les URL ScreenRec
  const processedVideoUrl = React.useMemo(() => {
    if (!videoUrl) return '';
    
    if (videoUrl.includes('screenrec.com') && videoUrl.includes('index.m3u8')) {
      // Transformer les URL index.m3u8 en URL d'embed pour une meilleure compatibilité
      return videoUrl.replace('/index.m3u8', '');
    }
    
    return videoUrl;
  }, [videoUrl]);

  // Logging pour diagnostic
  useEffect(() => {
    console.log("URL vidéo traitée:", processedVideoUrl);
    console.log("Est une vidéo externe:", isExternalVideo);
  }, [processedVideoUrl, isExternalVideo]);

  // Render iframe for external videos
  if (isExternalVideo) {
    // Pour les vidéos ScreenRec, utiliser leur lecteur intégré
    if (processedVideoUrl.includes('screenrec.com')) {
      return (
        <div className={`relative aspect-video w-full bg-black ${className}`}>
          <iframe 
            src={`https://screenrec.com/embed/${processedVideoUrl.split('/').pop()?.split('.')[0]}`} 
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full"
            onError={() => setError("Impossible de charger la vidéo externe")}
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
          src={processedVideoUrl} 
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="w-full h-full"
          onError={() => setError("Impossible de charger la vidéo externe")}
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4">
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
        <source src={processedVideoUrl} type="video/mp4" />
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
