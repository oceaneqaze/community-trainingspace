
import React from 'react';

interface UploadProgressProps {
  progress: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
  if (progress <= 0 || progress >= 100) return null;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
      <p className="text-xs text-gray-500 mt-1">Upload: {progress}%</p>
    </div>
  );
};

export default UploadProgress;
