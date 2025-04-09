
import React from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import VideoSortTable from './VideoSortTable';
import LoadingSpinner from './LoadingSpinner';
import { useVideoSorter } from '@/hooks/useVideoSorter';
import { Badge } from "@/components/ui/badge";

interface VideosTabContentProps {
  videos: VideoProps[];
  isLoading: boolean;
  categories: string[];
  onCategoryChange: (videoId: string, newCategory: string) => void;
}

const VideosTabContent: React.FC<VideosTabContentProps> = ({
  videos,
  isLoading,
  categories,
  onCategoryChange
}) => {
  const { sortConfig, requestSort, sortedVideos } = useVideoSorter(videos);

  // Add a property to identify external videos
  const processedVideos = sortedVideos.map(video => {
    const isExternal = video.videoUrl?.includes('screenrec.com') || 
                      (video.videoUrl?.startsWith('http') && 
                       !video.videoUrl?.includes('storage.googleapis.com'));
    
    return {
      ...video,
      isExternal
    };
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-4">
        <div className="text-sm text-muted-foreground">
          Types de vidéos:
          <span className="inline-flex gap-2 ml-2">
            <Badge variant="outline" className="bg-primary/10">Vidéo téléchargée</Badge>
            <Badge variant="outline" className="bg-accent/10">Vidéo externe</Badge>
          </span>
        </div>
      </div>
      
      <VideoSortTable
        videos={processedVideos}
        sortConfig={sortConfig}
        requestSort={requestSort}
        categories={categories}
        onCategoryChange={onCategoryChange}
      />
    </div>
  );
};

export default VideosTabContent;
