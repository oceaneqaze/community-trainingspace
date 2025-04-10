
import React from 'react';
import { Button } from "@/components/ui/button";

interface FormButtonsProps {
  isLoading: boolean;
  uploadLoading: boolean;
  onCancel?: () => void;
  isEdit: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({ 
  isLoading, 
  uploadLoading, 
  onCancel, 
  isEdit 
}) => {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      {onCancel && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading || uploadLoading}
        >
          Annuler
        </Button>
      )}
      <Button 
        type="submit" 
        disabled={isLoading || uploadLoading}
      >
        {isLoading || uploadLoading ? 'Chargement...' : (isEdit ? 'Mettre à jour' : 'Ajouter la vidéo')}
      </Button>
    </div>
  );
};

export default FormButtons;
