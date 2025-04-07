
import React, { useState } from 'react';
import { Member } from '@/types/member.types';
import MemberTableRow from './MemberTableRow';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Filter } from 'lucide-react';

type MemberTableProps = {
  members: Member[];
  isLoading: boolean;
  onStatusChange: (member: Member) => void;
  onLimitToggle: (member: Member) => void;
  onAdminToggle: (member: Member) => void;
  onDelete: (member: Member) => void;
  onInvitationSent: () => void;
  filteredMembers: Member[];
  onFilterChange: (filters: any) => void;
};

const MemberTable: React.FC<MemberTableProps> = ({
  isLoading,
  onStatusChange,
  onLimitToggle,
  onAdminToggle,
  onDelete,
  onInvitationSent,
  filteredMembers,
  onFilterChange
}) => {
  const [showDropdownId, setShowDropdownId] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['admin', 'member']);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(['active', 'inactive']);

  // Toggle dropdown
  const toggleDropdown = (id: string) => {
    setShowDropdownId(prevId => prevId === id ? null : id);
  };

  // Handle role filter change
  const handleRoleFilterChange = (role: string) => {
    setSelectedRoles(prev => {
      const newRoles = prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role];
      
      onFilterChange({ roles: newRoles, status: selectedStatus });
      return newRoles;
    });
  };

  // Handle status filter change
  const handleStatusFilterChange = (status: string) => {
    setSelectedStatus(prev => {
      const newStatus = prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status];
      
      onFilterChange({ roles: selectedRoles, status: newStatus });
      return newStatus;
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
      <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
        <h3 className="text-lg font-medium">Liste des membres</h3>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-4 w-4" />
                <span>Filtres</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5 text-sm font-semibold">Rôle</div>
              <DropdownMenuCheckboxItem
                checked={selectedRoles.includes('admin')}
                onCheckedChange={() => handleRoleFilterChange('admin')}
              >
                Administrateur
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedRoles.includes('member')}
                onCheckedChange={() => handleRoleFilterChange('member')}
              >
                Membre
              </DropdownMenuCheckboxItem>
              
              <div className="px-2 py-1.5 text-sm font-semibold border-t border-border mt-1 pt-2">Statut</div>
              <DropdownMenuCheckboxItem
                checked={selectedStatus.includes('active')}
                onCheckedChange={() => handleStatusFilterChange('active')}
              >
                Actif
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedStatus.includes('inactive')}
                onCheckedChange={() => handleStatusFilterChange('inactive')}
              >
                Inactif
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[300px]">Membre</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date d'inscription</TableHead>
            <TableHead>Invitation</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-3"></div>
                  <span>Chargement des membres...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <MemberTableRow 
                key={member.id}
                member={member}
                showDropdown={showDropdownId === member.id}
                toggleDropdown={toggleDropdown}
                onStatusChange={onStatusChange}
                onLimitToggle={onLimitToggle}
                onAdminToggle={onAdminToggle}
                onDelete={onDelete}
                onInvitationSent={onInvitationSent}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                <div className="flex flex-col items-center justify-center">
                  <div className="rounded-full bg-muted p-4 mb-3">
                    <Filter className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="font-medium mb-1">Aucun membre trouvé</p>
                  <p className="text-sm">Essayez de modifier vos filtres ou votre recherche.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberTable;
