
import React from 'react';
import { BookOpen } from 'lucide-react';

const NoVideosFound: React.FC = () => {
  return (
    <div className="text-center py-10 bg-secondary/20 rounded-lg">
      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="mt-2 text-lg font-medium text-foreground">Aucune vidéo trouvée</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
        Essayez d'ajuster vos critères de recherche ou sélectionnez une autre catégorie.
      </p>
    </div>
  );
};

export default NoVideosFound;
