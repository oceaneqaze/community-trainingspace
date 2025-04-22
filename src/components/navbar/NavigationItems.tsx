
import React from 'react';
import { HomeIcon, Clock, BookOpen, MessageSquare, Bell, Users } from 'lucide-react';
import NavLink from './NavLink';

export interface NavigationItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
  adminOnly?: boolean;
}

// Define all navigation items in one central place
export const getNavigationItems = (): NavigationItem[] => [
  {
    path: '/videos',
    label: 'Vidéos',
    icon: <HomeIcon className="h-4 w-4" />,
    adminOnly: false
  },
  {
    path: '/ebooks',
    label: 'Documents',
    icon: <BookOpen className="h-4 w-4" />,
    adminOnly: false
  },
  {
    path: '/chat',
    label: 'Chat',
    icon: <MessageSquare className="h-4 w-4" />,
    adminOnly: false
  },
  {
    path: '/history',
    label: 'Historique',
    icon: <Clock className="h-4 w-4" />,
    adminOnly: false
  },
  {
    path: '/announcements',
    label: 'Annonces',
    icon: <Bell className="h-4 w-4" />,
    adminOnly: false
  },
  {
    path: '/invitations',
    label: 'Invitations',
    icon: <Users className="h-4 w-4" />,
    adminOnly: true
  }
];

interface NavigationItemsProps {
  isAdmin: boolean;
  mobile?: boolean;
  onItemClick?: () => void;
}

const NavigationItems: React.FC<NavigationItemsProps> = ({ 
  isAdmin,
  mobile = false, 
  onItemClick 
}) => {
  const items = getNavigationItems();

  return (
    <>
      {items.map((item) => {
        // Skip admin-only items if user is not admin
        if (item.adminOnly && !isAdmin) return null;
        
        return (
          <NavLink 
            key={item.path} 
            to={item.path} 
            onClick={onItemClick}
            mobile={mobile}
            className={item.icon ? "flex items-center" : ""}
          >
            {item.icon}
            {item.label}
          </NavLink>
        );
      })}
    </>
  );
};

export default NavigationItems;
