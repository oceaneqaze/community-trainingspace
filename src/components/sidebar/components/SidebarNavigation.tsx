
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getNavigationItems } from '@/components/navbar/NavigationItems';
import { cn } from '@/lib/utils';

interface SidebarNavigationProps {
  expanded: boolean;
  isAdmin: () => boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ expanded, isAdmin }) => {
  const location = useLocation();
  const navigationItems = getNavigationItems();

  return (
    <nav className="space-y-1">
      <TooltipProvider>
        {navigationItems.map((item) => {
          if (item.adminOnly && !isAdmin()) return null;
          
          const isActive = location.pathname === item.path;
          
          return (
            <Tooltip key={item.path} delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md w-full transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted",
                    !expanded && "justify-center"
                  )}
                >
                  <div className={cn("flex items-center", expanded ? "w-full" : "justify-center")}>
                    {item.icon}
                    {expanded && <span className="ml-3 text-sm">{item.label}</span>}
                  </div>
                </Link>
              </TooltipTrigger>
              {!expanded && (
                <TooltipContent side="right">{item.label}</TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </nav>
  );
};

export default SidebarNavigation;
