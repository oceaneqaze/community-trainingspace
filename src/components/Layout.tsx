
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';
import VerticalNavbar from './sidebar/VerticalNavbar';
import { SidebarProvider } from './ui/sidebar';

const Layout: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/landing';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  const isInvitationPage = location.pathname.includes('/invitation/');
  const is404Page = location.pathname === '/404';

  const hideNav = isLandingPage || isLoginPage || isSignupPage || isInvitationPage || is404Page;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <SidebarProvider>
        <div className="flex w-full">
          {!hideNav && <VerticalNavbar />}
          
          <main className={cn(
            "flex-1",
            hideNav ? "w-full" : "md:ml-0"
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
