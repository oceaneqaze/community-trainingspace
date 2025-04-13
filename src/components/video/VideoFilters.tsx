
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
    <div className="relative">
      <select
        className="h-full px-3 pr-10 py-2 border border-input rounded-md shadow-sm focus:ring-primary focus:border-primary appearance-none bg-background"
        value={selectedCategory || ''}
        onChange={(e) => setSelectedCategory(e.target.value || null)}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <Filter className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
};

export default VideoFilters;
