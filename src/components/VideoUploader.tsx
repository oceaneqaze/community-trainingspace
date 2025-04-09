
import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileVideo, X, Link } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [videoFileName, setVideoFileName] = useState<string>('');
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string>('');
  const [externalUrl, setExternalUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>("upload");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Increased file size limit to 1000MB (1GB)
      const maxSizeInBytes = 1000 * 1024 * 1024; 
      
      if (file.size > maxSizeInBytes) {
        alert("Le fichier est trop volumineux. La taille maximum est de 1GB.");
        return;
      }
      
      onVideoChange(file);
      setVideoFileName(file.name);
      
      // Create a temporary URL for preview and metadata extraction
      const videoURL = URL.createObjectURL(file);
      setPreviewVideoUrl(videoURL);
    }
  };

  const handleExternalUrlSubmit = () => {
    if (externalUrl && onExternalUrlChange) {
      onExternalUrlChange(externalUrl);
      // For preview purposes
      setPreviewVideoUrl(externalUrl);
      setVideoFileName('Vidéo externe');
    }
  };

  const clearVideo = () => {
    onVideoChange(null);
    if (onExternalUrlChange) onExternalUrlChange('');
    setVideoFileName('');
    setPreviewVideoUrl('');
    setExternalUrl('');
  };

  // Extract video duration when metadata is loaded
  React.useEffect(() => {
    if (videoRef.current && previewVideoUrl) {
      const handleMetadataLoaded = () => {
        if (videoRef.current) {
          const videoDuration = videoRef.current.duration;
          const minutes = Math.floor(videoDuration / 60);
          const seconds = Math.floor(videoDuration % 60);
          const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          onDurationExtracted(formattedDuration);
        }
      };

      videoRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
        }
      };
    }
  }, [previewVideoUrl, onDurationExtracted]);

  return (
    <div>
      <Label htmlFor="video">Fichier vidéo</Label>
      
      {!videoFileName ? (
        <div className="mt-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-2">
              <TabsTrigger value="upload">Upload de fichier</TabsTrigger>
              <TabsTrigger value="external">Lien externe</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <FileVideo className="h-8 w-8 text-gray-400" />
                  <label
                    htmlFor="video-upload"
                    className="mt-2 block text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                  >
                    Cliquez pour télécharger une vidéo
                    <Input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="sr-only"
                      onChange={handleVideoChange}
                      disabled={disabled}
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    MP4, WEBM, MOV jusqu'à 1GB
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="external">
              <div className="space-y-2">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <Link className="h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm font-medium">
                      Ajouter un lien vidéo externe
                    </p>
                    <div className="w-full mt-2 flex gap-2">
                      <Input
                        type="url"
                        placeholder="https://screenrec.com/share/..."
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        disabled={disabled}
                      />
                      <button
                        type="button"
                        onClick={handleExternalUrlSubmit}
                        className="px-3 py-1 bg-primary text-white rounded-md text-sm"
                        disabled={disabled || !externalUrl}
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Formats supportés: liens screenrec.com et autres services de vidéos en ligne
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <>
          <div className="mt-1 relative bg-gray-100 p-4 rounded-md">
            <div className="flex items-center">
              {externalUrl ? (
                <Link className="h-6 w-6 text-gray-500 mr-2" />
              ) : (
                <FileVideo className="h-6 w-6 text-gray-500 mr-2" />
              )}
              <span className="text-sm text-gray-700 truncate">
                {externalUrl ? externalUrl : videoFileName}
              </span>
            </div>
            <button
              type="button"
              onClick={clearVideo}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
              disabled={disabled}
            >
              <X className="h-4 w-4 text-gray-700" />
            </button>
          </div>
          
          {previewVideoUrl && (
            <div className="mt-2">
              <Label>Aperçu de la vidéo</Label>
              <div className="relative mt-1 aspect-video w-full max-w-lg overflow-hidden rounded-lg bg-gray-100">
                <video 
                  ref={videoRef} 
                  src={previewVideoUrl} 
                  className="h-full w-full" 
                  controls 
                />
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Hidden video element for metadata extraction if not visible */}
      {previewVideoUrl && !videoRef.current && (
        <video ref={videoRef} src={previewVideoUrl} className="hidden" />
      )}
    </div>
  );
};

export default VideoUploader;
