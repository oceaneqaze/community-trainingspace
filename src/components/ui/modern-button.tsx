
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { type ButtonProps } from '@/components/ui/button';

interface ModernButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'gradient' | 'outline' | 'ghost';
  glow?: boolean;
}

const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  className,
  variant = 'gradient',
  glow = false,
  ...props
}) => {
  const variantClasses = {
    gradient: "modern-button text-white",
    outline: "modern-button-outline",
    ghost: "bg-transparent hover:bg-white/10 text-white border border-white/20"
  };

  const glowClass = glow ? "animate-pulse-glow" : "";

  return (
    <Button
      className={cn(
        variantClasses[variant],
        glowClass,
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ModernButton;
