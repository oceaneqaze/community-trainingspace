
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { CheckCircle, Copy, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import PaymentHeader from '@/components/payment/PaymentHeader';

interface PaymentDetails {
  id: string;
  invitation_code: string | null;
  status: string;
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  
  const orderId = searchParams.get('order_id');
  
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!orderId) {
        toast({
          title: "Erreur",
          description: "Identifiant de commande manquant",
          variant: "destructive"
        });
        navigate('/payment');
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Update payment status via webhook simulation if needed
        // This is a fallback in case the webhook doesn't work
        const { data: updateData, error: updateError } = await supabase.functions.invoke(
          'webhook-lygos',
          {
            body: { 
              order_id: orderId,
              status: 'success' 
            }
          }
        );
        
        if (updateError) {
          console.error("Error updating payment status:", updateError);
        }
        
        // Fetch the payment details
        const { data, error } = await supabase
          .from('payments')
          .select('id, invitation_code, status')
          .eq('lygos_order_id', orderId)
          .single();
        
        if (error) throw error;
        
        setPaymentDetails(data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les détails du paiement",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPaymentDetails();
  }, [orderId, navigate]);
  
  const copyInvitationCode = () => {
    if (paymentDetails?.invitation_code) {
      navigator.clipboard.writeText(paymentDetails.invitation_code);
      toast({
        title: "Code copié",
        description: "Le code d'invitation a été copié dans le presse-papiers"
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500/5 to-background">
      <PaymentHeader />
      
      <div className="container max-w-3xl py-12 px-4">
        <div className="bg-card shadow-lg rounded-xl border border-green-200 dark:border-green-900/50 overflow-hidden animate-fade-in">
          <div className="bg-green-500 text-white p-8 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-white/20 p-4 mb-4">
              <CheckCircle className="h-12 w-12" />
            </div>
            <h1 className="text-3xl font-bold">Paiement réussi !</h1>
            <p className="mt-2 text-green-50">
              Merci pour votre confiance. Votre accès à DOPE Content est maintenant activé.
            </p>
          </div>
          
          <div className="p-8 space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                <p className="mt-4 text-xl">Confirmation du paiement en cours...</p>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <p className="text-xl">
                    Félicitations ! Vous avez maintenant accès à tous les contenus premium
                  </p>
                </div>
                
                {paymentDetails?.invitation_code ? (
                  <div className="bg-muted p-6 rounded-lg border border-border">
                    <p className="font-medium mb-3">Votre code d'invitation :</p>
                    <div className="flex items-center">
                      <code className="flex-1 bg-background p-4 rounded border border-border text-center font-mono text-lg">
                        {paymentDetails.invitation_code}
                      </code>
                      <Button variant="outline" size="icon" onClick={copyInvitationCode} className="ml-2 h-10 w-10">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Conservez ce code précieusement. Vous en aurez besoin pour finaliser votre inscription.
                    </p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Génération de votre code d'invitation en cours... Veuillez patienter ou rafraîchir la page.
                    </p>
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.location.reload()}
                  >
                    Actualiser la page
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => navigate('/signup')}
                  >
                    S'inscrire maintenant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-center text-muted-foreground text-sm pt-4">
                  <p>Un e-mail de confirmation a été envoyé à votre adresse.</p>
                  <p className="mt-2">
                    Besoin d'aide ? Contactez-nous à{' '}
                    <a href="mailto:support@dopecontent.co" className="text-primary hover:underline">
                      support@dopecontent.co
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
