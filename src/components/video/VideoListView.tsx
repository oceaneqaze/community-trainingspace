
import React from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import NoVideosFound from './NoVideosFound';
import LoadingState from './LoadingState';

interface VideoListViewProps {
  isLoading: boolean;
  videosByCategory: Record<string, VideoProps[]>;
  filteredVideos: VideoProps[];
  selectedCategory: string | null;
  sortedCategories: string[];
  onVideoClick: (videoId: string) => void;
}

const VideoListView: React.FC<VideoListViewProps> = ({
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
            <div className="overflow-hidden rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Titre</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videosByCategory[category].map((video) => (
                    <TableRow key={video.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onVideoClick(video.id)}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-20 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <span className="line-clamp-1">{video.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{video.duration}</TableCell>
                      <TableCell>{video.date}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onVideoClick(video.id);
                          }}
                        >
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Titre</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Durée</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVideos.map((video) => (
            <TableRow key={video.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onVideoClick(video.id)}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-20 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <span className="line-clamp-1">{video.title}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {video.category}
                </span>
              </TableCell>
              <TableCell>{video.duration}</TableCell>
              <TableCell>{video.date}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onVideoClick(video.id);
                  }}
                >
                  Voir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VideoListView;
