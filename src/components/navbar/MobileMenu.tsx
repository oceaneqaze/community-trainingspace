
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavLink from './NavLink';
import NavigationItems from './NavigationItems';

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  onClose: () => void;
  onLogout: () => Promise<void>;
}

const MobileMenu = ({ isOpen, isAuthenticated, isAdmin, onClose, onLogout }: MobileMenuProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    navigate('/');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="sm:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {isAuthenticated ? (
          <>
            <NavLink to="/profile" onClick={onClose} mobile>Profil</NavLink>
            <NavigationItems isAdmin={isAdmin()} mobile={true} onItemClick={onClose} />
            
            <button
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-muted"
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signin" onClick={onClose} mobile>Connexion</NavLink>
            <NavLink to="/signup" onClick={onClose} mobile>Inscription</NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
