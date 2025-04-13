
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Home, 
  Video, 
  MessageSquare, 
  Users, 
  LayoutDashboard, 
  BookOpen, 
  Bell, 
  LogOut, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { getNavigationItems } from '@/components/navbar/NavigationItems';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from '@/components/ui/sheet';

const VerticalNavbar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { isAuthenticated, logout, profile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationItems = getNavigationItems();
  const isMobile = useIsMobile();

  // Auto-collapse sidebar on mobile
  React.useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    }
  }, [isMobile]);

  // Close mobile menu on navigation
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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

  // Desktop sidebar
  const renderDesktopSidebar = () => (
    <div className={cn(
      "h-screen border-r border-border bg-background transition-all duration-300 flex flex-col hidden md:flex",
      expanded ? "w-64" : "w-16"
    )}>
      {/* Logo and toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {expanded ? (
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/lovable-uploads/bb7e7daa-74a3-4cd4-8457-13ba5ae39dce.png"
              alt="DOPE CONTENT Logo"
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg">DOPE CONTENT</span>
          </Link>
        ) : (
          <Link to="/" className="w-full flex justify-center">
            <img
              src="/lovable-uploads/bb7e7daa-74a3-4cd4-8457-13ba5ae39dce.png"
              alt="Logo"
              className="h-8 w-auto"
            />
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-2">
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>

      {/* Navigation section */}
      <div className="flex-grow overflow-auto p-2">
        {isAuthenticated ? (
          <nav className="space-y-1">
            <TooltipProvider>
              {navigationItems.map((item) => {
                // Skip admin-only items if user is not admin
                if (item.adminOnly && !isAdmin()) return null;
                
                const isActive = location.pathname === item.path;
                
                return (
                  <Tooltip key={item.path} delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md w-full transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted",
                          !expanded && "justify-center"
                        )}
                      >
                        <div className={cn("flex items-center", expanded ? "w-full" : "justify-center")}>
                          {item.icon || <Video className="h-5 w-5" />}
                          {expanded && <span className="ml-3 text-sm">{item.label}</span>}
                        </div>
                      </Link>
                    </TooltipTrigger>
                    {!expanded && (
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </nav>
        ) : (
          <div className="space-y-1 py-2">
            <TooltipProvider>
              {expanded ? (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => navigate('/login')}
                  >
                    <span>Connexion</span>
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    onClick={() => navigate('/invitation')}
                  >
                    <span>S'inscrire</span>
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => navigate('/login')}
                      >
                        C
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">Connexion</TooltipContent>
                  </Tooltip>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Button 
                        className="w-full"
                        onClick={() => navigate('/invitation')} 
                      >
                        S
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">S'inscrire</TooltipContent>
                  </Tooltip>
                </>
              )}
            </TooltipProvider>
          </div>
        )}
      </div>

      {/* User profile section */}
      {isAuthenticated && (
        <div className={cn(
          "border-t border-border p-3",
          expanded ? "flex items-center" : "flex flex-col items-center"
        )}>
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex items-center",
                    expanded ? "w-full justify-start" : "w-full justify-center p-2"
                  )}
                  onClick={() => navigate('/profile')}
                >
                  <Avatar className="h-8 w-8">
                    {profile?.avatar_url ? (
                      <AvatarImage src={profile.avatar_url} alt={profile.name} />
                    ) : (
                      <AvatarFallback>
                        {profile?.name ? getInitials(profile.name) : 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {expanded && <span className="ml-2 text-sm truncate">{profile?.name}</span>}
                </Button>
              </TooltipTrigger>
              {!expanded && (
                <TooltipContent side="right">
                  {profile?.name || 'Profil'}
                </TooltipContent>
              )}
            </Tooltip>

            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size={expanded ? "default" : "icon"}
                  className={cn("text-red-500 hover:text-red-600 hover:bg-red-50 mt-1", 
                    expanded ? "ml-auto" : "w-full"
                  )}
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  {expanded && <span className="ml-2">Déconnexion</span>}
                </Button>
              </TooltipTrigger>
              {!expanded && (
                <TooltipContent side="right">
                  Déconnexion
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );

  // Mobile header with menu button
  const renderMobileHeader = () => (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background sticky top-0 z-30">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/lovable-uploads/bb7e7daa-74a3-4cd4-8457-13ba5ae39dce.png"
          alt="DOPE CONTENT Logo"
          className="h-8 w-auto"
        />
        <span className="font-bold text-lg">DOPE CONTENT</span>
      </Link>
      <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  );

  // Mobile menu (slide-in)
  const renderMobileMenu = () => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetContent side="left" className="w-[85%] max-w-[300px] p-0">
        <div className="flex flex-col h-full bg-background">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <img
                src="/lovable-uploads/bb7e7daa-74a3-4cd4-8457-13ba5ae39dce.png"
                alt="DOPE CONTENT Logo"
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg">DOPE CONTENT</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-grow overflow-auto p-4">
            {isAuthenticated ? (
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  if (item.adminOnly && !isAdmin()) return null;
                  
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-3 rounded-md w-full transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center w-full">
                        {item.icon || <Video className="h-5 w-5" />}
                        <span className="ml-3 text-base">{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            ) : (
              <div className="space-y-2 py-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-base" 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                >
                  <span>Connexion</span>
                </Button>
                <Button 
                  className="w-full justify-start text-base" 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/invitation');
                  }}
                >
                  <span>S'inscrire</span>
                </Button>
              </div>
            )}
          </div>

          {isAuthenticated && (
            <div className="border-t border-border p-4">
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/profile');
                  }}
                >
                  <Avatar className="h-8 w-8 mr-2">
                    {profile?.avatar_url ? (
                      <AvatarImage src={profile.avatar_url} alt={profile.name} />
                    ) : (
                      <AvatarFallback>
                        {profile?.name ? getInitials(profile.name) : 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm truncate">{profile?.name}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      {renderDesktopSidebar()}
      {renderMobileHeader()}
      {renderMobileMenu()}
    </>
  );
};

export default VerticalNavbar;
