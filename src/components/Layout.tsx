
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import VerticalNavbar from './sidebar/VerticalNavbar';
import { SidebarProvider } from './ui/sidebar';

const Layout: React.FC = () => {
  const location = useLocation();
  console.log('Rendu du Layout, chemin actuel:', location.pathname);
  
  // Add payment routes to hide navigation
  const isLoginPage = location.pathname.includes('/login') || location.pathname.includes('/signin');
  const isSignupPage = location.pathname.includes('/signup');
  const isInvitationPage = location.pathname.includes('/invitation/');
  const is404Page = location.pathname.includes('/404');
  const isLandingPage = location.pathname === '/';
  const isPaymentPage = location.pathname.includes('/payment');

  const hideNav = isLoginPage || isSignupPage || isInvitationPage || is404Page || isLandingPage || isPaymentPage;

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex w-full">
          {!hideNav && <VerticalNavbar />}
          
          <main className={cn(
            "flex-1",
            !hideNav ? "md:ml-0" : "w-full",
            "sm:px-4 md:px-6 lg:px-8",
            "px-0" // Supprime les marges sur mobile
          )}>
            <div className={cn(
              "mx-auto",
              "sm:container",
              "px-0 sm:px-4" // Supprime les marges sur mobile, garde les marges sur desktop
            )}>
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
