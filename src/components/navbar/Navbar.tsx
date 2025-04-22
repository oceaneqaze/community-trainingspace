
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { BookOpen, MessageSquare, Clock, Bell, Users } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const isMobile = useIsMobile();

  const navItems = [
    { icon: <BookOpen className="w-5 h-5" />, label: 'Documents', href: '/app/ebooks' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Chat', href: '/app/chat' },
    { icon: <Clock className="w-5 h-5" />, label: 'Historique', href: '/app/history' },
    { icon: <Bell className="w-5 h-5" />, label: 'Annonces', href: '/app/announcements' },
    { icon: <Users className="w-5 h-5" />, label: 'Invitations', href: '/app/invitations', adminOnly: true },
  ];

  return (
    <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <Link to="/app" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/0cc014bc-d4f7-4cba-9002-f23dfd3daf89.png"
              alt="Logo" 
              className="h-8 w-auto" 
            />
            <span className="font-bold hidden sm:inline-block">DOPE CONTENT</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems
              .filter(item => !item.adminOnly || isAdmin())
              .map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
