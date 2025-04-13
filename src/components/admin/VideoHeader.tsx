
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Film, Search } from 'lucide-react';

interface VideoHeaderProps {
  videoCount: number;
  onAddClick: () => void;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({ 
  videoCount, 
  onAddClick 
}) => {
  return (
    <div className="flex justify-between items-center mb-6 animate-fade-in">
      <div className="flex items-center space-x-2">
        <Film className="h-6 w-6 text-primary animate-scale-in" />
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Vidéos ({videoCount})
        </h2>
      </div>
      <Button 
        onClick={onAddClick}
        className="tech-button group transition-all duration-300 hover:scale-105"
      >
        <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
        Ajouter une vidéo
      </Button>
    </div>
  );
};

export default VideoHeader;
