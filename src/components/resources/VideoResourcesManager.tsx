
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download, Plus, Trash2 } from 'lucide-react';
import { useResources } from '@/hooks/useResources';
import ResourceUploader from './ResourceUploader';
import { Resource } from '@/types/resource.types';
import { Card } from '@/components/ui/card';

interface VideoResourcesManagerProps {
  videoId: string;
}

const VideoResourcesManager: React.FC<VideoResourcesManagerProps> = ({ videoId }) => {
  const [showUploader, setShowUploader] = useState(false);
  const { resources, isLoading, uploadResource, deleteResource, fetchResourcesByVideo } = useResources();

  useEffect(() => {
    if (videoId) {
      fetchResourcesByVideo(videoId);
    }
  }, [videoId]);

  const handleFileUpload = async (file: File, title: string, description: string) => {
    const result = await uploadResource(file, videoId, title, description);
    if (result) {
      setShowUploader(false);
      fetchResourcesByVideo(videoId);
    }
  };

  const handleDelete = async (resourceId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette ressource ?")) {
      const success = await deleteResource(resourceId);
      if (success) {
        fetchResourcesByVideo(videoId);
      }
    }
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Documents associés</h3>
        {!showUploader && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowUploader(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Ajouter un document
          </Button>
        )}
      </div>

      {showUploader ? (
        <Card className="p-4">
          <ResourceUploader
            onFileSelect={handleFileUpload}
            isLoading={isLoading}
          />
          <div className="flex justify-end mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowUploader(false)}
            >
              Annuler
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-center p-6">
              <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : resources.length > 0 ? (
            <div className="space-y-2">
              {resources.map((resource: Resource) => (
                <div 
                  key={resource.id} 
                  className="flex items-center p-3 border rounded-md bg-background"
                >
                  <FileText className="h-5 w-5 text-blue-500 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{resource.title}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(resource.file_size)}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      asChild
                    >
                      <a href={resource.file_url} target="_blank" rel="noopener noreferrer" download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(resource.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground p-3 text-center">
              Aucun document n'est associé à cette vidéo
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default VideoResourcesManager;
