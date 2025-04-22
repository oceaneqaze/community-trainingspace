
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarToggleProps {
  expanded: boolean;
  toggleSidebar: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ expanded, toggleSidebar }) => {
  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-2">
      {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </Button>
  );
};

export default SidebarToggle;
