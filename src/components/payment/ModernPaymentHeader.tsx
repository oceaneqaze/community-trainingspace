
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ModernPaymentHeader: React.FC = () => {
  return (
    <header className="relative py-8 border-b border-white/10">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/lovable-uploads/0cc014bc-d4f7-4cba-9002-f23dfd3daf89.png" 
            alt="DOPE CONTENT Logo" 
            className="h-10 w-auto transition-transform group-hover:scale-105"
          />
          <span className="text-2xl font-bold text-gradient-purple">DOPE CONTENT</span>
        </Link>
        <Link 
          to="/" 
          className="flex items-center text-sm text-gray-300 hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Retour à l'accueil
        </Link>
      </div>
    </header>
  );
};

export default ModernPaymentHeader;
