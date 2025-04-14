
import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

interface CountdownTimerProps {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  onClickCTA: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeft, onClickCTA }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-primary/40 py-1.5 md:py-3 px-2 md:px-4 safe-area-top">
      <div className="max-w-6xl mx-auto flex flex-col xs:flex-row justify-between items-center gap-1 xs:gap-3">
        <div className="flex items-center">
          <Clock className="h-3.5 w-3.5 md:h-5 md:w-5 text-destructive mr-1 md:mr-2 animate-pulse" />
          <span className="text-[10px] md:text-sm font-semibold">Offre expire dans:</span>
        </div>
        
        <div className="flex items-center gap-1 my-1 xs:my-0">
          <div className="bg-gradient-to-b from-destructive to-destructive/80 text-white px-1.5 md:px-3 py-0.5 md:py-1.5 rounded font-mono font-bold text-[10px] md:text-sm animate-pulse shadow-lg">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <span className="text-foreground/80">:</span>
          <div className="bg-gradient-to-b from-destructive to-destructive/80 text-white px-1.5 md:px-3 py-0.5 md:py-1.5 rounded font-mono font-bold text-[10px] md:text-sm animate-pulse shadow-lg">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <span className="text-foreground/80">:</span>
          <div className="bg-gradient-to-b from-destructive to-destructive/80 text-white px-1.5 md:px-3 py-0.5 md:py-1.5 rounded font-mono font-bold text-[10px] md:text-sm animate-pulse shadow-lg">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
        
        <div className="flex flex-row xs:flex-row gap-2 xs:gap-2">
          <Button 
            onClick={onClickCTA} 
            size="sm" 
            className="bg-gradient-to-r from-destructive to-destructive/90 hover:from-destructive/90 hover:to-destructive border border-destructive/20 shadow-lg transition-all hover:scale-105 text-white text-[10px] md:text-sm py-0.5 h-auto"
          >
            Sécuriser mon accès
            <ArrowRight className="ml-1 h-2.5 w-2.5 md:h-3.5 md:w-3.5" />
          </Button>
          
          <Button
            onClick={() => navigate('/invitation')}
            size="sm"
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/20 hover:border-primary transition-all text-[10px] md:text-sm py-0.5 h-auto"
          >
            J'ai un code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
