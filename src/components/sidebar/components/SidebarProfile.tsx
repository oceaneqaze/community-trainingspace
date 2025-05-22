import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import { UserProfile } from '@/context/auth/types';

interface SidebarProfileProps {
  expanded: boolean;
  profile: UserProfile | null;
  handleLogout: () => Promise<void>;
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({ expanded, profile, handleLogout }) => {
  return (
    <>
      <Avatar className="h-8 w-8">
        <AvatarImage src={profile?.avatar_url || ""} alt={profile?.name} />
        <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      {expanded && (
        <div className="flex flex-col ml-3">
          <span className="font-medium text-sm">{profile?.name}</span>
          <span className="text-xs text-muted-foreground">{profile?.email}</span>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="ml-auto rounded-sm hover:bg-secondary p-2"
      >
        {expanded ? (
          <div className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </div>
        ) : (
          <LogOut className="h-4 w-4" />
        )}
      </button>
    </>
  );
};

export default SidebarProfile;
