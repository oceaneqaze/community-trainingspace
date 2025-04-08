
import React from 'react';
import { Resource } from '@/types/resource.types';
import { FilePdf, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { EmptyResourceState } from './EmptyResourceState';

interface ResourcesListProps {
  resources: Resource[];
  isLoading: boolean;
  onDelete?: (resourceId: string) => Promise<void>;
}

const ResourcesList: React.FC<ResourcesListProps> = ({ resources, isLoading, onDelete }) => {
  const { isAdmin } = useAuth();
  
  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'N/A';
    
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (resources.length === 0) {
    return <EmptyResourceState />;
  }

  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <Card key={resource.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center">
              <FilePdf className="h-8 w-8 text-primary mr-3 flex-shrink-0" />
              
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium truncate">{resource.title}</h4>
                {resource.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {formatFileSize(resource.file_size)} • 
                  {new Date(resource.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <a href={resource.file_url} target="_blank" rel="noopener noreferrer" download>
                    <Download className="h-4 w-4 mr-1" />
                    Télécharger
                  </a>
                </Button>
                
                {isAdmin() && onDelete && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDelete(resource.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourcesList;
