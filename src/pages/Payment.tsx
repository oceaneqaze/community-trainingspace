
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Payment = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locale, setLocale] = useState('fr');
  const [currencyInfo, setCurrencyInfo] = useState({ currency: 'XOF', amount: 15000 });
  
  // Get user's locale on component mount
  useEffect(() => {
    const userLocale = navigator.language || 'fr';
    setLocale(userLocale);
    
    // Determine currency and amount based on locale
    if (userLocale.startsWith('en')) {
      setCurrencyInfo({ currency: 'USD', amount: 25 }); // Approximate conversion
    } else if (userLocale.startsWith('fr-FR') || userLocale.startsWith('fr-BE') || userLocale.startsWith('fr-CH')) {
      setCurrencyInfo({ currency: 'EUR', amount: 23 }); // Approximate conversion
    }
  }, []);
  
  // Function to get currency symbol
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'XOF': return 'FCFA';
      default: return currency;
    }
  };
  
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Get client IP address (for analytics only)
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip || '0.0.0.0';
      
      // Call our Edge Function to create a payment
      const { data, error } = await supabase.functions.invoke('create-lygos-payment', {
        body: { email, locale, ipAddress }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data || !data.paymentUrl) {
        throw new Error('No payment URL received');
      }
      
      // Redirect user to the payment URL
      window.location.href = data.paymentUrl;
      
    } catch (error) {
      console.error('Payment creation error:', error);
      toast({
        title: "Erreur de paiement",
        description: "Impossible de créer le paiement. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="bg-card shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary text-primary-foreground p-6">
          <h1 className="text-3xl font-bold">Accès à DOPE Content</h1>
          <p className="mt-2">La communauté #1 pour créer du contenu avec l'IA</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end border-b pb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Offre à vie</h2>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span>20 vidéos de formation</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span>Base de prompts IA prête à l'emploi</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span>Accès communauté privée Telegram</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span>Mises à jour futures incluses</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 sm:mt-0 text-center sm:text-right">
              <p className="text-sm text-muted-foreground">Prix unique</p>
              <p className="text-3xl font-bold">
                {currencyInfo.amount} {getCurrencySymbol(currencyInfo.currency)}
              </p>
              <p className="text-sm text-muted-foreground">Paiement unique (pas d'abonnement)</p>
            </div>
          </div>
          
          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email (optionnel)
              </label>
              <Input
                type="email"
                id="email"
                placeholder="votreemail@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Nous vous enverrons votre code d'invitation à cette adresse
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement en cours...
                </>
              ) : (
                <>Procéder au paiement</>
              )}
            </Button>
          </form>
          
          <div className="mt-6 border-t pt-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                🔒 Paiement sécurisé via Lygos. Vous serez redirigé vers une page de paiement sécurisée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
