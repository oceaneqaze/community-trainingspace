
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import { VideoProps } from '@/components/video/VideoCard';

interface VideoCardProps {
  video: VideoProps;
  onEdit: (video: VideoProps) => void;
  onDelete: (video: VideoProps) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onEdit, onDelete }) => {
  return (
    <Card key={video.id} className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-48 h-32 bg-muted relative">
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        <div className="flex-grow p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold">{video.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Catégorie: {video.category}
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(video)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Éditer
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete(video)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;
