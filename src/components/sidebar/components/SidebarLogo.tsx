
import { Link } from 'react-router-dom';

interface SidebarLogoProps {
  expanded: boolean;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ expanded }) => {
  return expanded ? (
    <Link to="/" className="flex items-center gap-2">
      <img
        src="/lovable-uploads/0cc014bc-d4f7-4cba-9002-f23dfd3daf89.png"
        alt="DOPE CONTENT Logo"
        className="h-8 w-auto"
      />
      <span className="font-bold text-lg">DOPE CONTENT</span>
    </Link>
  ) : (
    <Link to="/" className="w-full flex justify-center">
      <img
        src="/lovable-uploads/0cc014bc-d4f7-4cba-9002-f23dfd3daf89.png"
        alt="Logo"
        className="h-8 w-auto"
      />
    </Link>
  );
};

export default SidebarLogo;
