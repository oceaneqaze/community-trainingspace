
import React from 'react';
import { VideoViewType } from '@/hooks/useVideos';
import VideoSearch from './VideoSearch';
import VideoFilters from './VideoFilters';
import VideoViewToggle from './VideoViewToggle';

interface VideoFilterSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  statusFilter: 'all' | 'in-progress' | 'completed';
  setStatusFilter: (status: 'all' | 'in-progress' | 'completed') => void;
  activeView: VideoViewType;
  setActiveView: (view: VideoViewType) => void;
}

const VideoFilterSection: React.FC<VideoFilterSectionProps> = ({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  statusFilter,
  setStatusFilter,
  activeView,
  setActiveView
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="flex-1">
        <VideoSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className="flex items-center gap-2">
        <VideoFilters 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <VideoViewToggle 
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </div>
    </div>
  );
};

export default VideoFilterSection;
