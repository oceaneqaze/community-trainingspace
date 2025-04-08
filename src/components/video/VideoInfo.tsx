
import React, { useState } from 'react';
import { Download, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ResourcesDialog from '@/components/resources/ResourcesDialog';

interface VideoInfoProps {
  title: string;
  description: string;
  category: string;
  date: string;
  initialLikes: number;
  videoId?: string;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ 
  title, 
  description, 
  category, 
  date, 
  initialLikes,
  videoId = '' 
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [showResources, setShowResources] = useState(false);
  
  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
      // Ici, on pourrait appeler une API pour enregistrer le like
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <Badge variant="secondary">{category}</Badge>
        <span>Ajoutée le {date}</span>
        <div className="flex items-center gap-1">
          <ThumbsUp className="h-4 w-4" />
          <span>{likes}</span>
        </div>
      </div>
      
      <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={hasLiked ? "secondary" : "outline"} 
          size="sm"
          onClick={handleLike}
          disabled={hasLiked}
        >
          <ThumbsUp className="mr-2 h-4 w-4" />
          {hasLiked ? 'Aimé' : 'J\'aime'}
        </Button>
        
        {videoId && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowResources(true)}
          >
            <Download className="mr-2 h-4 w-4" />
            Documents PDF
          </Button>
        )}
      </div>
      
      {videoId && showResources && (
        <ResourcesDialog 
          isOpen={showResources}
          videoId={videoId}
          videoTitle={title}
          onClose={() => setShowResources(false)}
        />
      )}
    </div>
  );
};

export default VideoInfo;
