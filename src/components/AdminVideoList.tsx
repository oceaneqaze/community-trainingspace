import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { VideoProps } from './VideoCard';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import VideoForm from './VideoForm';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_THUMBNAIL } from '@/data/mockData';

interface AdminVideoListProps {
  videos: VideoProps[];
  onVideoAdded: (video: Partial<VideoProps>) => void;
  onVideoUpdated: (video: Partial<VideoProps>) => void;
  onVideoDeleted: (videoId: string) => void;
}

const AdminVideoList: React.FC<AdminVideoListProps> = ({
  videos,
  onVideoAdded,
  onVideoUpdated,
  onVideoDeleted
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddClick = () => {
    setEditingVideo(null);
    setShowForm(true);
  };

  const handleEditClick = (video: VideoProps) => {
    setEditingVideo(video);
    setShowForm(true);
  };

  const handleDeleteClick = async (videoId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette vidéo?')) {
      setIsLoading(true);
      try {
        const { error } = await supabase
          .from('videos')
          .delete()
          .eq('id', videoId);
          
        if (error) throw error;
        
        onVideoDeleted(videoId);
        toast({
          title: "Vidéo supprimée",
          description: "La vidéo a été supprimée avec succès.",
        });
      } catch (error) {
        console.error('Error deleting video:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression de la vidéo.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFormSubmit = async (videoData: Partial<VideoProps>) => {
    setIsLoading(true);
    
    try {
      if (editingVideo) {
        const { error } = await supabase
          .from('videos')
          .update({
            title: videoData.title,
            thumbnail_url: videoData.thumbnail,
            duration: videoData.duration,
            category: videoData.category,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingVideo.id);
          
        if (error) throw error;
        
        onVideoUpdated({ ...editingVideo, ...videoData });
        toast({
          title: "Vidéo mise à jour",
          description: "La vidéo a été mise à jour avec succès.",
        });
      } else {
        const { data, error } = await supabase
          .from('videos')
          .insert({
            title: videoData.title,
            thumbnail_url: videoData.thumbnail || DEFAULT_THUMBNAIL,
            duration: videoData.duration,
            category: videoData.category,
            video_url: videoData.videoUrl || 'https://example.com/placeholder.mp4' // Placeholder
          })
          .select('*')
          .single();
          
        if (error) throw error;
        
        const newVideo: VideoProps = {
          id: data.id,
          title: data.title,
          thumbnail: data.thumbnail_url || DEFAULT_THUMBNAIL,
          duration: data.duration || '00:00',
          category: data.category || 'Sans catégorie',
          date: new Date(data.created_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          likes: 0,
          comments: 0,
          videoUrl: data.video_url
        };
        
        onVideoAdded(newVideo);
        toast({
          title: "Vidéo ajoutée",
          description: "La vidéo a été ajoutée avec succès.",
        });
      }
    } catch (error) {
      console.error('Error submitting video:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de la vidéo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowForm(false);
      setEditingVideo(null);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingVideo(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestion des vidéos</h2>
        <Button 
          onClick={handleAddClick}
          className="flex items-center"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une vidéo
        </Button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-medium mb-4">
            {editingVideo ? 'Modifier la vidéo' : 'Ajouter une nouvelle vidéo'}
          </h3>
          <VideoForm 
            onSubmit={handleFormSubmit} 
            video={editingVideo || undefined} 
            onCancel={handleFormCancel}
            isLoading={isLoading}
          />
        </div>
      )}

      <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Miniature</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.length > 0 ? (
              videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="h-14 w-20 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{video.title}</TableCell>
                  <TableCell>{video.category}</TableCell>
                  <TableCell>{video.duration}</TableCell>
                  <TableCell>{video.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditClick(video)}
                        disabled={isLoading}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteClick(video.id)}
                        className="text-red-500 hover:text-red-600"
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  Aucune vidéo disponible. Cliquez sur "Ajouter une vidéo" pour commencer.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminVideoList;
