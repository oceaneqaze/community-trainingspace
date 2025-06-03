
import React from 'react';

interface ModernBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'minimal' | 'intense';
}

const ModernBackground: React.FC<ModernBackgroundProps> = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case 'minimal':
        return 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900';
      case 'intense':
        return 'modern-bg';
      default:
        return 'bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-800';
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${getBackgroundClass()} ${className}`}>
      {/* Floating Elements */}
      <div className="floating-element floating-element-1 animate-pulse-glow" />
      <div className="floating-element floating-element-2 animate-pulse-glow" />
      <div className="floating-element floating-element-3 animate-pulse-glow" />
      
      {/* Geometric Shapes */}
      <div className="geometric-shape geometric-triangle" style={{ top: '15%', left: '5%' }} />
      <div className="geometric-shape geometric-square" style={{ top: '70%', right: '8%' }} />
      <div className="geometric-shape geometric-circle" style={{ bottom: '10%', left: '20%' }} />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ModernBackground;
