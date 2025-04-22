
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Download, Trash } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useEbooks } from '@/hooks/useEbooks';
import { formatBytes } from '@/utils/fileUtils';
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

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Book className="h-5 w-5" />
          <span className="truncate">{ebook.title}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {ebook.description && (
          <p className="text-sm text-muted-foreground mb-2">
            {ebook.description}
          </p>
        )}
        {ebook.category && (
          <p className="text-sm">
            Catégorie: {ebook.category}
          </p>
        )}
        {ebook.file_size && (
          <p className="text-sm text-muted-foreground">
            Taille: {formatBytes(ebook.file_size)}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between gap-2">
        <Button 
          variant="secondary" 
          className="flex-1"
          onClick={() => window.open(ebook.file_url, '_blank')}
        >
          <Download className="h-4 w-4 mr-2" />
          Télécharger
        </Button>

        {isAdmin() && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer ce document ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Le document sera définitivement supprimé.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
