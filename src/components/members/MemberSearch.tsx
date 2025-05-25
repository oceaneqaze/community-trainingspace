
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type MemberSearchProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: { roles: string[]; status: string[]; }) => void;
};

const MemberSearch: React.FC<MemberSearchProps> = ({ 
  searchTerm, 
  onSearchChange, 
  onFilterChange 
}) => {
  const [filters, setFilters] = React.useState({
    roles: ['admin', 'member'],
    status: ['active', 'inactive']
  });

  const handleRoleChange = (role: string, checked: boolean) => {
    const newRoles = checked 
      ? [...filters.roles, role]
      : filters.roles.filter(r => r !== role);
    
    const newFilters = { ...filters, roles: newRoles };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked 
      ? [...filters.status, status]
      : filters.status.filter(s => s !== status);
    
    const newFilters = { ...filters, status: newStatus };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="text"
          className="pl-10 pr-3 py-2 w-full"
          placeholder="Rechercher par nom, email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Rôles</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="admin"
                checked={filters.roles.includes('admin')}
                onCheckedChange={(checked) => handleRoleChange('admin', checked as boolean)}
              />
              <Label htmlFor="admin" className="text-sm">Administrateur</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="member"
                checked={filters.roles.includes('member')}
                onCheckedChange={(checked) => handleRoleChange('member', checked as boolean)}
              />
              <Label htmlFor="member" className="text-sm">Membre</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Statut</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={filters.status.includes('active')}
                onCheckedChange={(checked) => handleStatusChange('active', checked as boolean)}
              />
              <Label htmlFor="active" className="text-sm">Actif</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inactive"
                checked={filters.status.includes('inactive')}
                onCheckedChange={(checked) => handleStatusChange('inactive', checked as boolean)}
              />
              <Label htmlFor="inactive" className="text-sm">Inactif</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberSearch;
