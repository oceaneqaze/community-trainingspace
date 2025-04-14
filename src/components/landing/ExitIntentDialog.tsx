
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  return (
    <Dialog open={showExitIntent} onOpenChange={setShowExitIntent}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">🚨 Attends une seconde !</DialogTitle>
          <DialogDescription className="text-center">
            Tu es sur le point de manquer l'opportunité de transformer ton contenu pour toujours
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p className="text-center font-bold">L'offre expire dans:</p>
          <div className="flex justify-center gap-2">
            <span className="bg-destructive text-white px-3 py-1 rounded-md">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-xl">:</span>
            <span className="bg-destructive text-white px-3 py-1 rounded-md">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-xl">:</span>
            <span className="bg-destructive text-white px-3 py-1 rounded-md">{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
          <Button
            onClick={() => {
              window.open('https://wa.me/22954155702', '_blank');
              setShowExitIntent(false);
            }}
            className="tech-button"
          >
            Je ne veux pas rater cette chance
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowExitIntent(false)}
            className="border-none"
          >
            Non merci, je préfère continuer à galérer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentDialog;
