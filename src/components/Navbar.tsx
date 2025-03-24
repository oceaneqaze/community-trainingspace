
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogOut } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Vidéos', href: '/videos' },
    ...(isAdmin() ? [{ name: 'Membres', href: '/members' }] : []),
    ...(isAdmin() ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white bg-opacity-80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-semibold">Formation</span>
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
                          ? 'border-primary text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                      )}
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
                          {user?.avatar ? (
                            <img
                              className="h-8 w-8 rounded-full object-cover"
                              src={user.avatar}
                              alt={user.name}
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                      </div>
                      <button
                        onClick={logout}
                        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
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
                  as={Link} 
                  to="/login" 
                  variant="outline" 
                  size="sm"
                >
                  Connexion
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
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
                  ? 'bg-gray-50 border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              )}
              onClick={closeMenu}
            >
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                {user?.avatar ? (
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={user.avatar}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                )}
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4 px-4 py-2">
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="primary" 
                  size="sm" 
                  fullWidth 
                  onClick={closeMenu}
                >
                  Connexion
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
