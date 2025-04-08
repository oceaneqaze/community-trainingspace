
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResourceUploader from './ResourceUploader';
import ResourcesList from './ResourcesList';
import { useResources } from '@/hooks/useResources';
import { useAuth } from '@/context/AuthContext';

interface ResourcesDialogProps {
  isOpen: boolean;
  videoId: string;
  videoTitle: string;
  onClose: () => void;
}

const ResourcesDialog: React.FC<ResourcesDialogProps> = ({ 
  isOpen, 
  videoId, 
  videoTitle,
  onClose 
}) => {
  const { isAdmin } = useAuth();
  const {
    resources,
    isLoading,
    uploadStatus,
    fetchResourcesByVideo,
    uploadResource,
    deleteResource
  } = useResources();

  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState<string>("resources");
  
  // Charger les ressources quand le dialogue s'ouvre
  useEffect(() => {
    if (isOpen && videoId) {
      fetchResourcesByVideo(videoId);
    }
  }, [isOpen, videoId]);
  
  const handleFileUpload = async (file: File, title: string, description: string) => {
    const result = await uploadResource(file, videoId, title, description);
    if (result) {
      fetchResourcesByVideo(videoId);
      setActiveTab("resources");
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Documents de support</DialogTitle>
          <DialogDescription>
            Documents PDF associés à la vidéo "{videoTitle}"
          </DialogDescription>
        </DialogHeader>
        
        {isAdmin() ? (
          <Tabs defaultValue="resources" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="resources">Documents</TabsTrigger>
              <TabsTrigger value="upload">Ajouter un document</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources" className="py-4">
              <ResourcesList 
                resources={resources} 
                isLoading={isLoading} 
                onDelete={handleDelete}
              />
            </TabsContent>
            
            <TabsContent value="upload" className="py-4">
              <ResourceUploader 
                onFileSelect={handleFileUpload}
                isLoading={isLoading || uploadStatus.isLoading}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="py-4">
            <ResourcesList resources={resources} isLoading={isLoading} />
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourcesDialog;
