
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';
import { useWatchHistory } from '@/hooks/useWatchHistory';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, Trash2 } from 'lucide-react';
import WatchHistoryItem from '@/components/video/history/WatchHistoryItem';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const WatchHistory: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { history, isLoading, clearHistory } = useWatchHistory();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleVideoClick = (videoId: string) => {
    navigate(`/videos/${videoId}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return Array(5).fill(0).map((_, i) => (
        <div key={i} className="mb-4">
          <Skeleton className="h-28 w-full" />
        </div>
      ));
    }

    if (history.length === 0) {
      return (
        <div className="text-center py-12">
          <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Aucune vidéo visionnée</h3>
          <p className="text-gray-500 mb-6">Vous n'avez pas encore regardé de vidéos.</p>
          <Button onClick={() => navigate('/videos')}>
            Explorer les vidéos
          </Button>
        </div>
      );
    }

    return history.map(item => (
      <WatchHistoryItem
        key={item.id}
        item={item}
        onClick={handleVideoClick}
      />
    ));
  };

  return (
    <div className="page-container bg-background">
      <Card className="bg-card border-border shadow-lg mb-4 sm:mb-8">
        <CardHeader className="flex flex-row items-center justify-between pb-3 sm:pb-4 px-4 sm:px-6">
          <div>
            <h2 className="text-2xl font-bold">Historique de visionnage</h2>
            <p className="text-muted-foreground text-sm">
              Parcourez les vidéos que vous avez consultées récemment
            </p>
          </div>
          {history.length > 0 && !isLoading && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Effacer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Effacer l'historique?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action supprimera définitivement tout votre historique de visionnage.
                    Cette action ne peut pas être annulée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={clearHistory}>Effacer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default WatchHistory;
