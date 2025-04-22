
import React from 'react';
import { BookmarkCheck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoProgressBar } from '@/components/video';

interface VideoProgressSectionProps {
  progress: number;
  completed: boolean;
  onMarkCompleted: () => void;
  onResetProgress: () => void;
}

const VideoProgressSection: React.FC<VideoProgressSectionProps> = ({
  progress,
  completed,
  onMarkCompleted,
  onResetProgress,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Progression</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={completed}
            onClick={onMarkCompleted}
            className="text-xs"
          >
            <BookmarkCheck className="h-4 w-4 mr-1" />
            Marquer comme terminé
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetProgress}
            className="text-xs"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Réinitialiser
          </Button>
        </div>
      </div>
      <VideoProgressBar 
        progress={progress} 
        completed={completed} 
        className="h-2"
        showTooltip={false}
      />
    </div>
  );
};

export default VideoProgressSection;
