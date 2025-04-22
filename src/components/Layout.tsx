
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import VerticalNavbar from './sidebar/VerticalNavbar';

const Layout: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/landing';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  const isInvitationPage = location.pathname.includes('/invitation/');
  const is404Page = location.pathname === '/404';

  // Don't show sidebar on certain pages
  const hideNav = isLandingPage || isLoginPage || isSignupPage || isInvitationPage || is404Page;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        {!hideNav && (
          <aside className="hidden md:block w-64 p-4 border-r min-h-[calc(100vh-64px)]">
            <VerticalNavbar />
          </aside>
        )}
        
        <main className={cn(
          "flex-1",
          hideNav ? "w-full" : "md:ml-0"
        )}>
          <div className="container mx-auto p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
