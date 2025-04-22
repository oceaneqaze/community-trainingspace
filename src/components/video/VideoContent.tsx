
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoGridView from './VideoGridView';
import VideoListView from './VideoListView';
import { VideoProps } from '@/components/VideoCard';

interface VideoContentProps {
  activeView: 'grid' | 'list';
  setActiveView: (view: 'grid' | 'list') => void;
  isLoading: boolean;
  videosByCategory: Record<string, VideoProps[]>;
  filteredVideos: VideoProps[];
  selectedCategory: string | null;
  sortedCategories: string[];
  onVideoClick: (videoId: string) => void;
}

const VideoContent: React.FC<VideoContentProps> = ({
  activeView,
  setActiveView,
  isLoading,
  videosByCategory,
  filteredVideos,
  selectedCategory,
  sortedCategories,
  onVideoClick
}) => {
  return (
    <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'grid' | 'list')}>
      <TabsList className="hidden">
        <TabsTrigger value="grid">Grille</TabsTrigger>
        <TabsTrigger value="list">Liste</TabsTrigger>
      </TabsList>
      
      <TabsContent value="grid" className="mt-0">
        <VideoGridView
          isLoading={isLoading}
          videosByCategory={videosByCategory}
          filteredVideos={filteredVideos}
          selectedCategory={selectedCategory}
          sortedCategories={sortedCategories}
          onVideoClick={onVideoClick}
        />
      </TabsContent>
      
      <TabsContent value="list" className="mt-0">
        <VideoListView
          isLoading={isLoading}
          videosByCategory={videosByCategory}
          filteredVideos={filteredVideos}
          selectedCategory={selectedCategory}
          sortedCategories={sortedCategories}
          onVideoClick={onVideoClick}
        />
      </TabsContent>
    </Tabs>
  );
};

export default VideoContent;
