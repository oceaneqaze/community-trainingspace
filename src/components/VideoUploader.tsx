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
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ 
  disabled = false, 
  onVideoChange, 
  onDurationExtracted,
  onExternalUrlChange
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
    clearVideo
  } = useVideoUploader({
    onVideoChange,
    onDurationExtracted,
    onExternalUrlChange
  });

  const isExternalUrl = !!externalUrl;

  return (
    <div>
      <Label htmlFor="video">Fichier vidéo</Label>
      
      {!videoFileName ? (
        <div className="mt-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-2">
              <TabsTrigger value="upload">Upload de fichier</TabsTrigger>
              <TabsTrigger value="external">Lien externe (ScreenRec)</TabsTrigger> {/* Mise à jour ici */}
            </TabsList>
            
            <TabsContent value="upload">
              <FileUploadSection 
                handleVideoChange={handleVideoChange}
                disabled={disabled}
              />
            </TabsContent>
            
            <TabsContent value="external">
              <ExternalUrlSection
                externalUrl={externalUrl}
                setExternalUrl={setExternalUrl}
                handleExternalUrlSubmit={handleExternalUrlSubmit}
                disabled={disabled}
              />
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
