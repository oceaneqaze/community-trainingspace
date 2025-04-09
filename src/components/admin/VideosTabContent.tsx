
import React from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import VideoSortTable from './VideoSortTable';
import LoadingSpinner from './LoadingSpinner';
import { useVideoSorter } from '@/hooks/useVideoSorter';

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <VideoSortTable
      videos={sortedVideos}
      sortConfig={sortConfig}
      requestSort={requestSort}
      categories={categories}
      onCategoryChange={onCategoryChange}
    />
  );
};

export default VideosTabContent;
