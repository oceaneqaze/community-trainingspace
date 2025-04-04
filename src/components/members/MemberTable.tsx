
import React, { useState } from 'react';
import { Member } from '@/types/member.types';
import MemberTableRow from './MemberTableRow';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';

type MemberTableProps = {
  members: Member[];
  isLoading: boolean;
  onStatusChange: (member: Member) => void;
  onLimitToggle: (member: Member) => void;
  onDelete: (member: Member) => void;
  onInvitationSent: () => void;
};

const MemberTable: React.FC<MemberTableProps> = ({
  members,
  isLoading,
  onStatusChange,
  onLimitToggle,
  onDelete,
  onInvitationSent
}) => {
  const [showDropdownId, setShowDropdownId] = useState<string | null>(null);

  // Toggle dropdown
  const toggleDropdown = (id: string) => {
    setShowDropdownId(prevId => prevId === id ? null : id);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
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
              <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                Chargement des membres...
              </td>
            </TableRow>
          ) : members.length > 0 ? (
            members.map((member) => (
              <MemberTableRow 
                key={member.id}
                member={member}
                showDropdown={showDropdownId === member.id}
                toggleDropdown={toggleDropdown}
                onStatusChange={onStatusChange}
                onLimitToggle={onLimitToggle}
                onDelete={onDelete}
                onInvitationSent={onInvitationSent}
              />
            ))
          ) : (
            <TableRow>
              <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                Aucun membre trouvé
              </td>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberTable;
