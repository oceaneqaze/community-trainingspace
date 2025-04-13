
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import DesktopSidebar from './DesktopSidebar';
import MobileHeader from './MobileHeader';
import MobileMenu from './MobileMenu';

const VerticalNavbar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { isAuthenticated, logout, profile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Auto-collapse sidebar on mobile
  React.useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    }
  }, [isMobile]);

  // Close mobile menu on navigation
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <DesktopSidebar
        expanded={expanded}
        toggleSidebar={toggleSidebar}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        profile={profile}
        handleLogout={handleLogout}
        navigate={navigate}
      />
      <MobileHeader toggleMobileMenu={toggleMobileMenu} />
      <MobileMenu
        isOpen={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        profile={profile}
        handleLogout={handleLogout}
        navigate={navigate}
      />
    </>
  );
};

export default VerticalNavbar;
