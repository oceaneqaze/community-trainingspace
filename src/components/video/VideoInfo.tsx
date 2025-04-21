
import React from 'react';
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
  liked?: boolean;
  onLike?: () => void;
  likeProcessing?: boolean;
}

const VideoInfo: React.FC<VideoInfoProps> = ({
  title,
  description,
  category,
  date,
  initialLikes,
  videoId = '',
  liked = false,
  onLike,
  likeProcessing = false,
}) => {
  const [showResources, setShowResources] = React.useState(false);

  return (
    <div className="mt-4 space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <Badge variant="secondary">{category}</Badge>
        <span>Ajoutée le {date}</span>
        <div className="flex items-center gap-1">
          <ThumbsUp
            className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`}
          />
          <span
            className={`${liked ? "font-semibold text-rose-500" : ""}`}
          >
            {initialLikes}
          </span>
        </div>
      </div>

      <p className="text-gray-700 whitespace-pre-wrap">{description}</p>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={liked ? "secondary" : "outline"}
          size="sm"
          onClick={onLike}
          disabled={likeProcessing}
        >
          <ThumbsUp className="mr-2 h-4 w-4" />
          {liked ? 'Aimé' : 'J\'aime'}
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
