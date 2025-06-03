
import React from 'react';
import { MessageCircle, Library } from 'lucide-react';
import ModernButton from "@/components/ui/modern-button";
import { useNavigate } from 'react-router-dom';

interface VideosHeaderProps {
  isAdmin: boolean;
}

const VideosHeader: React.FC<VideosHeaderProps> = ({ isAdmin }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 justify-between">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient-multi">
          Bibliothèque de vidéos
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Explorez notre collection de vidéos éducatives
        </p>
      </div>
      
      <div className="flex space-x-3 self-start sm:self-auto">
        <ModernButton 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/chat')} 
          className="px-3 sm:px-4 h-9 sm:h-10 text-xs sm:text-sm"
        >
          <MessageCircle className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Accéder au Chat</span>
          <span className="xs:hidden">Chat</span>
        </ModernButton>
        
        {isAdmin && (
          <ModernButton 
            variant="gradient" 
            size="sm"
            glow={true}
            onClick={() => navigate('/library-manager')} 
            className="px-3 sm:px-4 h-9 sm:h-10 text-xs sm:text-sm"
          >
            <Library className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Gérer la bibliothèque</span>
            <span className="xs:hidden">Gérer</span>
          </ModernButton>
        )}
      </div>
    </div>
  );
};

export default VideosHeader;
