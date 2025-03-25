
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { VideoProps } from './VideoCard';
import { toast } from '@/components/ui/use-toast';
import ThumbnailUploader from './ThumbnailUploader';
import VideoUploader from './VideoUploader';
import { useFileUpload } from '@/hooks/useFileUpload';

interface VideoFormProps {
  onSubmit: (video: Partial<VideoProps>) => void;
  video?: VideoProps;
  onCancel?: () => void;
  isLoading?: boolean;
}

const VideoForm: React.FC<VideoFormProps> = ({ onSubmit, video, onCancel, isLoading = false }) => {
  const [title, setTitle] = useState(video?.title || '');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(video?.category || '');
  const [duration, setDuration] = useState(video?.duration || '');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(video?.thumbnail || '');
  const { uploadFile, status: uploadStatus } = useFileUpload();
  
  // Handle thumbnail change from ThumbnailUploader component
  const handleThumbnailChange = (file: File | null, previewUrl: string) => {
    setThumbnailFile(file);
    setThumbnailPreview(previewUrl);
  };
  
  // Handle video change from VideoUploader component
  const handleVideoChange = (file: File | null) => {
    setVideoFile(file);
  };
  
  // Handle duration extraction from VideoUploader component
  const handleDurationExtracted = (extractedDuration: string) => {
    setDuration(extractedDuration);
    console.log(`Durée extraite: ${extractedDuration}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading || uploadStatus.isLoading) return;
    
    if (!title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre est obligatoire",
        variant: "destructive",
      });
      return;
    }
    
    if (!videoFile && !video?.videoUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez télécharger une vidéo",
        variant: "destructive",
      });
      return;
    }
    
    try {
      let thumbnailUrl = thumbnailPreview;
      let videoUrl = video?.videoUrl;
      
      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile, 'videos', 'thumbnails/');
      }
      
      if (videoFile) {
        videoUrl = await uploadFile(videoFile, 'videos', 'content/');
      }
      
      const videoData: Partial<VideoProps> = {
        title,
        thumbnail: thumbnailUrl,
        duration, // Uses duration automatically extracted
        category,
        videoUrl,
      };
      
      if (video?.id) {
        videoData.id = video.id;
      }
      
      onSubmit(videoData);
    } catch (error: any) {
      console.error('Error uploading files:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'upload des fichiers",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Titre de la vidéo</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Saisissez le titre de la vidéo"
          required
          disabled={isLoading || uploadStatus.isLoading}
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Saisissez une description de la vidéo"
          rows={4}
          disabled={isLoading || uploadStatus.isLoading}
        />
      </div>
      
      <div>
        <Label htmlFor="category">Catégorie</Label>
        <Input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Ex: Débutant, Avancé..."
          required
          disabled={isLoading || uploadStatus.isLoading}
        />
      </div>
      
      {duration && (
        <p className="text-sm text-gray-500">
          Durée détectée: {duration}
        </p>
      )}
      
      <VideoUploader
        disabled={isLoading || uploadStatus.isLoading}
        onVideoChange={handleVideoChange}
        onDurationExtracted={handleDurationExtracted}
      />
      
      <ThumbnailUploader
        initialPreview={thumbnailPreview}
        disabled={isLoading || uploadStatus.isLoading}
        onThumbnailChange={handleThumbnailChange}
      />
      
      {uploadStatus.progress > 0 && uploadStatus.progress < 100 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${uploadStatus.progress}%` }}
          ></div>
          <p className="text-xs text-gray-500 mt-1">Upload: {uploadStatus.progress}%</p>
        </div>
      )}
      
      <div className="flex justify-end space-x-2 pt-4">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading || uploadStatus.isLoading}
          >
            Annuler
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={isLoading || uploadStatus.isLoading}
        >
          {isLoading || uploadStatus.isLoading ? 'Chargement...' : (video ? 'Mettre à jour' : 'Ajouter la vidéo')}
        </Button>
      </div>
    </form>
  );
};

export default VideoForm;
