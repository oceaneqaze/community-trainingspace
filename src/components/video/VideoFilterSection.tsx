
import React from 'react';
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
  activeView: 'grid' | 'list';
  setActiveView: (view: 'grid' | 'list') => void;
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
    <div className="mb-6 sm:mb-8 grid grid-cols-1 gap-3 sm:gap-4">
      <VideoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <VideoFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          
          <div className="relative">
            <select
              className="h-full px-2.5 sm:px-3 pr-8 py-2 sm:py-2 text-sm border border-input rounded-md shadow-sm focus:ring-primary focus:border-primary appearance-none bg-background"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'in-progress' | 'completed')}
            >
              <option value="all">Tous les statuts</option>
              <option value="in-progress">En cours</option>
              <option value="completed">Terminés</option>
            </select>
          </div>
        </div>
        
        <VideoViewToggle activeView={activeView} setActiveView={setActiveView} />
      </div>
    </div>
  );
};

export default VideoFilterSection;
