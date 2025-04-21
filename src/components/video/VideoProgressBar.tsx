
import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VideoProgressBarProps {
  progress: number;
  className?: string;
  showTooltip?: boolean;
  completed?: boolean;
}

const VideoProgressBar: React.FC<VideoProgressBarProps> = ({ 
  progress, 
  className, 
  showTooltip = true,
  completed = false
}) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Format progress for display
  const progressText = `${Math.round(normalizedProgress)}%${completed ? ' (Terminé)' : ''}`;
  
  const progressBar = (
    <div className={cn("mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden", className)}>
      <div 
        className={cn(
          "h-full rounded-full transition-all duration-300", 
          completed ? "bg-green-500" : "bg-primary"
        )}
        style={{ width: `${normalizedProgress}%` }}
      />
    </div>
  );

  if (!showTooltip) return progressBar;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {progressBar}
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {progressText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VideoProgressBar;
