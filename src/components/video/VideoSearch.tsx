
import React from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

const VideoSearch: React.FC<VideoSearchProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  placeholder = "Rechercher une vidéo..."
}) => {
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-3 border border-input rounded-md shadow-sm focus:ring-primary focus:border-primary bg-background"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Rechercher des vidéos"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute inset-y-0 right-0 pr-3 flex items-center h-full"
          onClick={handleClearSearch}
          aria-label="Effacer la recherche"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
        </Button>
      )}
    </div>
  );
};

export default VideoSearch;
