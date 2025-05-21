
import React from 'react';
import { Shield, Lock, CreditCard } from 'lucide-react';

const PaymentSecurity: React.FC = () => {
  return (
    <div className="rounded-lg border border-border/50 p-4 bg-card/50">
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <Shield className="h-4 w-4 mr-2 text-primary" />
        Paiement sécurisé
      </h3>
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          <Lock className="h-3 w-3 mr-1" />
          <span>Connexion sécurisée SSL</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-1" />
          <span>Paiement mobile sécurisé</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <span>📱 Mobile Money</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSecurity;
