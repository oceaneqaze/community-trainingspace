
import React from 'react';
import { Users, LayoutDashboard, BookOpen, Bell, MessageCircle } from 'lucide-react';
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
    icon: null,
    adminOnly: false
  },
  {
    path: '/chat',
    label: 'Chat',
    icon: <MessageCircle className="h-4 w-4" />,
    adminOnly: false
  },
  {
    path: '/members',
    label: 'Membres',
    icon: <Users className="h-4 w-4" />,
    adminOnly: true
  },
  {
    path: '/invitations',
    label: 'Invitations',
    icon: <Users className="mr-1 h-4 w-4" />,
    adminOnly: true
  },
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    adminOnly: true
  },
  {
    path: '/library-manager',
    label: 'Bibliothèque',
    icon: <BookOpen className="h-4 w-4" />,
    adminOnly: true
  },
  {
    path: '/announcements',
    label: 'Annonces',
    icon: <Bell className="h-4 w-4" />,
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
