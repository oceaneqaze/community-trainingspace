
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileHeaderProps {
  toggleMobileMenu: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleMobileMenu }) => {
  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background sticky top-0 z-50 w-full">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/lovable-uploads/0cc014bc-d4f7-4cba-9002-f23dfd3daf89.png"
          alt="DOPE CONTENT Logo"
          className="h-8 w-auto"
        />
        <span className="font-bold text-lg">DOPE CONTENT</span>
      </Link>
      <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MobileHeader;
