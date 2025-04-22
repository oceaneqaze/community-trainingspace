
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotlightFilter from '@/components/ui/spotlight-filter';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const SpotlightNav = () => {
  const [activeItem, setActiveItem] = useState<string>('newsletter');
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { label: "La Communauté", href: "#", active: activeItem === 'newsletter' },
    { label: "Formation", href: "#product", active: activeItem === 'product' },
    { label: "Tarifs", href: "#price", active: activeItem === 'price' },
    { label: "Inscription", href: "#subscribe", active: activeItem === 'subscribe' },
  ];

  return (
    <div className="relative">
      <SpotlightFilter />
      
      <nav className="h-11 rounded-full border border-primary/30 relative backdrop-blur-sm">
        <ul aria-hidden="true" className="lit absolute inset-0 z-[2] flex items-center h-full m-0 p-0 list-none text-sm">
          {navItems.map((item) => (
            <li key={`lit-${item.href}`} className="h-full flex items-center px-5">
              {item.label}
            </li>
          ))}
        </ul>
        
        <ul className="content relative flex items-center h-full m-0 p-0 list-none text-sm">
          {navItems.map((item) => (
            <li key={item.href} className="h-full flex items-center">
              <a
                href={item.href}
                data-active={item.active}
                className="h-full flex items-center px-5 text-primary-foreground no-underline opacity-40 transition-opacity duration-300 hover:opacity-100 focus:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.href.replace('#', ''));
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
