
import { useState, useMemo } from 'react';
import { VideoProps } from '@/components/video/VideoCard';

export const useVideoSorter = (videos: VideoProps[]) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof VideoProps | 'date',
    direction: 'asc' | 'desc'
  }>({ key: 'title', direction: 'asc' });
  
  // Handle sorting videos
  const requestSort = (key: keyof VideoProps | 'date') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Create sorted videos based on the current sort config
  const sortedVideos = useMemo(() => {
    const sortableVideos = [...videos];
    sortableVideos.sort((a, b) => {
      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date.split(' ').reverse().join(' '));
        const dateB = new Date(b.date.split(' ').reverse().join(' '));
        return sortConfig.direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }
      
      if (a[sortConfig.key as keyof VideoProps] < b[sortConfig.key as keyof VideoProps]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof VideoProps] > b[sortConfig.key as keyof VideoProps]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableVideos;
  }, [videos, sortConfig]);

  return {
    sortConfig,
    requestSort,
    sortedVideos
  };
};
