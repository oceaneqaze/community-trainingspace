import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, X, FileVideo } from 'lucide-react';
import { VideoProps } from './VideoCard';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

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
  const [videoFileName, setVideoFileName] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [localLoading, setLocalLoading] = useState(false);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setThumbnailPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoFileName(file.name);
    }
  };

  const clearThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview('');
  };

  const clearVideo = () => {
    setVideoFile(null);
    setVideoFileName('');
  };

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${path}${uuidv4()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });
      
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
      
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading || localLoading) return;
    
    setLocalLoading(true);
    setUploadProgress(0);
    
    try {
      let thumbnailUrl = thumbnailPreview;
      let videoUrl = video?.videoUrl;
      
      if (thumbnailFile) {
        setUploadProgress(10);
        thumbnailUrl = await uploadFile(thumbnailFile, 'videos', 'thumbnails/');
        setUploadProgress(40);
      }
      
      if (videoFile) {
        setUploadProgress(50);
        videoUrl = await uploadFile(videoFile, 'videos', 'content/');
        setUploadProgress(90);
      }
      
      const videoData: Partial<VideoProps> = {
        title,
        thumbnail: thumbnailUrl,
        duration,
        category,
        videoUrl,
      };
      
      if (video?.id) {
        videoData.id = video.id;
      }
      
      setUploadProgress(100);
      
      onSubmit(videoData);
    } catch (error: any) {
      console.error('Error uploading files:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'upload des fichiers",
        variant: "destructive",
      });
      setLocalLoading(false);
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
          disabled={isLoading || localLoading}
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
          disabled={isLoading || localLoading}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Catégorie</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ex: Débutant, Avancé..."
            required
            disabled={isLoading || localLoading}
          />
        </div>
        
        <div>
          <Label htmlFor="duration">Durée (MM:SS)</Label>
          <Input
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Ex: 12:34"
            required
            pattern="[0-9]{1,2}:[0-9]{2}"
            title="Format: MM:SS (ex: 12:34)"
            disabled={isLoading || localLoading}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="thumbnail">Miniature</Label>
        
        {!thumbnailPreview ? (
          <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400" />
              <label
                htmlFor="thumbnail-upload"
                className="mt-2 block text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              >
                Cliquez pour télécharger une image
                <Input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleThumbnailChange}
                  disabled={isLoading || localLoading}
                />
              </label>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF jusqu'à 5MB
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-1 relative">
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="h-40 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={clearThumbnail}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              disabled={isLoading || localLoading}
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        )}
      </div>
      
      <div>
        <Label htmlFor="video">Fichier vidéo</Label>
        
        {!videoFileName ? (
          <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <FileVideo className="h-8 w-8 text-gray-400" />
              <label
                htmlFor="video-upload"
                className="mt-2 block text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              >
                Cliquez pour télécharger une vidéo
                <Input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="sr-only"
                  onChange={handleVideoChange}
                  disabled={isLoading || localLoading}
                />
              </label>
              <p className="mt-1 text-xs text-gray-500">
                MP4, WEBM, MOV jusqu'à 100MB
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-1 relative bg-gray-100 p-4 rounded-md">
            <div className="flex items-center">
              <FileVideo className="h-6 w-6 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700 truncate">{videoFileName}</span>
            </div>
            <button
              type="button"
              onClick={clearVideo}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
              disabled={isLoading || localLoading}
            >
              <X className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        )}
      </div>
      
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <p className="text-xs text-gray-500 mt-1">Upload: {uploadProgress}%</p>
        </div>
      )}
      
      <div className="flex justify-end space-x-2 pt-4">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading || localLoading}
          >
            Annuler
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={isLoading || localLoading}
        >
          {isLoading || localLoading ? 'Chargement...' : (video ? 'Mettre à jour' : 'Ajouter la vidéo')}
        </Button>
      </div>
    </form>
  );
};

export default VideoForm;
