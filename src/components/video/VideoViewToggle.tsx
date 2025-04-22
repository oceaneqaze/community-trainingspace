
import React from 'react';
import { LayoutGrid, List, Folder } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface VideoViewToggleProps {
  activeView: 'grid' | 'list' | 'explorer';
  setActiveView: (view: 'grid' | 'list' | 'explorer') => void;
}

const VideoViewToggle: React.FC<VideoViewToggleProps> = ({ 
  activeView, 
  setActiveView 
}) => {
  return (
    <ToggleGroup type="single" value={activeView} onValueChange={(value: any) => setActiveView(value)}>
      <ToggleGroupItem value="grid" aria-label="Vue grille">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="Vue liste">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="explorer" aria-label="Vue explorateur">
        <Folder className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default VideoViewToggle;
