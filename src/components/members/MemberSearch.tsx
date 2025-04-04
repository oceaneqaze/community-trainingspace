
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type MemberSearchProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const MemberSearch: React.FC<MemberSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        type="text"
        className="pl-10 pr-3 py-2 w-full"
        placeholder="Rechercher par nom, email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default MemberSearch;
