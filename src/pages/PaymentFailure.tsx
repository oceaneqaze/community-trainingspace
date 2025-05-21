
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight } from 'lucide-react';
import PaymentHeader from '@/components/payment/PaymentHeader';

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('order_id');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-destructive/5 to-background">
      <PaymentHeader />
      
      <div className="container max-w-3xl py-12 px-4">
        <div className="bg-card shadow-lg rounded-xl border border-destructive/20 overflow-hidden animate-fade-in">
          <div className="bg-destructive text-white p-8 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-white/20 p-4 mb-4">
              <AlertCircle className="h-12 w-12" />
            </div>
            <h1 className="text-3xl font-bold">Échec du paiement</h1>
            <p className="mt-2 text-destructive-foreground">
              Votre paiement n'a pas pu être traité. Aucun montant n'a été débité.
            </p>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="bg-muted p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-medium">Pourquoi mon paiement a échoué ?</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Votre solde Mobile Money est peut-être insuffisant</li>
                <li>Il peut y avoir un problème temporaire avec l'opérateur de paiement</li>
                <li>Vous avez peut-être annulé la transaction</li>
                <li>Un problème technique est survenu pendant le processus</li>
              </ul>
              {orderId && (
                <p className="text-sm text-muted-foreground mt-2">
                  Identifiant de commande: {orderId}
                </p>
              )}
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
            
            <div className="text-center text-muted-foreground text-sm pt-4">
              <p>
                Besoin d'aide ? Contactez-nous à{' '}
                <a href="mailto:support@dopecontent.co" className="text-primary hover:underline">
                  support@dopecontent.co
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
