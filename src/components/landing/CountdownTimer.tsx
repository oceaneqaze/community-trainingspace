
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
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-primary/40 py-3 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-destructive mr-2 animate-pulse" />
          <span className="text-sm sm:text-base font-semibold">Offre spéciale expire dans:</span>
        </div>
        
        <div className="flex items-center gap-1">
          <div className="bg-gradient-to-b from-destructive to-destructive/80 text-white px-3 py-1.5 rounded font-mono font-bold text-sm sm:text-base animate-pulse shadow-lg">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <span className="text-foreground/80">:</span>
          <div className="bg-gradient-to-b from-destructive to-destructive/80 text-white px-3 py-1.5 rounded font-mono font-bold text-sm sm:text-base animate-pulse shadow-lg">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <span className="text-foreground/80">:</span>
          <div className="bg-gradient-to-b from-destructive to-destructive/80 text-white px-3 py-1.5 rounded font-mono font-bold text-sm sm:text-base animate-pulse shadow-lg">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
        
        <Button 
          onClick={onClickCTA} 
          size="sm" 
          className="bg-gradient-to-r from-destructive to-destructive/90 hover:from-destructive/90 hover:to-destructive border border-destructive/20 shadow-lg transition-all hover:scale-105 text-white"
        >
          Rejoindre maintenant
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default CountdownTimer;
