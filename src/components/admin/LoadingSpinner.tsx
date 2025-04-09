
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center py-20">
      <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );
};

export default LoadingSpinner;
