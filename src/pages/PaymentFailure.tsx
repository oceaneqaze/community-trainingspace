
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight } from 'lucide-react';

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('order_id');
  
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="bg-card shadow-lg rounded-lg overflow-hidden">
        <div className="bg-destructive text-destructive-foreground p-6 flex items-center justify-center">
          <AlertCircle className="h-12 w-12 mr-4" />
          <h1 className="text-3xl font-bold">Échec du paiement</h1>
        </div>
        
        <div className="p-6 space-y-6">
          <p className="text-xl text-center">
            Votre paiement n'a pas pu être traité. Aucun montant n'a été débité.
          </p>
          
          <div className="bg-muted p-6 rounded-md space-y-4">
            <h3 className="text-lg font-medium">Pourquoi mon paiement a échoué ?</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Votre carte a peut-être été refusée</li>
              <li>Il peut y avoir un problème temporaire avec le système de paiement</li>
              <li>Votre banque a peut-être bloqué la transaction</li>
            </ul>
            <p>Identifiant de commande: {orderId || 'Non disponible'}</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/')}
            >
              Retour à l'accueil
            </Button>
            <Button 
              className="flex-1"
              onClick={() => navigate('/payment')}
            >
              Réessayer le paiement
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-center text-muted-foreground pt-4">
            Besoin d'aide ? Contactez-nous à support@dopecontent.co
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
