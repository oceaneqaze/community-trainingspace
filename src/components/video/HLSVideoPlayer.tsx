
import React, { useRef, useEffect, forwardRef } from 'react';
import Hls from 'hls.js';

interface HLSVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  onTimeUpdate?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onEnded?: () => void;
  initialTime?: number;
  controls?: boolean;
  preload?: string;
}

const HLSVideoPlayer = forwardRef<HTMLVideoElement, HLSVideoPlayerProps>(({
  src,
  poster,
  className = "w-full aspect-video bg-black",
  onTimeUpdate,
  onEnded,
  initialTime,
  controls = true,
  preload = "metadata"
}, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const resolvedRef = ref || videoRef;

  useEffect(() => {
    const video = resolvedRef && 'current' in resolvedRef ? resolvedRef.current : null;
    if (!video || !src) return;

    // Nettoyer l'instance HLS précédente
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const isHLS = src.includes('.m3u8');
    
    if (isHLS) {
      if (Hls.isSupported()) {
        // Utiliser HLS.js pour les navigateurs qui ne supportent pas HLS nativement
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
        });
        
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('HLS manifest loaded, found ' + hls.levels.length + ' quality level');
          
          // Définir le temps initial si fourni
          if (initialTime && initialTime > 0) {
            video.currentTime = initialTime;
          }
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS error:', data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log('Fatal network error encountered, try to recover');
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('Fatal media error encountered, try to recover');
                hls.recoverMediaError();
                break;
              default:
                console.log('Fatal error, cannot recover');
                hls.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari supporte HLS nativement
        video.src = src;
        
        video.addEventListener('loadedmetadata', () => {
          if (initialTime && initialTime > 0) {
            video.currentTime = initialTime;
          }
        });
      } else {
        console.error('HLS is not supported in this browser');
      }
    } else {
      // Vidéo standard (MP4, WebM, etc.)
      video.src = src;
      
      video.addEventListener('loadedmetadata', () => {
        if (initialTime && initialTime > 0) {
          video.currentTime = initialTime;
        }
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, initialTime]);

  // Nettoyer lors du démontage du composant
  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, []);

  return (
    <video
      ref={resolvedRef}
      className={className}
      poster={poster}
      controls={controls}
      preload={preload}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
    >
      Votre navigateur ne supporte pas la lecture vidéo.
    </video>
  );
});

HLSVideoPlayer.displayName = 'HLSVideoPlayer';

export default HLSVideoPlayer;
