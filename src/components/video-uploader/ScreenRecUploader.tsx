
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HLSVideoPlayer from "@/components/video/HLSVideoPlayer";
import { toast } from "@/components/ui/use-toast";

interface ScreenRecUploaderProps {
  onVideoSubmit: (videoData: { videoUrl: string; thumbnailUrl: string; videoId: string }) => void;
}

const ScreenRecUploader: React.FC<ScreenRecUploaderProps> = ({ onVideoSubmit }) => {
  const [videoId, setVideoId] = useState<string>('');
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string>('');
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);

  // Fonction pour générer une URL de prévisualisation GIF basée sur l'ID ScreenRec
  const generatePosterUrlFromId = (id: string) => {
    return `https://upww.screenrec.com/images/f_${id}.gif`;
  };

  // Mise à jour auto du poster URL quand l'ID change
  const handleVideoIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newId = e.target.value.trim();
    setVideoId(newId);
    
    // Proposer automatiquement une URL de poster
    if (newId && !posterUrl) {
      const generatedUrl = generatePosterUrlFromId(newId);
      setPosterUrl(generatedUrl);
    }
  };

  // Fonction pour extraire l'ID de la vidéo à partir d'une URL ScreenRec
  const extractVideoIdFromUrl = (url: string) => {
    const regex = /screenrec\.com\/share\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  // Gestion du collage d'une URL ScreenRec complète
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.includes('screenrec.com/share/')) {
      e.preventDefault();
      const extractedId = extractVideoIdFromUrl(pastedText);
      setVideoId(extractedId);
      
      // Générer aussi l'URL du poster
      const generatedUrl = generatePosterUrlFromId(extractedId);
      setPosterUrl(generatedUrl);
      
      toast({
        title: "ID ScreenRec détecté",
        description: `L'ID de vidéo a été extrait: ${extractedId}`,
      });
    }
  };

  // Prévisualiser la vidéo
  const handlePreviewClick = () => {
    if (!videoId) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer l'ID de la vidéo ScreenRec",
        variant: "destructive"
      });
      return;
    }

    // Construction de l'URL de la vidéo au format m3u8 (HLS)
    const videoUrl = `https://upww.screenrec.com/videos/f_${videoId}.mp4/index.m3u8`;
    setPreviewVideoUrl(videoUrl);
    setPreviewVisible(true);
    
    console.log('ScreenRec video URL generated:', videoUrl);
  };

  // Soumettre la vidéo
  const handleSubmit = () => {
    if (!videoId || !posterUrl || !previewVideoUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez prévisualiser la vidéo avant de l'ajouter",
        variant: "destructive"
      });
      return;
    }

    onVideoSubmit({
      videoUrl: previewVideoUrl,
      thumbnailUrl: posterUrl,
      videoId: videoId
    });
    
    toast({
      title: "Vidéo ajoutée",
      description: "La vidéo ScreenRec a été ajoutée avec succès",
    });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <h3 className="text-lg font-medium mb-2">Ajouter une vidéo ScreenRec</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Collez l'URL complète ou entrez directement l'ID de la vidéo ScreenRec
        </p>

        <div className="space-y-3">
          <div>
            <Label htmlFor="videoId">ID de la vidéo ScreenRec</Label>
            <Input
              id="videoId"
              value={videoId}
              onChange={handleVideoIdChange}
              onPaste={handlePaste}
              placeholder="ex: ixnzbml6CrZtDj8THq20haXUWLOdKypk"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Extrait du lien partagé ScreenRec (ou collez l'URL complète)
            </p>
          </div>

          <div>
            <Label htmlFor="posterUrl">URL de l'image d'aperçu (GIF)</Label>
            <Input
              id="posterUrl"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              placeholder="https://upww.screenrec.com/images/f_XXXX.gif"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Généralement au format https://upww.screenrec.com/images/f_[ID].gif
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              type="button" 
              onClick={handlePreviewClick} 
              className="flex-1"
              variant="outline"
            >
              Prévisualiser
            </Button>
            <Button 
              type="button" 
              onClick={handleSubmit} 
              className="flex-1"
              disabled={!previewVisible}
            >
              Ajouter la vidéo
            </Button>
          </div>
        </div>

        {previewVisible && previewVideoUrl && (
          <div className="mt-4">
            <Label>Aperçu de la vidéo</Label>
            <div className="mt-2 aspect-video rounded-md overflow-hidden">
              <HLSVideoPlayer src={previewVideoUrl} poster={posterUrl} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScreenRecUploader;
