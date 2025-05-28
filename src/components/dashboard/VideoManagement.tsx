
import React, { useState } from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import AdminVideoList from '@/components/AdminVideoList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import VideoForm from '@/components/VideoForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface VideoManagementProps {
  videos: VideoProps[];
  onVideoAdded: (video: Partial<VideoProps>) => void;
  onVideoUpdated: (video: Partial<VideoProps>) => void;
  onVideoDeleted: (videoId: string) => void;
}

const VideoManagement: React.FC<VideoManagementProps> = ({
  videos,
  onVideoAdded,
  onVideoUpdated,
  onVideoDeleted
}) => {
  const [isAddVideoDialogOpen, setIsAddVideoDialogOpen] = useState(false);

  const handleVideoAdded = async (videoData: Partial<VideoProps>) => {
    console.log("🎯 VideoManagement - Received video data:", videoData);
    console.log("📊 VideoManagement - Current videos count before adding:", videos.length);
    
    try {
      // Sauvegarder en base de données
      console.log("💾 VideoManagement - Saving to database...");
      
      const { data, error } = await supabase
        .from('videos')
        .insert({
          title: videoData.title,
          description: videoData.description || '',
          thumbnail_url: videoData.thumbnail,
          video_url: videoData.videoUrl,
          duration: videoData.duration,
          category: videoData.category,
        })
        .select()
        .single();

      if (error) {
        console.error("❌ VideoManagement - Database error:", error);
        throw error;
      }

      console.log("✅ VideoManagement - Successfully saved to database:", data);

      // Créer l'objet vidéo complet avec l'ID de la base
      const completedVideo = {
        ...videoData,
        id: data.id,
        date: new Date(data.created_at).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
      };

      console.log("📤 VideoManagement - Calling parent onVideoAdded with:", completedVideo);
      
      // Appeler la fonction parent pour mettre à jour l'état
      onVideoAdded(completedVideo);
      
      console.log("✅ VideoManagement - Video added successfully, closing dialog");
      
      toast({
        title: "Succès",
        description: "La vidéo a été ajoutée avec succès",
      });
      
      setIsAddVideoDialogOpen(false);
    } catch (error: any) {
      console.error('❌ VideoManagement - Error adding video:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'ajout de la vidéo",
        variant: "destructive",
      });
    }
  };

  console.log("📋 VideoManagement render - Total videos:", videos.length);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Vidéos</h2>
        <Button 
          onClick={() => {
            console.log("➕ VideoManagement - Opening add video dialog");
            setIsAddVideoDialogOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter une vidéo
        </Button>
      </div>

      <AdminVideoList
        videos={videos}
        onVideoAdded={onVideoAdded}
        onVideoUpdated={onVideoUpdated}
        onVideoDeleted={onVideoDeleted}
      />

      <Dialog open={isAddVideoDialogOpen} onOpenChange={setIsAddVideoDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle vidéo</DialogTitle>
          </DialogHeader>
          <VideoForm 
            onVideoAdded={handleVideoAdded} 
            onClose={() => {
              console.log("🚪 VideoManagement - Closing video form dialog");
              setIsAddVideoDialogOpen(false);
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoManagement;
