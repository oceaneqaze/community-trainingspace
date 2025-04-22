
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRelatedVideos } from '@/hooks/useRelatedVideos';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RelatedVideosProps {
  videoId?: string;
  category?: string;
}

const RelatedVideos: React.FC<RelatedVideosProps> = ({ videoId, category }) => {
  const { relatedVideos, isLoading } = useRelatedVideos(videoId, category);
  const navigate = useNavigate();

  const handleVideoClick = (id: string) => {
    navigate(`/videos/${id}`);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Vidéos similaires</h3>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-2">
              <Skeleton className="h-20 w-32 rounded-md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : relatedVideos.length > 0 ? (
        <div className="space-y-4">
          {relatedVideos.map((video) => (
            <Card 
              key={video.id} 
              className="overflow-hidden cursor-pointer hover:bg-accent/5 transition-colors"
              onClick={() => handleVideoClick(video.id)}
            >
              <CardContent className="p-2 flex gap-3">
                <div className="relative w-32 h-20">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover rounded-sm"
                  />
                  <div className="absolute bottom-1 right-1 px-1 py-0.5 text-xs bg-black/70 text-white rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                  <div className="mt-1 flex items-center">
                    <Badge variant="outline" className="text-xs">
                      {video.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">Aucune vidéo similaire trouvée.</p>
      )}
    </div>
  );
};

export default RelatedVideos;
