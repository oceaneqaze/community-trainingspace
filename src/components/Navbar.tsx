
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { MenuIcon, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from '@/components/navbar/Logo';
import SpotlightNav from '@/components/navbar/SpotlightNav';
import UserMenu from '@/components/navbar/UserMenu';
import AuthButtons from '@/components/navbar/AuthButtons';
import MobileMenu from '@/components/navbar/MobileMenu';

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

  return (
    <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
            {!isMobile && <SpotlightNav />}
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <UserMenu 
                profile={profile}
                isAdmin={isAdmin}
                onLogout={logout}
              />
            ) : (
              <AuthButtons />
            )}

            {isMobile && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
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
        onLogout={logout}
      />
    </nav>
  );
};

export default Navbar;
