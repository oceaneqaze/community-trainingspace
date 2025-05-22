
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Trash, BookOpen, FileText } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useEbooks } from '@/hooks/useEbooks';
import { formatBytes } from '@/utils/fileUtils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';

interface EbookCardProps {
  ebook: {
    id: string;
    title: string;
    description?: string;
    file_url: string;
    file_size?: number;
    category?: string;
  };
}

const EbookCard: React.FC<EbookCardProps> = ({ ebook }) => {
  const { isAdmin } = useAuth();
  const { deleteEbook } = useEbooks();

  // Génère une couleur en fonction de la catégorie
  const getCategoryColor = (category?: string) => {
    if (!category) return 'bg-zinc-100 dark:bg-zinc-900';
    
    const categoryColors: Record<string, string> = {
      "Guide": "bg-blue-50 dark:bg-blue-950",
      "Tutorial": "bg-green-50 dark:bg-green-950",
      "Reference": "bg-amber-50 dark:bg-amber-950",
      "Manual": "bg-purple-50 dark:bg-purple-950",
      "Report": "bg-rose-50 dark:bg-rose-950"
    };
    
    return categoryColors[category] || 'bg-zinc-100 dark:bg-zinc-900';
  };

  // Fonction pour obtenir l'icône appropriée en fonction du type de fichier
  const getFileIcon = () => {
    const fileExt = ebook.file_url.split('.').pop()?.toLowerCase();
    
    switch(fileExt) {
      case 'pdf':
        return <FileText className="h-10 w-10 text-zinc-700" />;
      default:
        return <BookOpen className="h-10 w-10 text-zinc-700" />;
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 border-0 rounded-xl shadow-md hover:shadow-xl",
      getCategoryColor(ebook.category)
    )}>
      <AspectRatio ratio={4/3} className="bg-white dark:bg-zinc-800">
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
          {getFileIcon()}
          <h3 className="text-xl font-medium mt-4 text-center line-clamp-2">
            {ebook.title}
          </h3>
          {ebook.category && (
            <span className="mt-2 px-2 py-1 text-xs rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">
              {ebook.category}
            </span>
          )}
        </div>
      </AspectRatio>
      
      <CardContent className="p-4">
        {ebook.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {ebook.description}
          </p>
        )}
        {ebook.file_size && (
          <p className="text-xs text-muted-foreground">
            Taille: {formatBytes(ebook.file_size)}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0 gap-2">
        <Button 
          variant="outline" 
          className="flex-1 rounded-full font-medium"
          onClick={() => window.open(ebook.file_url, '_blank')}
        >
          <Download className="h-4 w-4 mr-2" />
          Télécharger
        </Button>

        {isAdmin() && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" className="rounded-full">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white dark:bg-zinc-900 border-0 shadow-xl rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer ce document ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Le document sera définitivement supprimé.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">Annuler</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                  onClick={() => deleteEbook(ebook.id)}
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default EbookCard;
