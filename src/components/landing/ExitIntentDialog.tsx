
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExitIntentDialogProps {
  showExitIntent: boolean;
  setShowExitIntent: (show: boolean) => void;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const ExitIntentDialog: React.FC<ExitIntentDialogProps> = ({ 
  showExitIntent, 
  setShowExitIntent, 
  timeLeft 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Dialog open={showExitIntent} onOpenChange={setShowExitIntent}>
      <DialogContent className="sm:max-w-md p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-base sm:text-lg">🚨 Attends une seconde !</DialogTitle>
          <DialogDescription className="text-center text-xs sm:text-sm">
            Tu es sur le point de manquer l'opportunité de transformer ton contenu pour toujours
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 sm:gap-4 text-center">
          <p className="text-center font-bold text-xs sm:text-base">L'offre expire dans:</p>
          <div className="flex justify-center gap-1 sm:gap-2">
            <span className="bg-destructive text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-xs sm:text-base">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-base sm:text-xl">:</span>
            <span className="bg-destructive text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-xs sm:text-base">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-base sm:text-xl">:</span>
            <span className="bg-destructive text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-xs sm:text-base">{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
          <Button
            onClick={() => {
              window.open('https://wa.me/22954155702', '_blank');
              setShowExitIntent(false);
            }}
            className={`tech-button text-xs sm:text-sm ${isMobile ? 'py-2' : ''}`}
            size={isMobile ? "default" : "default"}
          >
            Je ne veux pas rater cette chance
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowExitIntent(false)}
            className="border-none text-xs sm:text-sm"
          >
            Non merci, je préfère continuer à galérer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentDialog;
