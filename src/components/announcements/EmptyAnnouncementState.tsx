
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const EmptyAnnouncementState = () => {
  return (
    <Card className="text-center p-12">
      <div className="flex flex-col items-center gap-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Aucune annonce</h3>
        <p className="text-muted-foreground">
          Créez votre première annonce en cliquant sur le bouton "Nouvelle annonce"
        </p>
      </div>
    </Card>
  );
};

export default EmptyAnnouncementState;
