
import React from 'react';
import { Button } from '@/components/ui/button';

interface VideoViewToggleProps {
  activeView: 'grid' | 'list';
  setActiveView: (view: 'grid' | 'list') => void;
}

const VideoViewToggle: React.FC<VideoViewToggleProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="flex items-center bg-secondary rounded-md">
      <Button 
        variant={activeView === 'grid' ? "default" : "ghost"}
        size="icon"
        onClick={() => setActiveView('grid')}
        className="rounded-r-none"
      >
        <div className="grid grid-cols-2 gap-0.5">
          <div className="w-2 h-2 bg-current rounded-sm"></div>
          <div className="w-2 h-2 bg-current rounded-sm"></div>
          <div className="w-2 h-2 bg-current rounded-sm"></div>
          <div className="w-2 h-2 bg-current rounded-sm"></div>
        </div>
      </Button>
      <Button 
        variant={activeView === 'list' ? "default" : "ghost"}
        size="icon"
        onClick={() => setActiveView('list')}
        className="rounded-l-none"
      >
        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="w-4 h-0.5 bg-current rounded-sm"></div>
          <div className="w-4 h-0.5 bg-current rounded-sm"></div>
          <div className="w-4 h-0.5 bg-current rounded-sm"></div>
        </div>
      </Button>
    </div>
  );
};

export default VideoViewToggle;
