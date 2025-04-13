
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h3 className="text-lg font-medium text-foreground">Chargement des vidéos...</h3>
      <p className="text-sm text-muted-foreground mt-2">Veuillez patienter pendant que nous récupérons vos vidéos</p>
    </div>
  );
};

export default LoadingState;
