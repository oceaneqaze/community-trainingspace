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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [screenRecDetails, setScreenRecDetails] = useState<{
    videoUrl?: string;
    posterUrl?: string;
  }>({});

  // Méthode pour extraire l'ID de la vidéo ScreenRec
  const extractScreenRecDetails = (url: string) => {
    const regex = /(?:share\/|videos\/f_|embed\/)([A-Za-z0-9_-]+)/;
    const match = url.match(regex);
    const videoId = match ? match[1] : null;

    if (videoId) {
      return {
        videoUrl: `https://upww.screenrec.com/videos/f_${videoId}.mp4/index.m3u8`,
        posterUrl: `https://upww.screenrec.com/images/f_${videoId}.gif`
      };
    }
    return {};
  };

  // Gestion des messages pour l'iframe ScreenRec
  useEffect(() => {
    if (videoUrl.includes('screenrec.com')) {
      const screenRecConfig = extractScreenRecDetails(videoUrl);
      setScreenRecDetails(screenRecConfig);

      const handleMessage = (event: MessageEvent) => {
        if (event.source !== iframeRef.current?.contentWindow) return;

        const details = event.data;
        const message = details.message;

        if (message === 'init') {
          iframeRef.current?.contentWindow?.postMessage({
            message: 'init',
            data: {
              customUrl: screenRecConfig.videoUrl || videoUrl,
              customPoster: poster || screenRecConfig.posterUrl,
              colorBase: '#250864',
              colorText: '#ffffff',
              colorHover: '#7f54f8',
              threeColorsMode: true,
              playButton: true,
              playButtonStyle: 'pulsing'
            }
          }, '*');
        }
      };

      window.addEventListener('message', handleMessage, false);
      
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [videoUrl, poster]);

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

  if (videoUrl.includes('screenrec.com')) {
    return (
      <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
        <iframe 
          ref={iframeRef}
          src="https://play.webvideocore.net/html5.html"
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allowFullScreen 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="ScreenRec video player"
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4">
            <p>{error}</p>
          </div>
        )}
      </div>
    );
  }

  if (videoUrl && videoUrl.startsWith('http') && !videoUrl.includes('storage.googleapis.com')) {
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
