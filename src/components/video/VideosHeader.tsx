
import React from 'react';
import { MessageCircle, Library } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  CardTitle, 
  CardDescription, 
} from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

interface VideosHeaderProps {
  isAdmin: boolean;
}

const VideosHeader: React.FC<VideosHeaderProps> = ({ isAdmin }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 justify-between">
      <div>
        <CardTitle className="text-3xl sm:text-4xl font-bold text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Bibliothèque de vidéos
        </CardTitle>
        <CardDescription className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          Explorez notre collection de vidéos éducatives
        </CardDescription>
      </div>
      
      <div className="flex space-x-2 self-start sm:self-auto">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/chat')} 
          className="transition-all hover:bg-primary/10 px-2 sm:px-3 h-8 sm:h-9 text-xs sm:text-sm"
        >
          <MessageCircle className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Accéder au Chat</span>
          <span className="xs:hidden">Chat</span>
        </Button>
        
        {isAdmin && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/library-manager')} 
            className="transition-all hover:bg-primary/10 px-2 sm:px-3 h-8 sm:h-9 text-xs sm:text-sm"
          >
            <Library className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Gérer la bibliothèque</span>
            <span className="xs:hidden">Gérer</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideosHeader;
