
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
        size="sm"
        onClick={() => setActiveView('grid')}
        className="rounded-r-none h-9 px-2.5"
      >
        <div className="grid grid-cols-2 gap-0.5">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-sm"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-sm"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-sm"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-sm"></div>
        </div>
      </Button>
      <Button 
        variant={activeView === 'list' ? "default" : "ghost"}
        size="sm"
        onClick={() => setActiveView('list')}
        className="rounded-l-none h-9 px-2.5"
      >
        <div className="flex flex-col gap-0.5 items-center justify-center">
          <div className="w-3.5 h-0.5 sm:w-4 sm:h-0.5 bg-current rounded-sm"></div>
          <div className="w-3.5 h-0.5 sm:w-4 sm:h-0.5 bg-current rounded-sm"></div>
          <div className="w-3.5 h-0.5 sm:w-4 sm:h-0.5 bg-current rounded-sm"></div>
        </div>
      </Button>
    </div>
  );
};

export default VideoViewToggle;
