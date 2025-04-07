
import React from 'react';
import NavLink from './NavLink';

interface DesktopNavProps {
  isAuthenticated: boolean;
  isAdmin: () => boolean;
}

const DesktopNav = ({ isAuthenticated, isAdmin }: DesktopNavProps) => {
  if (!isAuthenticated) return null;

  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
      <NavLink to="/videos">Vidéos</NavLink>
      <NavLink to="/chat">Chat</NavLink>
      
      {isAdmin() && (
        <>
          <NavLink to="/members">Membres</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/library-manager">Bibliothèque</NavLink>
        </>
      )}
    </div>
  );
};

export default DesktopNav;
