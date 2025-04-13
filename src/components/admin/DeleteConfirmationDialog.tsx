
import React from 'react';
import { Button } from '@/components/ui/button';

interface DeleteConfirmationDialogProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ 
  onConfirm, 
  onCancel, 
  isLoading 
}) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Êtes-vous sûr de vouloir supprimer cette vidéo? Cette action est irréversible.
      </p>
      <div className="flex justify-end space-x-2 pt-4">
        <Button 
          variant="outline" 
          onClick={onCancel}
        >
          Annuler
        </Button>
        <Button 
          variant="destructive" 
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Suppression en cours..." : "Supprimer définitivement"}
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
