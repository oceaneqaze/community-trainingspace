
import React from 'react';
import { FileVideo } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoVideosFoundProps {
  onRefresh?: () => void;
}

const NoVideosFound: React.FC<NoVideosFoundProps> = ({ onRefresh }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-secondary/10 rounded-lg border border-dashed border-secondary">
      <FileVideo className="h-16 w-16 text-muted-foreground mb-4" strokeWidth={1.5} />
      <h3 className="text-xl font-medium text-foreground">Aucune vidéo trouvée</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        Essayez d'ajuster vos critères de recherche ou sélectionnez une autre catégorie pour voir les vidéos disponibles.
      </p>
      {onRefresh && (
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={onRefresh}
        >
          Actualiser les résultats
        </Button>
      )}
    </div>
  );
};

export default NoVideosFound;
