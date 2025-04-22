
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { UserProfile } from '@/types/auth.types';

interface SidebarProfileProps {
  expanded: boolean;
  profile: UserProfile | null;
  handleLogout: () => Promise<void>;
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({ expanded, profile, handleLogout }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            className={cn(
              "flex items-center",
              expanded ? "w-full justify-start" : "w-full justify-center p-2"
            )}
            onClick={() => null}
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
            className={cn(
              "text-red-500 hover:text-red-600 hover:bg-red-50 mt-1", 
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
  );
};

export default SidebarProfile;
