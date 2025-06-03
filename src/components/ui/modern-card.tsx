
import React from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'solid' | 'gradient';
  hover?: boolean;
  glow?: 'purple' | 'pink' | 'blue' | 'none';
  onClick?: () => void;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className = '',
  variant = 'glass',
  hover = true,
  glow = 'none',
  onClick
}) => {
  const baseClasses = "relative rounded-xl border transition-all duration-300";
  
  const variantClasses = {
    glass: "glass-card",
    solid: "bg-slate-800/80 border-slate-700/50",
    gradient: "bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30"
  };

  const hoverClasses = hover ? "hover-lift" : "";
  
  const glowClasses = {
    purple: "glow-purple",
    pink: "glow-pink", 
    blue: "shadow-[0_0_40px_rgba(59,130,246,0.4)]",
    none: ""
  };

  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        glowClasses[glow],
        onClick ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ModernCard;
