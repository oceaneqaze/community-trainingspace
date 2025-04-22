
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface VideoHeaderProps {
  onBack: () => void;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({ onBack }) => {
  return (
    <button
      onClick={onBack}
      className="flex items-center text-blue-600 mb-4 hover:underline"
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Retour aux vidéos
    </button>
  );
};

export default VideoHeader;
