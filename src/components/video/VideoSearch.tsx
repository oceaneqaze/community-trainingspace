
import React from 'react';
import { Search } from 'lucide-react';

interface VideoSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const VideoSearch: React.FC<VideoSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 border border-input rounded-md shadow-sm focus:ring-primary focus:border-primary bg-background"
        placeholder="Rechercher une vidéo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default VideoSearch;
