
import React from 'react';
import { Heart } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

export interface CommentProps {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  onLike: (commentId: string) => void;
}

const CommentItem: React.FC<CommentProps> = ({ 
  id, 
  username, 
  avatar, 
  content, 
  timestamp, 
  likes, 
  onLike 
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-start">
        <Avatar className="h-8 w-8 mr-3">
          <img src={avatar} alt={username} />
        </Avatar>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{username}</h4>
            <span className="text-xs text-gray-500">{timestamp}</span>
          </div>
          <p className="mt-1 text-gray-700">{content}</p>
          <div className="mt-2 flex items-center">
            <button 
              onClick={() => onLike(id)}
              className="flex items-center text-gray-500 text-sm hover:text-rose-500"
            >
              <Heart className="h-3 w-3 mr-1" />
              {likes} J'aime
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
