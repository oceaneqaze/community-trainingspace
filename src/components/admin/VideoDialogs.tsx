
import React from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VideoForm from './VideoForm';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

interface VideoDialogsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (isOpen: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  selectedVideo: VideoProps | null;
  isLoading: boolean;
  handleAddVideo: (videoData: Partial<VideoProps>) => Promise<void>;
  handleEditVideo: (videoData: Partial<VideoProps>) => Promise<void>;
  handleDeleteVideo: () => Promise<void>;
}

const VideoDialogs: React.FC<VideoDialogsProps> = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedVideo,
  isLoading,
  handleAddVideo,
  handleEditVideo,
  handleDeleteVideo,
}) => {
  return (
    <>
      {/* Add Video Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une vidéo</DialogTitle>
            <DialogDescription>
              Ajoutez une nouvelle vidéo à votre bibliothèque
            </DialogDescription>
          </DialogHeader>
          <VideoForm
            onSubmit={handleAddVideo}
            onCancel={() => setIsAddDialogOpen(false)}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Video Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier une vidéo</DialogTitle>
            <DialogDescription>
              Modifiez les détails de la vidéo
            </DialogDescription>
          </DialogHeader>
          {selectedVideo && (
            <VideoForm
              onSubmit={handleEditVideo}
              video={selectedVideo}
              onCancel={() => setIsEditDialogOpen(false)}
              isLoading={isLoading}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Video Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer la vidéo</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette vidéo? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DeleteConfirmationDialog
            onConfirm={handleDeleteVideo}
            onCancel={() => setIsDeleteDialogOpen(false)}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoDialogs;
