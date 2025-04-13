
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScreenRecUploader from '@/components/video-uploader/ScreenRecUploader';
import { toast } from "@/components/ui/use-toast";

const ScreenRecPreview: React.FC = () => {
  // Fonction appelée quand une vidéo est soumise avec succès
  const handleVideoSubmit = (videoData: { videoUrl: string; thumbnailUrl: string; videoId: string }) => {
    toast({
      title: "Vidéo ajoutée avec succès",
      description: "La vidéo ScreenRec a été ajoutée à votre bibliothèque",
    });
  };

  return (
    <div className="page-container">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            🎬 Prévisualisation de Vidéos ScreenRec
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-4">
            <p className="text-muted-foreground text-center mb-6">
              Entrez l'ID de la vidéo ScreenRec ou collez l'URL complète pour prévisualiser et utiliser la vidéo
            </p>
            
            <ScreenRecUploader onVideoSubmit={handleVideoSubmit} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScreenRecPreview;
