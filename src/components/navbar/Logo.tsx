
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex-shrink-0 flex items-center">
      <span className="text-2xl font-bold">DOPE CONTENT</span>
    </Link>
  );
};

export default Logo;
