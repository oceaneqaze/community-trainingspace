
import React, { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';

interface VideoActionsProps {
  initialLikes: number;
  commentsCount: number;
  onLike?: (e: React.MouseEvent) => void;
  onComments?: (e: React.MouseEvent) => void;
}

const VideoActions: React.FC<VideoActionsProps> = ({ 
  initialLikes, 
  commentsCount, 
  onLike, 
  onComments 
}) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
    if (onLike) onLike(e);
  };

  const handleComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onComments) onComments(e);
  };

  return (
    <div className="flex items-center space-x-3">
      <button 
        onClick={handleLike}
        className="flex items-center space-x-1 text-gray-600 hover:text-rose-500 transition-colors"
      >
        <Heart className={`h-4 w-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
        <span className="text-xs">{likesCount}</span>
      </button>
      
      <button 
        onClick={handleComments}
        className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="text-xs">{commentsCount || 0}</span>
      </button>
    </div>
  );
};

export default VideoActions;
