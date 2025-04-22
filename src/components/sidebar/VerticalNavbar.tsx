
import { useLocation, Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  BookOpen,
  MessageSquare,
  User,
  Clock,
  ChevronLeft,
  ChevronRight,
  Bell,
  Users,
} from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { 
  Sidebar, 
  SidebarContent,
  SidebarTrigger,
  useSidebar 
} from "@/components/ui/sidebar";

const VerticalNavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, profile } = useAuth();
  const { open } = useSidebar();

  // Function to check if user is admin
  const checkIsAdmin = () => {
    return profile?.role === 'admin';
  };

  const navItems = [
    {
      name: 'Accueil',
      path: '/videos',
      icon: <HomeIcon className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/videos',
    },
    {
      name: 'Documents',
      path: '/ebooks',
      icon: <BookOpen className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/ebooks',
    },
    {
      name: 'Chat',
      path: '/chat',
      icon: <MessageSquare className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/chat',
    },
    {
      name: 'Historique',
      path: '/history',
      icon: <Clock className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/history',
    },
    {
      name: 'Profil',
      path: '/profile',
      icon: <User className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/profile',
    },
    {
      name: 'Annonces',
      path: '/announcements',
      icon: <Bell className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/announcements',
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <User className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/dashboard',
      adminOnly: true,
    },
    {
      name: 'Invitations',
      path: '/invitations',
      icon: <Users className="h-5 w-5 mr-2" />,
      isActive: currentPath === '/invitations',
      adminOnly: true,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent className="pt-4">
        <div className="flex items-center justify-between px-4 mb-4">
          {open ? (
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/lovable-uploads/0cc014bc-d4f7-4cba-9002-f23dfd3daf89.png"
                alt="DOPE CONTENT Logo"
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg">DOPE CONTENT</span>
            </Link>
          ) : (
            <Link to="/" className="w-full flex justify-center">
              <img
                src="/lovable-uploads/0cc014bc-d4f7-4cba-9002-f23dfd3daf89.png"
                alt="Logo"
                className="h-8 w-auto"
              />
            </Link>
          )}
          <SidebarTrigger>
            {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </SidebarTrigger>
        </div>

        <div className="space-y-1 px-3">
          {navItems.map((item) => {
            // Skip admin-only items if user is not admin
            if (item.adminOnly && !checkIsAdmin()) return null;
            
            return (
              <Link to={item.path} key={item.path}>
                <Button
                  variant={item.isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    item.isActive && "bg-secondary text-secondary-foreground",
                    !open && "justify-center px-2"
                  )}
                  title={!open ? item.name : undefined}
                >
                  {item.icon}
                  {open && <span className="ml-3">{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default VerticalNavbar;
