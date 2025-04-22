
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface VideoFiltersDisplayProps {
  statusFilter: 'all' | 'in-progress' | 'completed';
  selectedCategory: string | null;
  onClearFilters: () => void;
}

const VideoFiltersDisplay: React.FC<VideoFiltersDisplayProps> = ({
  statusFilter,
  selectedCategory,
  onClearFilters
}) => {
  if (statusFilter === 'all' && !selectedCategory) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {statusFilter !== 'all' && (
        <Badge variant="outline" className="bg-primary/10">
          {statusFilter === 'completed' ? 'Vidéos terminées' : 'Vidéos en cours'}
        </Badge>
      )}
      {selectedCategory && (
        <Badge variant="outline" className="bg-secondary/10">
          {selectedCategory}
        </Badge>
      )}
      <Badge 
        variant="outline" 
        className="bg-destructive/10 cursor-pointer"
        onClick={onClearFilters}
      >
        Effacer les filtres
      </Badge>
    </div>
  );
};

export default VideoFiltersDisplay;
