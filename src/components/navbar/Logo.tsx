
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex-shrink-0 flex items-center gap-2">
      <img 
        src="/lovable-uploads/bb7e7daa-74a3-4cd4-8457-13ba5ae39dce.png" 
        alt="DOPE CONTENT Logo" 
        className="h-8 w-auto"
      />
      <span className="text-2xl font-bold">DOPE CONTENT</span>
    </Link>
  );
};

export default Logo;
