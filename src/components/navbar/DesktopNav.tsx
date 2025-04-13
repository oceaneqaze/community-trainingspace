
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AnnouncementsList from '../announcements/AnnouncementsList';
import NavigationItems from './NavigationItems';

interface DesktopNavProps {
  isAuthenticated: boolean;
  isAdmin: () => boolean;
}

const DesktopNav = ({ isAuthenticated, isAdmin }: DesktopNavProps) => {
  const [hasUnreadAnnouncements, setHasUnreadAnnouncements] = useState(false);
  
  if (!isAuthenticated) return null;

  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
      <NavigationItems isAdmin={isAdmin()} />
      
      <Popover>
        <PopoverTrigger asChild>
          <button className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Bell className="h-5 w-5" />
            {hasUnreadAnnouncements && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                <span className="sr-only">Annonces non lues</span>
              </Badge>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <AnnouncementsList onAnnouncementsRead={() => setHasUnreadAnnouncements(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DesktopNav;
