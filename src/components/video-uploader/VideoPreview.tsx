
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Video, X, ExternalLink } from 'lucide-react';
import { videoPlatforms } from '@/utils/videoPlatforms';

interface VideoPreviewProps {
  fileName: string;
  isExternalUrl: boolean;
  previewVideoUrl?: string;
  thumbnailUrl?: string;
  platform?: string;
  onClear: () => void;
  disabled: boolean;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  fileName,
  isExternalUrl,
  previewVideoUrl,
  thumbnailUrl,
  platform,
  onClear,
  disabled
}) => {
  const platformInfo = platform ? videoPlatforms.find(p => p.name === platform) : null;

  return (
    <Card className="border-2 border-dashed border-green-300 bg-green-50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="flex-shrink-0">
              {platformInfo ? (
                <div className={`text-2xl ${platformInfo.color}`}>
                  {platformInfo.icon}
                </div>
              ) : (
                <Video className="h-8 w-8 text-green-600" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-green-800 truncate">
                  {fileName}
                </p>
                {platform && (
                  <span className={`text-xs px-2 py-1 rounded-full bg-white ${platformInfo?.color || 'text-gray-600'}`}>
                    {platform}
                  </span>
                )}
              </div>
              
              {isExternalUrl && (
                <div className="flex items-center gap-1 mt-1">
                  <ExternalLink className="h-3 w-3 text-green-600" />
                  <span className="text-sm text-green-700">
                    {platform ? `Vidéo ${platform}` : 'Lien externe'}
                  </span>
                </div>
              )}
              
              {previewVideoUrl && (
                <p className="text-xs text-green-600 mt-1 break-all">
                  {previewVideoUrl.length > 50 
                    ? `${previewVideoUrl.substring(0, 50)}...` 
                    : previewVideoUrl}
                </p>
              )}
            </div>
            
            {thumbnailUrl && (
              <div className="flex-shrink-0">
                <img 
                  src={thumbnailUrl} 
                  alt="Aperçu"
                  className="w-16 h-12 object-cover rounded border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClear}
            disabled={disabled}
            className="text-green-700 hover:text-green-900 hover:bg-green-100 ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
