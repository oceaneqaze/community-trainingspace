
import React from 'react';
import { FileVideo, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoVideosFoundProps {
  onRefresh?: () => void;
}

const NoVideosFound: React.FC<NoVideosFoundProps> = ({ onRefresh }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 md:py-16 text-center px-4 bg-secondary/10 rounded-lg border border-dashed border-secondary">
      <FileVideo className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mb-3 md:mb-4" strokeWidth={1.5} />
      <h3 className="text-lg md:text-xl font-medium text-foreground">Aucune vidéo trouvée</h3>
      <p className="mt-2 text-xs md:text-sm text-muted-foreground max-w-md mx-auto">
        Essayez d'ajuster vos critères de recherche ou sélectionnez une autre catégorie pour voir les vidéos disponibles.
      </p>
      {onRefresh && (
        <Button 
          variant="outline" 
          size="sm"
          className="mt-4 h-9 px-3 py-2"
          onClick={onRefresh}
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          Actualiser les résultats
        </Button>
      )}
    </div>
  );
};

export default NoVideosFound;
