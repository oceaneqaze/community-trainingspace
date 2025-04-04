
import React from 'react';
import { Member } from '@/types/member.types';
import { 
  MoreHorizontal, 
  Ban, 
  CheckCircle, 
  AlertTriangle, 
  Trash2 
} from 'lucide-react';
import { TableRow, TableCell } from '@/components/ui/table';
import InvitationSystem from '@/components/InvitationSystem';

type MemberTableRowProps = {
  member: Member;
  showDropdown: boolean;
  toggleDropdown: (id: string) => void;
  onStatusChange: (member: Member) => void;
  onLimitToggle: (member: Member) => void;
  onDelete: (member: Member) => void;
  onInvitationSent: () => void;
};

const MemberTableRow: React.FC<MemberTableRowProps> = ({
  member,
  showDropdown,
  toggleDropdown,
  onStatusChange,
  onLimitToggle,
  onDelete,
  onInvitationSent
}) => {
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {member.avatar ? (
              <img 
                className="h-10 w-10 rounded-full object-cover border border-border" 
                src={member.avatar} 
                alt="" 
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="text-primary font-medium">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium">
              {member.name}
              {member.limited && (
                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-800 text-yellow-100">
                  Limité
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {member.email}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          member.role === 'admin' 
            ? 'bg-primary/20 text-primary' 
            : 'bg-secondary text-secondary-foreground'
        }`}>
          {member.role === 'admin' ? 'Administrateur' : 'Membre'}
        </span>
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          member.banned 
            ? 'bg-destructive/20 text-destructive' 
            : 'bg-green-800/30 text-green-500'
        }`}>
          {member.banned ? 'Banni' : 'Actif'}
        </span>
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
        {member.joinDate}
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
        {member.invitation_used ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-800/30 text-green-500">
            Utilisée
          </span>
        ) : member.invitation_code ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-800/30 text-blue-500">
            En attente
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            Non envoyée
          </span>
        )}
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <InvitationSystem 
            member={{
              id: member.id,
              name: member.name,
              email: member.email
            }}
            onInvitationSent={onInvitationSent}
          />
          
          <div className="relative">
            <button
              onClick={() => toggleDropdown(member.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-popover ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                    onClick={() => onStatusChange(member)}
                  >
                    {member.banned ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span>Réactiver</span>
                      </>
                    ) : (
                      <>
                        <Ban className="mr-2 h-4 w-4 text-destructive" />
                        <span>Bannir</span>
                      </>
                    )}
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                    onClick={() => onLimitToggle(member)}
                  >
                    {member.limited ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span>Enlever les limitations</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                        <span>Limiter</span>
                      </>
                    )}
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted"
                    onClick={() => onDelete(member)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Supprimer</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default MemberTableRow;
