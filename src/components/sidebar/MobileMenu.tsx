
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, LogOut } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { getNavigationItems } from '@/components/navbar/NavigationItems';
import { UserProfile } from '@/types/auth.types';

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  profile: UserProfile | null;
  handleLogout: () => Promise<void>;
  navigate: ReturnType<typeof useNavigate>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onOpenChange,
  isAuthenticated,
  isAdmin,
  profile,
  handleLogout,
  navigate
}) => {
  const location = useLocation();
  const navigationItems = getNavigationItems();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[85%] max-w-[300px] p-0">
        <div className="flex flex-col h-full bg-background">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2" onClick={() => onOpenChange(false)}>
              <img
                src="/lovable-uploads/bb7e7daa-74a3-4cd4-8457-13ba5ae39dce.png"
                alt="DOPE CONTENT Logo"
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg">DOPE CONTENT</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
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
                      onClick={() => onOpenChange(false)}
                    >
                      <div className="flex items-center w-full">
                        {item.icon || <div className="h-5 w-5" />}
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
                    onOpenChange(false);
                    navigate('/login');
                  }}
                >
                  <span>Connexion</span>
                </Button>
                <Button 
                  className="w-full justify-start text-base" 
                  onClick={() => {
                    onOpenChange(false);
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
                    onOpenChange(false);
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
};

export default MobileMenu;
