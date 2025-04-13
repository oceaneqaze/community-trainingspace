
import React, { useState } from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface AdminVideoListProps {
  videos: VideoProps[];
  onVideoAdded: (video: Partial<VideoProps>) => void;
  onVideoUpdated: (video: Partial<VideoProps>) => void;
  onVideoDeleted: (videoId: string) => void;
}

interface VideoFormProps {
  onSubmit: (videoData: Partial<VideoProps>) => Promise<void>;
  video?: VideoProps;
  onCancel: () => void;
  isLoading: boolean;
}

const VideoForm: React.FC<VideoFormProps> = ({ onSubmit, video, onCancel, isLoading }) => {
  const [title, setTitle] = useState(video?.title || '');
  const [thumbnail, setThumbnail] = useState(video?.thumbnail || '');
  const [duration, setDuration] = useState(video?.duration || '');
  const [category, setCategory] = useState(video?.category || '');
  const [videoUrl, setVideoUrl] = useState(video?.videoUrl || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ title, thumbnail, duration, category, videoUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="thumbnail">Miniature (URL)</Label>
        <Input
          id="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="duration">Durée</Label>
        <Input
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="category">Catégorie</Label>
        <Input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="videoUrl">Vidéo (URL)</Label>
        <Input
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={isLoading}>
          {video ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};

const AdminVideoList: React.FC<AdminVideoListProps> = ({ 
  videos, 
  onVideoAdded, 
  onVideoUpdated, 
  onVideoDeleted 
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Add video function
  const handleAddVideo = async (videoData: Partial<VideoProps>) => {
    setIsLoading(true);
    try {
      // Convert the form data to Supabase format
      const { data, error } = await supabase
        .from('videos')
        .insert({
          title: videoData.title,
          thumbnail_url: videoData.thumbnail,
          duration: videoData.duration,
          category: videoData.category,
          video_url: videoData.videoUrl
        })
        .select();

      if (error) throw error;

      // If successful, close dialog and update UI
      const newVideo = {
        id: data[0].id,
        title: videoData.title || '',
        thumbnail: videoData.thumbnail || '',
        duration: videoData.duration || '',
        category: videoData.category || '',
        videoUrl: videoData.videoUrl || '',
        date: new Date().toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        likes: 0,
        comments: 0
      };

      onVideoAdded(newVideo);
      toast({
        title: "Vidéo ajoutée",
        description: "La vidéo a été ajoutée avec succès",
      });
      setIsAddDialogOpen(false);
    } catch (error: any) {
      console.error('Error adding video:', error);
      toast({
        title: "Erreur",
        description: `Impossible d'ajouter la vidéo: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Edit video function
  const handleEditVideo = async (videoData: Partial<VideoProps>) => {
    if (!selectedVideo) return;
    
    setIsLoading(true);
    try {
      // Convert the form data to Supabase format
      const { error } = await supabase
        .from('videos')
        .update({
          title: videoData.title,
          thumbnail_url: videoData.thumbnail,
          duration: videoData.duration,
          category: videoData.category,
          video_url: videoData.videoUrl
        })
        .eq('id', selectedVideo.id);

      if (error) throw error;

      // If successful, close dialog and update UI
      const updatedVideo = {
        ...selectedVideo,
        ...videoData
      };

      onVideoUpdated(updatedVideo);
      toast({
        title: "Vidéo mise à jour",
        description: "La vidéo a été mise à jour avec succès",
      });
      setIsEditDialogOpen(false);
    } catch (error: any) {
      console.error('Error updating video:', error);
      toast({
        title: "Erreur",
        description: `Impossible de mettre à jour la vidéo: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete video function
  const handleDeleteVideo = async () => {
    if (!selectedVideo) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', selectedVideo.id);

      if (error) throw error;

      onVideoDeleted(selectedVideo.id);
      toast({
        title: "Vidéo supprimée",
        description: "La vidéo a été supprimée avec succès",
      });
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      console.error('Error deleting video:', error);
      toast({
        title: "Erreur",
        description: `Impossible de supprimer la vidéo: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Vidéos ({videos.length})</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une vidéo
        </Button>
      </div>

      {/* Video List */}
      <div className="grid gap-4">
        {videos.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              Aucune vidéo n'a été ajoutée.
            </CardContent>
          </Card>
        ) : (
          videos.map(video => (
            <Card key={video.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-48 h-32 bg-muted relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-grow p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Catégorie: {video.category}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedVideo(video);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Éditer
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => {
                        setSelectedVideo(video);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

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
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteVideo}
              disabled={isLoading}
            >
              {isLoading ? "Suppression en cours..." : "Supprimer définitivement"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVideoList;
