
import React from 'react';
import { Card } from '@/components/ui/card';
import { FilePdf } from 'lucide-react';

export const EmptyResourceState: React.FC = () => {
  return (
    <Card className="text-center p-12">
      <div className="flex flex-col items-center gap-4">
        <FilePdf className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Aucune ressource</h3>
        <p className="text-muted-foreground">
          Aucun document PDF n'est disponible pour cette vidéo.
        </p>
      </div>
    </Card>
  );
};
