
import React from 'react';

interface VideoProgressProps {
  progress?: number;
}

const VideoProgress: React.FC<VideoProgressProps> = ({ progress }) => {
  if (progress === undefined || progress <= 0) return null;
  
  return (
    <div className="mt-2">
      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
        <div 
          className="h-full rounded-full bg-blue-600" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default VideoProgress;
