
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import VerticalNavbar from './sidebar/VerticalNavbar';
import { SidebarProvider } from './ui/sidebar';

const Layout: React.FC = () => {
  const location = useLocation();
  console.log('Rendu du Layout, chemin actuel:', location.pathname);
  
  const isLoginPage = location.pathname.includes('/login');
  const isSignupPage = location.pathname.includes('/signup');
  const isInvitationPage = location.pathname.includes('/invitation/');
  const is404Page = location.pathname.includes('/404');

  const hideNav = isLoginPage || isSignupPage || isInvitationPage || is404Page;

  return (
    <div className="min-h-screen bg-background">
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
