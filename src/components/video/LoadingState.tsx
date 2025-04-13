
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="text-center py-10">
      <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
      <h3 className="text-lg font-medium text-foreground">Chargement des vidéos...</h3>
    </div>
  );
};

export default LoadingState;
