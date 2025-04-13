
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
      <div>
        <CardTitle className="text-4xl font-bold text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Bibliothèque de vidéos
        </CardTitle>
        <CardDescription className="text-muted-foreground mt-2">
          Explorez notre collection de vidéos éducatives
        </CardDescription>
      </div>
      
      <div className="flex space-x-2 self-end sm:self-auto mt-4 sm:mt-0">
        <Button 
          variant="outline" 
          onClick={() => navigate('/chat')} 
          className="transition-all hover:bg-primary/10"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Accéder au Chat
        </Button>
        
        {isAdmin && (
          <Button 
            variant="outline" 
            onClick={() => navigate('/library-manager')} 
            className="transition-all hover:bg-primary/10"
          >
            <Library className="mr-2 h-4 w-4" />
            Gérer la bibliothèque
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideosHeader;
