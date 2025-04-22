
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
  }, [videoUrl]);

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

  // Pour les vidéos ScreenRec, utiliser leur lecteur intégré
  if (videoUrl && videoUrl.includes('screenrec.com')) {
    // Convertir l'URL en HTTPS si nécessaire
    const secureUrl = videoUrl.replace('http://', 'https://');
    
    // Extraire l'ID de la vidéo si c'est une URL directe
    let embedUrl = secureUrl;
    
    // Si c'est une URL de vidéo directe, la convertir en URL d'intégration
    if (secureUrl.includes('/videos/f_') || secureUrl.includes('/share/')) {
      const regex = /(?:share\/|videos\/f_)([A-Za-z0-9_-]+)/;
      const match = secureUrl.match(regex);
      const videoId = match ? match[1] : null;
      
      if (videoId) {
        embedUrl = `https://screenrec.com/embed/${videoId}`;
      }
    }
    
    return (
      <div className={`relative aspect-video w-full bg-black ${className}`}>
        <iframe 
          src={embedUrl}
          title="ScreenRec video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="w-full h-full"
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4">
            <p>{error}</p>
          </div>
        )}
      </div>
    );
  }
  
  // Pour vidéos externes non-ScreenRec
  if (videoUrl && videoUrl.startsWith('http') && !videoUrl.includes('storage.googleapis.com')) {
    // S'assurer que l'URL utilise HTTPS
    const secureUrl = videoUrl.replace('http://', 'https://');
    
    return (
      <div className={`relative aspect-video w-full bg-black ${className}`}>
        <iframe 
          src={secureUrl}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="w-full h-full"
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4">
            <p>{error}</p>
          </div>
        )}
      </div>
    );
  }

  // Lecteur de vidéo par défaut pour les vidéos téléchargées
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
