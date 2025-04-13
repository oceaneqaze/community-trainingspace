
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScreenRecUploader from '@/components/video-uploader/ScreenRecUploader';
import { toast } from "@/components/ui/use-toast";

const ScreenRecPreview: React.FC = () => {
  const [videoAdded, setVideoAdded] = useState(false);

  const handleVideoSubmit = (videoData: { videoUrl: string; thumbnailUrl: string; videoId: string }) => {
    // Dans une application réelle, nous voudrions sauvegarder ces informations
    // Pour l'instant, nous affichons juste un message de succès
    toast({
      title: "Vidéo prête à être utilisée",
      description: "Vous pouvez maintenant utiliser cette vidéo dans votre application",
    });
    
    setVideoAdded(true);
    
    // Instruction pour copier le code d'intégration (pour information seulement)
    const integrationCode = `
// Utiliser le lecteur vidéo avec:
<VideoPlayer 
  videoUrl="${videoData.videoUrl}"
  poster="${videoData.thumbnailUrl}"
/>`;
    
    console.info("Code d'intégration:", integrationCode);
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
            
            {videoAdded && (
              <div className="mt-6 text-center p-4 bg-primary/10 rounded-md">
                <p className="text-sm">
                  Vidéo ajoutée avec succès! Vous pouvez maintenant l'utiliser dans votre application.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Consultez la console pour le code d'intégration (si nécessaire).
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScreenRecPreview;
