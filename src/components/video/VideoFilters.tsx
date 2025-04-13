
import React from 'react';
import { Filter } from 'lucide-react';

interface VideoFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const VideoFilters: React.FC<VideoFiltersProps> = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  return (
    <div className="relative w-full sm:w-auto">
      <select
        className="h-full w-full px-2.5 sm:px-3 pr-8 py-2 sm:py-2 text-sm border border-input rounded-md shadow-sm focus:ring-primary focus:border-primary appearance-none bg-background"
        value={selectedCategory || ''}
        onChange={(e) => setSelectedCategory(e.target.value || null)}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center pointer-events-none">
        <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
      </div>
    </div>
  );
};

export default VideoFilters;
