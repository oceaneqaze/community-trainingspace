
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { VideoProps } from '@/components/video/VideoCard';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export interface VideoFormProps {
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
  
  // État pour stocker la date de publication
  const [publishDate, setPublishDate] = useState<Date | undefined>(
    video?.date ? new Date(video.date) : new Date()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Formater la date au format français pour affichage
    const formattedDate = publishDate 
      ? format(publishDate, 'dd MMMM yyyy', { locale: require('date-fns/locale/fr') })
      : '';
      
    await onSubmit({ 
      title, 
      thumbnail, 
      duration, 
      category, 
      videoUrl,
      date: formattedDate
    });
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

      <div>
        <Label htmlFor="publishDate">Date de publication</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !publishDate && "text-muted-foreground"
              )}
              id="publishDate"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {publishDate ? format(publishDate, 'dd MMMM yyyy', { locale: require('date-fns/locale/fr') }) : <span>Choisir une date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={publishDate}
              onSelect={setPublishDate}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
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

export default VideoForm;
