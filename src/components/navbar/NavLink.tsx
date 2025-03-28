
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  mobile?: boolean;
}

const NavLink = ({ to, children, onClick, className = '', mobile = false }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const baseClasses = mobile
    ? "block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
    : "px-3 py-2 text-sm font-medium rounded-md";
  
  const activeClasses = isActive
    ? "bg-primary/10 text-primary"
    : "text-foreground hover:bg-muted";
  
  return (
    <Link
      to={to}
      className={`${baseClasses} ${activeClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
