
import { useEffect, useRef } from 'react';

interface ScreenRecPlayerProps {
  videoUrl: string;
  posterUrl: string;
}

const ScreenRecPlayer = ({ videoUrl, posterUrl }: ScreenRecPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendMessage = (message: string, data: any) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ message, data }, '*');
    }
  };

  const playerInit = () => {
    sendMessage('init', {
      customUrl: videoUrl,
      customPoster: posterUrl,
      colorBase: '#250864',
      colorText: '#ffffff',
      colorHover: '#7f54f8',
      threeColorsMode: true,
      playButton: true,
      playButtonStyle: 'pulsing'
    });
  };

  const onMessage = (event: MessageEvent) => {
    if (event.source !== iframeRef.current?.contentWindow) return;
    const details = event.data;
    if (details?.message === 'init') {
      playerInit();
    }
  };

  useEffect(() => {
    playerInit(); // init on mount
    window.addEventListener('message', onMessage, false);
    return () => window.removeEventListener('message', onMessage);
  }, [videoUrl, posterUrl]);

  return (
    <iframe
      ref={iframeRef}
      className="screenrec-player"
      src="https://play.webvideocore.net/html5.html"
      allowFullScreen
      allowTransparency
      style={{
        width: '100%',
        maxWidth: 800,
        height: 450,
        border: 'none',
        borderRadius: 12,
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
      }}
    />
  );
};

export default ScreenRecPlayer;
