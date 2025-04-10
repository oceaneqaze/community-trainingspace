import React, { useState } from 'react';
import { VideoProps } from './VideoCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  {
  activeTab === 'screenrec' && screenRecVideoId && screenRecPosterUrl && (
    <ScreenRecPlayer 
      videoUrl={`https://upww.screenrec.com/videos/f_${screenRecVideoId}.mp4/index.m3u8`}
      posterUrl={screenRecPosterUrl}
    />
  )
}

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

export default VideoForm;
