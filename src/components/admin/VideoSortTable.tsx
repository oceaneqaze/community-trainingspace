
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp } from 'lucide-react';
import VideoCategorizer from './VideoCategorizer';
import { VideoProps } from '@/components/video/VideoCard';

interface VideoSortTableProps {
  videos: VideoProps[];
  sortConfig: {
    key: keyof VideoProps | 'date';
    direction: 'asc' | 'desc';
  };
  requestSort: (key: keyof VideoProps | 'date') => void;
  categories: string[];
  onCategoryChange: (videoId: string, newCategory: string) => void;
}

const VideoSortTable: React.FC<VideoSortTableProps> = ({
  videos,
  sortConfig,
  requestSort,
  categories,
  onCategoryChange
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Miniature</TableHead>
            <TableHead className="cursor-pointer" onClick={() => requestSort('title')}>
              <div className="flex items-center">
                Titre
                {sortConfig.key === 'title' && (
                  sortConfig.direction === 'asc' ? 
                    <ArrowUp className="ml-1 h-4 w-4" /> : 
                    <ArrowDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => requestSort('category')}>
              <div className="flex items-center">
                Catégorie actuelle
                {sortConfig.key === 'category' && (
                  sortConfig.direction === 'asc' ? 
                    <ArrowUp className="ml-1 h-4 w-4" /> : 
                    <ArrowDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead className="w-[200px]">Nouvelle catégorie</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id}>
              <TableCell>
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="h-14 w-20 object-cover rounded"
                />
              </TableCell>
              <TableCell>{video.title}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {video.category}
                </span>
              </TableCell>
              <TableCell>
                <VideoCategorizer 
                  video={video}
                  categories={categories}
                  onCategoryChange={onCategoryChange}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VideoSortTable;
