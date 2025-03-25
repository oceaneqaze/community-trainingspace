
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { MenuIcon, X, User, LogOut, Video, MessageSquare, Users, LayoutDashboard } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, profile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold">DOPE CONTENT</span>
            </Link>
          </div>

          {isAuthenticated && (
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <Link
                to="/videos"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === '/videos'
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                Vidéos
              </Link>
              
              <Link
                to="/chat"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === '/chat'
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                Chat
              </Link>
              
              {isAdmin() && (
                <>
                  <Link
                    to="/members"
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      location.pathname === '/members'
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Membres
                  </Link>
                  
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      location.pathname === '/dashboard'
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>
          )}

          <div className="flex items-center">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                      {profile?.avatar_url ? (
                        <AvatarImage src={profile.avatar_url} alt={profile.name} />
                      ) : (
                        <AvatarFallback>
                          {profile?.name ? getInitials(profile.name) : 'U'}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {profile?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/videos')}>
                    <Video className="mr-2 h-4 w-4" />
                    <span>Vidéos</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/chat')}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Chat</span>
                  </DropdownMenuItem>
                  {isAdmin() && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/members')}>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Membres</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Connexion
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Inscription
                </Button>
              </div>
            )}

            <div className="flex items-center sm:hidden ml-4">
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
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                onClick={closeMenu}
              >
                Profil
              </Link>
              <Link
                to="/videos"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                onClick={closeMenu}
              >
                Vidéos
              </Link>
              <Link
                to="/chat"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                onClick={closeMenu}
              >
                Chat
              </Link>
              
              {isAdmin() && (
                <>
                  <Link
                    to="/members"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                    onClick={closeMenu}
                  >
                    Membres
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                </>
              )}
              
              <button
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-muted"
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                onClick={closeMenu}
              >
                Connexion
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                onClick={closeMenu}
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
