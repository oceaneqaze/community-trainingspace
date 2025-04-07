
import React from 'react';
import { Member } from '@/types/member.types';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type MemberActionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  member: Member | null;
  action: 'ban' | 'limit' | 'admin';
};

const MemberActionDialog: React.FC<MemberActionDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  member,
  action
}) => {
  if (!member) return null;
  
  const isBan = action === 'ban';
  const isLimit = action === 'limit';
  const isAdminAction = action === 'admin';
  
  const getTitle = () => {
    if (isBan) return member.banned ? 'Réactiver le membre' : 'Bannir le membre';
    if (isLimit) return member.limited ? 'Enlever les limitations' : 'Limiter le membre';
    if (isAdminAction) return member.role === 'admin' ? 'Révoquer les droits d\'administrateur' : 'Promouvoir en administrateur';
    return '';
  };
  
  const getDescription = () => {
    if (isBan) {
      return member.banned 
        ? `Voulez-vous vraiment réactiver ${member.name}? Ils pourront à nouveau accéder à la plateforme.` 
        : `Voulez-vous vraiment bannir ${member.name}? Ils ne pourront plus accéder à la plateforme.`;
    }
    
    if (isLimit) {
      return member.limited 
        ? `Voulez-vous vraiment enlever les limitations pour ${member.name}? Ils pourront à nouveau poster librement.` 
        : `Voulez-vous vraiment limiter ${member.name}? Ils ne pourront plus poster de liens ou de certains contenus.`;
    }
    
    if (isAdminAction) {
      return member.role === 'admin' 
        ? `Voulez-vous vraiment révoquer les droits d'administrateur de ${member.name}?` 
        : `Voulez-vous vraiment promouvoir ${member.name} en administrateur? Ils auront accès à toutes les fonctionnalités d'administration.`;
    }
    
    return '';
  };
  
  const getButtonText = () => {
    if (isBan) return member.banned ? 'Réactiver' : 'Bannir';
    if (isLimit) return member.limited ? 'Enlever les limitations' : 'Limiter';
    if (isAdminAction) return member.role === 'admin' ? 'Révoquer' : 'Promouvoir';
    return '';
  };
  
  const getButtonVariant = () => {
    if (isBan) return member.banned ? "default" : "destructive";
    if (isLimit) return member.limited ? "default" : "warning";
    if (isAdminAction) return member.role === 'admin' ? "destructive" : "default";
    return "default";
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            variant={getButtonVariant()}
            onClick={onConfirm}
          >
            {getButtonText()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MemberActionDialog;
