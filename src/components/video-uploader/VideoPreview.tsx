
import React from 'react';
import { FileVideo, Link, X } from 'lucide-react';
import { Label } from "@/components/ui/label";

interface VideoPreviewProps {
  fileName: string;
  isExternalUrl: boolean;
  previewVideoUrl: string;
  onClear: () => void;
  disabled: boolean;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  fileName,
  isExternalUrl,
  previewVideoUrl,
  onClear,
  disabled
}) => {
  return (
    <>
      <div className="mt-1 relative bg-gray-100 p-4 rounded-md">
        <div className="flex items-center">
          {isExternalUrl ? (
            <Link className="h-6 w-6 text-gray-500 mr-2" />
          ) : (
            <FileVideo className="h-6 w-6 text-gray-500 mr-2" />
          )}
          <span className="text-sm text-gray-700 truncate">
            {fileName}
          </span>
        </div>
        <button
          type="button"
          onClick={onClear}
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
              src={previewVideoUrl}
              className="h-full w-full"
              controls
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPreview;
