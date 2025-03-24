
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, X } from 'lucide-react';
import { VideoProps } from './VideoCard';
import { toast } from '@/components/ui/use-toast';

interface VideoFormProps {
  onSubmit: (video: Partial<VideoProps>) => void;
  video?: VideoProps;
  onCancel?: () => void;
}

const VideoForm: React.FC<VideoFormProps> = ({ onSubmit, video, onCancel }) => {
  const [title, setTitle] = useState(video?.title || '');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(video?.category || '');
  const [duration, setDuration] = useState(video?.duration || '');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(video?.thumbnail || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setThumbnailPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app with Supabase, you would upload the file and get the URL
      // For now, we'll just use the preview or existing thumbnail
      const thumbnail = thumbnailPreview || 'https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80';
      
      // Generate a unique ID for new videos
      const id = video?.id || Math.random().toString(36).substring(2, 15);
      const date = new Date().toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
      
      onSubmit({
        id,
        title,
        thumbnail,
        duration,
        category,
        date,
        likes: video?.likes || 0,
        comments: video?.comments || 0,
      });
      
      toast({
        title: video ? "Vidéo mise à jour" : "Vidéo ajoutée",
        description: video 
          ? "La vidéo a été mise à jour avec succès." 
          : "La vidéo a été ajoutée avec succès.",
      });
    } catch (error) {
      console.error('Error submitting video:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Chargement...' : (video ? 'Mettre à jour' : 'Ajouter la vidéo')}
        </Button>
      </div>
    </form>
  );
};

export default VideoForm;
