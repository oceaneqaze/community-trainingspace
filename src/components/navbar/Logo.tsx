
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex-shrink-0 flex items-center gap-2">
      <img 
        src="/lovable-uploads/0cc014bc-d4f7-4cba-9002-f23dfd3daf89.png" 
        alt="DOPE CONTENT Logo" 
        className="h-8 w-auto"
      />
      <span className="text-2xl font-bold">DOPE CONTENT</span>
    </Link>
  );
};

export default Logo;
