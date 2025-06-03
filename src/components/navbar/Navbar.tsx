
import React, { useState } from 'react';
import { MenuIcon, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

// Import all the components we've created
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import AuthButtons from './AuthButtons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, profile, isAdmin } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await logout();
      if (error) throw error;
      navigate('/signin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="glass-card border-b border-white/10 shadow-lg sticky top-0 z-50 w-full backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>

          <DesktopNav isAuthenticated={isAuthenticated} isAdmin={isAdmin} />

          <div className="flex items-center">
            {isAuthenticated ? (
              <UserMenu 
                profile={profile}
                isAdmin={isAdmin}
                onLogout={handleLogout}
              />
            ) : (
              <AuthButtons />
            )}

            {isMobile && (
              <div className="flex items-center sm:hidden ml-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isOpen}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        onClose={closeMenu}
        onLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
