
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 md:py-16 text-center px-4">
      <Loader2 className="h-10 w-10 md:h-12 md:w-12 animate-spin text-primary mb-3 md:mb-4" />
      <h3 className="text-base md:text-lg font-medium text-foreground">Chargement des vidéos...</h3>
      <p className="text-xs md:text-sm text-muted-foreground mt-2">Veuillez patienter pendant que nous récupérons vos vidéos</p>
    </div>
  );
};

export default LoadingState;
