
import React from 'react';
import { FileQuestion } from 'lucide-react';

export const EmptyResourceState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <FileQuestion className="h-12 w-12 text-muted-foreground mb-2" />
      <h3 className="text-lg font-medium text-center">Aucun document</h3>
      <p className="text-sm text-muted-foreground text-center mt-1">
        Aucun document n'est associé à cette vidéo
      </p>
    </div>
  );
};
