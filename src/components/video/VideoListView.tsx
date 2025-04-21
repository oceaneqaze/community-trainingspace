
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
import VideoProgressBar from './VideoProgressBar';

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

  const renderMobileVideoList = (videos: VideoProps[]) => (
    <div className="space-y-3 sm:hidden">
      {videos.map((video) => (
        <div 
          key={video.id}
          className="border rounded-md p-3 cursor-pointer hover:bg-muted/40 transition-colors"
          onClick={() => onVideoClick(video.id)}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="h-12 w-20 rounded overflow-hidden flex-shrink-0">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium line-clamp-2 text-sm">{video.title}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">{video.duration}</span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {video.category}
                </span>
              </div>
            </div>
          </div>
          {typeof video.progress === 'number' && (
            <VideoProgressBar 
              progress={video.progress}
              completed={video.completed}
              className="mt-2 mb-2"
            />
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{video.date}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onVideoClick(video.id);
              }}
            >
              Voir
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  if (!selectedCategory) {
    return (
      <div className="space-y-6 md:space-y-8">
        {sortedCategories.map(category => (
          <div key={category} className="space-y-3 md:space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-foreground border-b pb-2">
              {category}
            </h2>
            
            {/* Mobile list view */}
            {renderMobileVideoList(videosByCategory[category])}
            
            {/* Desktop list view */}
            <div className="hidden sm:block overflow-hidden rounded-lg border bg-card">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Titre</TableHead>
                      <TableHead>Durée</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Progression</TableHead>
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
                        <TableCell>
                          {typeof video.progress === 'number' ? (
                            <VideoProgressBar 
                              progress={video.progress} 
                              completed={video.completed}
                              className="w-32"
                            />
                          ) : (
                            <span className="text-muted-foreground text-sm">Non commencée</span>
                          )}
                        </TableCell>
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
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Mobile list view */}
      {renderMobileVideoList(filteredVideos)}
      
      {/* Desktop list view */}
      <div className="hidden sm:block overflow-hidden rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Titre</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Progression</TableHead>
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
                  <TableCell>
                    {typeof video.progress === 'number' ? (
                      <VideoProgressBar 
                        progress={video.progress} 
                        completed={video.completed}
                        className="w-32"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm">Non commencée</span>
                    )}
                  </TableCell>
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
    </>
  );
};

export default VideoListView;
