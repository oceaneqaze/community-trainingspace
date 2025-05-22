
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { UserProfile } from '@/context/auth/types';
import SidebarLogo from './components/SidebarLogo';
import SidebarToggle from './components/SidebarToggle';
import SidebarNavigation from './components/SidebarNavigation';
import SidebarProfile from './components/SidebarProfile';

interface DesktopSidebarProps {
  expanded: boolean;
  toggleSidebar: () => void;
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  profile: UserProfile | null;
  handleLogout: () => Promise<void>;
  navigate: ReturnType<typeof useNavigate>;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  expanded,
  toggleSidebar,
  isAuthenticated,
  isAdmin,
  profile,
  handleLogout
}) => {
  return (
    <div className={cn(
      "fixed h-screen border-r border-border bg-background transition-all duration-300 flex flex-col hidden md:flex",
      expanded ? "w-64" : "w-16"
    )}>
      {/* Logo and toggle section */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <SidebarLogo expanded={expanded} />
        <SidebarToggle expanded={expanded} toggleSidebar={toggleSidebar} />
      </div>

      {/* Navigation section */}
      <div className="flex-grow overflow-auto p-2">
        {isAuthenticated && (
          <SidebarNavigation expanded={expanded} isAdmin={isAdmin} />
        )}
      </div>

      {/* User profile section */}
      {isAuthenticated && (
        <div className={cn(
          "border-t border-border p-3",
          expanded ? "flex items-center" : "flex flex-col items-center"
        )}>
          <SidebarProfile
            expanded={expanded}
            profile={profile}
            handleLogout={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default DesktopSidebar;
