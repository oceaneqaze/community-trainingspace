
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpotlightFilter from '@/components/ui/spotlight-filter';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const SpotlightNav = () => {
  const [activeItem, setActiveItem] = useState<string>('newsletter');
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { label: "La Communauté", href: "#newsletter", active: activeItem === 'newsletter' },
    { label: "Formation", href: "#product", active: activeItem === 'product' },
    { label: "Tarifs", href: "#price", active: activeItem === 'price' },
    { label: "Inscription", href: "#subscribe", active: activeItem === 'subscribe' },
  ];

  // Set active item based on URL hash on component mount or location change
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && navItems.some(item => item.href.replace('#', '') === hash)) {
      setActiveItem(hash);
    }
  }, [location]);

  return (
    <div className="relative ml-8">
      <SpotlightFilter />
      
      <nav className="h-11 rounded-full border border-primary/30 relative backdrop-blur-sm">
        <ul aria-hidden="true" className="lit flex items-center h-full m-0 p-0 list-none text-sm">
          {navItems.map((item) => (
            <li key={`lit-${item.href}`} className="h-full flex items-center px-5">
              {item.label}
            </li>
          ))}
        </ul>
        
        <ul className="content flex items-center h-full m-0 p-0 list-none text-sm">
          {navItems.map((item) => (
            <li key={item.href} className="h-full flex items-center">
              <a
                href={item.href}
                data-active={item.active}
                className="h-full flex items-center px-5 text-primary-foreground no-underline opacity-40 transition-opacity duration-300 hover:opacity-100 focus:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.href.replace('#', ''));
                  navigate(item.href);
                }}
              >
                <span className="pointer-events-none">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SpotlightNav;
