
import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface VideoInfoProps {
  title: string;
  description: string;
  category: string;
  date: string;
  initialLikes: number;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ 
  title, 
  description, 
  category, 
  date, 
  initialLikes 
}) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-gray-500">{category} • {date}</span>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleLike}
            className="flex items-center space-x-1 px-3 py-1 rounded-full border hover:bg-gray-50"
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}`} />
            <span>{likesCount}</span>
          </button>
        </div>
      </div>

      <p className="mt-4 text-gray-700">{description}</p>
    </div>
  );
};

export default VideoInfo;
