
import React from 'react';
import { Search } from 'lucide-react';

type MemberSearchProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const MemberSearch: React.FC<MemberSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6">
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-input bg-background rounded-md shadow-sm focus:ring-primary focus:border-primary"
          placeholder="Rechercher un membre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MemberSearch;
