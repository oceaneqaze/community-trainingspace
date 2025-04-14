
import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CountdownTimerProps {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  onClickCTA: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeft, onClickCTA }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-primary/30 py-2 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-destructive mr-2 animate-pulse" />
          <span className="text-sm sm:text-base font-bold">Offre spéciale expire dans:</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="bg-destructive text-white px-2 py-1 rounded-md text-sm sm:text-base font-mono animate-pulse">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span>:</span>
          <span className="bg-destructive text-white px-2 py-1 rounded-md text-sm sm:text-base font-mono animate-pulse">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span>:</span>
          <span className="bg-destructive text-white px-2 py-1 rounded-md text-sm sm:text-base font-mono animate-pulse">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
        <Button 
          onClick={onClickCTA} 
          size="sm" 
          variant="destructive" 
          className="animate-pulse transition-all hover:scale-105"
        >
          Rejoindre maintenant
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default CountdownTimer;
