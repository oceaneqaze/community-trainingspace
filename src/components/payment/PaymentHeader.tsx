
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PaymentHeader: React.FC = () => {
  return (
    <header className="py-6 border-b border-border/20">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/0cc014bc-d4f7-4cba-9002-f23dfd3daf89.png" 
            alt="DOPE CONTENT Logo" 
            className="h-8 w-auto"
          />
          <span className="text-2xl font-bold">DOPE CONTENT</span>
        </Link>
        <Link 
          to="/" 
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour à l'accueil
        </Link>
      </div>
    </header>
  );
};

export default PaymentHeader;
