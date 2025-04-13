
import React from 'react';
import VideoCard from '@/components/VideoCard';
import { VideoProps } from '@/components/video/VideoCard';
import NoVideosFound from './NoVideosFound';
import LoadingState from './LoadingState';

interface VideoGridViewProps {
  isLoading: boolean;
  videosByCategory: Record<string, VideoProps[]>;
  filteredVideos: VideoProps[];
  selectedCategory: string | null;
  sortedCategories: string[];
  onVideoClick: (videoId: string) => void;
}

const VideoGridView: React.FC<VideoGridViewProps> = ({
  isLoading,
  videosByCategory,
  filteredVideos,
  selectedCategory,
  sortedCategories,
  onVideoClick,
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (filteredVideos.length === 0) {
    return <NoVideosFound />;
  }

  if (!selectedCategory) {
    return (
      <div className="space-y-8">
        {sortedCategories.map(category => (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground border-b pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videosByCategory[category].map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => onVideoClick(video.id)}
                  className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVideos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onClick={() => onVideoClick(video.id)}
          className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
        />
      ))}
    </div>
  );
};

export default VideoGridView;
