import { useLocation, Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  CameraIcon,
  UsersIcon,
  BookOpen,
  MessageSquare,
  Bell,
  User,
  Award,
  Clock,
} from "lucide-react";
import { useAuth } from '@/context/AuthContext';

const VerticalNavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isAdmin } = useAuth();

  const navItems = [
    {
      name: 'Tableau de bord',
      path: '/dashboard',
      icon: <HomeIcon className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/dashboard',
    },
    {
      name: 'Vidéos',
      path: '/videos',
      icon: <CameraIcon className="h-5 w-5 mr-2" />,
      isActive: currentPath.startsWith('/videos'),
    },
    {
      name: 'Historique',
      path: '/history',
      icon: <Clock className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/history',
    },
    {
      name: 'Membres',
      path: '/members',
      icon: <UsersIcon className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/members',
      adminOnly: true,
    },
    {
      name: 'Bibliothèque',
      path: '/library',
      icon: <BookOpen className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/library',
      adminOnly: true,
    },
    {
      name: 'Documents',
      path: '/ebooks',
      icon: <BookOpen className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/ebooks',
    },
    {
      name: 'Discussion',
      path: '/chat',
      icon: <MessageSquare className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/chat',
    },
    {
      name: 'Annonces',
      path: '/announcements',
      icon: <Bell className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/announcements',
    },
    {
      name: 'Profil',
      path: '/profile',
      icon: <User className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/profile',
    },
    {
      name: 'Invitations',
      path: '/invitations',
      icon: <Award className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/invitations',
    },
  ];

  return (
    <div className="flex flex-col w-full h-full">
      <div className="space-y-1">
        {navItems.map((item) => {
          if (item.adminOnly && !isAdmin) return null;
          
          return (
            <Link to={item.path} key={item.path}>
              <Button
                variant={item.isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  item.isActive && "bg-secondary text-secondary-foreground"
                )}
              >
                {item.icon}
                {item.name}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalNavbar;
