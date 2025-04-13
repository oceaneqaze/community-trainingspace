
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface VideoHeaderProps {
  videoCount: number;
  onAddClick: () => void;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({ 
  videoCount, 
  onAddClick 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold tracking-tight">Vidéos ({videoCount})</h2>
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-2" />
        Ajouter une vidéo
      </Button>
    </div>
  );
};

export default VideoHeader;
