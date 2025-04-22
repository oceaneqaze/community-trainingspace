
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './navbar';
import { cn } from '@/lib/utils';
import VerticalNavbar from './sidebar/VerticalNavbar';
import { SidebarProvider } from './ui/sidebar';

const Layout: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname.includes('/login');
  const isSignupPage = location.pathname.includes('/signup');
  const isInvitationPage = location.pathname.includes('/invitation/');
  const is404Page = location.pathname.includes('/404');

  const hideNav = isLoginPage || isSignupPage || isInvitationPage || is404Page;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <SidebarProvider>
        <div className="flex w-full">
          {!hideNav && <VerticalNavbar />}
          
          <main className={cn(
            "flex-1",
            !hideNav ? "md:ml-0" : "w-full"
          )}>
            <div className="container mx-auto p-4">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
