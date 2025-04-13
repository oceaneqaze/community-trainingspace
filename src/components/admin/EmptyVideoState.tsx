
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const EmptyVideoState: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6 text-center text-muted-foreground">
        Aucune vidéo n'a été ajoutée.
      </CardContent>
    </Card>
  );
};

export default EmptyVideoState;
