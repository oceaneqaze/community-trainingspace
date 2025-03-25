
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, profile, logout, isAdmin, isLimited } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Vidéos', href: '/videos' },
    ...(isAdmin() ? [{ name: 'Membres', href: '/members' }] : []),
    ...(isAdmin() ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // URL validation middleware
  const blockExternalLinks = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLimited()) {
      const href = (event.currentTarget as HTMLAnchorElement).href;
      const isExternal = !href.includes(window.location.hostname) && href.includes('://');
      
      if (isExternal) {
        event.preventDefault();
        alert("Vous n'êtes pas autorisé à accéder aux liens externes.");
        return false;
      }
    }
    return true;
  };

  return (
    <nav className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold tech-text">DOPE CONTENT</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {isAuthenticated && (
              <>
                <div className="hidden sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-300',
                        location.pathname === item.href
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      )}
                      onClick={blockExternalLinks}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <div className="relative ml-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {profile?.avatar_url ? (
                            <div className="h-8 w-8 rounded-full overflow-hidden border border-primary/30">
                              <img
                                className="h-8 w-8 rounded-full object-cover"
                                src={profile.avatar_url}
                                alt={profile.name}
                              />
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{profile?.name}</span>
                          {isAdmin() && (
                            <span className="text-xs text-primary flex items-center">
                              <Shield className="h-3 w-3 mr-1" /> Admin
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={logout}
                        className="p-1 rounded-full text-muted-foreground hover:text-foreground focus:outline-none"
                        title="Déconnexion"
                      >
                        <LogOut className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!isAuthenticated && (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                  className="tech-button-outline"
                >
                  <Link to="/login">Connexion</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? 'block animate-fade-in' : 'hidden animate-fade-out'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {isAuthenticated && navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                location.pathname === item.href
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:bg-muted hover:border-border hover:text-foreground'
              )}
              onClick={(e) => {
                blockExternalLinks(e);
                closeMenu();
              }}
            >
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated && (
            <div className="pt-4 pb-3 border-t border-border">
              <div className="flex items-center px-4">
                {profile?.avatar_url ? (
                  <div className="h-10 w-10 rounded-full overflow-hidden border border-primary/30">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={profile.avatar_url}
                      alt={profile.name}
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div className="ml-3">
                  <div className="text-base font-medium">{profile?.name}</div>
                  <div className="text-sm font-medium text-muted-foreground">{profile?.email}</div>
                  {isAdmin() && (
                    <span className="text-xs text-primary flex items-center mt-1">
                      <Shield className="h-3 w-3 mr-1" /> Admin
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="pt-4 pb-3 border-t border-border">
              <div className="flex items-center justify-center space-x-4 px-4 py-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full tech-button"
                  asChild
                  onClick={closeMenu}
                >
                  <Link to="/login">Connexion</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Author info in footer */}
      <div className="hidden lg:block absolute bottom-0 right-4 text-xs text-muted-foreground">
        <a href="https://wa.me/22954155702" className="hover:text-primary" target="_blank" rel="noopener noreferrer">
          DOPE CONTENT par Emma-Alk DOHOU
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
