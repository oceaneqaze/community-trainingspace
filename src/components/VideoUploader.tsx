
import React from 'react';
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploadSection from "./video-uploader/FileUploadSection";
import ExternalUrlSection from "./video-uploader/ExternalUrlSection";
import VideoPreview from "./video-uploader/VideoPreview";
import { useVideoUploader } from "./video-uploader/useVideoUploader";

interface VideoUploaderProps {
  disabled?: boolean;
  onVideoChange: (file: File | null) => void;
  onDurationExtracted: (duration: string) => void;
  onExternalUrlChange?: (url: string) => void;
  screenRecVideoId?: string;
  screenRecPosterUrl?: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ 
  disabled = false, 
  onVideoChange, 
  onDurationExtracted,
  onExternalUrlChange,
  screenRecVideoId,
  screenRecPosterUrl
}) => {
  const {
    videoFileName,
    previewVideoUrl,
    externalUrl,
    setExternalUrl,
    activeTab,
    setActiveTab,
    videoRef,
    handleVideoChange,
    handleExternalUrlSubmit,
    handleScreenRecVideoSubmit,
    clearVideo
  } = useVideoUploader({
    onVideoChange,
    onDurationExtracted,
    onExternalUrlChange,
    screenRecVideoId,
    screenRecPosterUrl
  });

  const isExternalUrl = !!externalUrl;

  // Vérifier si des paramètres ScreenRec ont été fournis et les traiter
  React.useEffect(() => {
    if (screenRecVideoId && screenRecPosterUrl && !previewVideoUrl) {
      handleScreenRecVideoSubmit();
    }
  }, [screenRecVideoId, screenRecPosterUrl]);

  return (
    <div>
      <Label htmlFor="video">Fichier vidéo</Label>
      
      {!videoFileName ? (
        <div className="mt-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <span>📁</span> Upload depuis PC
              </TabsTrigger>
              <TabsTrigger value="external" className="flex items-center gap-2">
                <span>🔗</span> Lien externe
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-2">
              <FileUploadSection 
                handleVideoChange={handleVideoChange}
                disabled={disabled}
              />
              <p className="text-xs text-muted-foreground text-center">
                💾 Stockage sécurisé avec Firebase Storage
              </p>
            </TabsContent>
            
            <TabsContent value="external" className="space-y-2">
              <ExternalUrlSection
                externalUrl={externalUrl}
                setExternalUrl={setExternalUrl}
                handleExternalUrlSubmit={handleExternalUrlSubmit}
                disabled={disabled}
              />
              <p className="text-xs text-muted-foreground text-center">
                🌐 Support des liens ScreenRec et autres plateformes
              </p>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <VideoPreview
          fileName={externalUrl || videoFileName}
          isExternalUrl={isExternalUrl}
          previewVideoUrl={previewVideoUrl}
          onClear={clearVideo}
          disabled={disabled}
        />
      )}
      
      {/* Hidden video element for metadata extraction if not visible */}
      {previewVideoUrl && !videoRef.current && (
        <video ref={videoRef} src={previewVideoUrl} className="hidden" />
      )}
    </div>
  );
};

export default VideoUploader;
