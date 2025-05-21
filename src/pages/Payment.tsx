
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, CheckCircle, Shield, CreditCard } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import PaymentHeader from '@/components/payment/PaymentHeader';
import PaymentSecurity from '@/components/payment/PaymentSecurity';
import PaymentTestimonials from '@/components/payment/PaymentTestimonials';
import PaymentFAQ from '@/components/payment/PaymentFAQ';

const Payment = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [locale, setLocale] = useState('fr');
  const [currencyInfo, setCurrencyInfo] = useState({ currency: 'XOF', amount: 15000 });
  
  const form = useForm({
    defaultValues: {
      email: '',
      paymentMethod: 'mobile',
    },
  });
  
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
  
  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      
      // Get client IP address (for analytics only)
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip || '0.0.0.0';
      
      // Call our Edge Function to create a payment
      const { data, error } = await supabase.functions.invoke('create-lygos-payment', {
        body: { 
          email: values.email, 
          locale, 
          ipAddress,
          paymentMethod: values.paymentMethod
        }
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
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-10">
      <PaymentHeader />
      
      <div className="container max-w-6xl py-8 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Product Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">Accédez à la communauté DOPE Content</h1>
              <p className="text-muted-foreground">
                Automatisez votre création de contenu avec l'IA et développez votre business en ligne.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border/50 shadow-sm space-y-4 animate-fade-in">
                <h2 className="text-xl font-semibold flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  Ce que vous recevez
                </h2>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-primary mr-2">✓</span>
                    <span>20 vidéos de formation (système complet DOPE Content)</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">✓</span>
                    <span>Base de prompts prête à l'emploi (copywriting, storytelling)</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">✓</span>
                    <span>Accès à la communauté privée Telegram</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">✓</span>
                    <span>Mises à jour futures incluses (à vie)</span>
                  </li>
                </ul>
                
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm font-medium text-yellow-500">
                    🔒 Accès à vie pour un paiement unique de {currencyInfo.amount} {getCurrencySymbol(currencyInfo.currency)}
                  </p>
                </div>
              </div>
            </div>
            
            <PaymentTestimonials />
            <PaymentFAQ />
          </div>
          
          {/* Right column - Payment Form */}
          <div>
            <div className="bg-card rounded-xl border border-border shadow-lg p-6 animate-scale-in">
              <h2 className="text-xl font-semibold mb-6">Finaliser votre commande</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (pour recevoir votre code d'accès)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="votreemail@exemple.com" 
                            type="email"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Nous vous enverrons votre code d'invitation à cette adresse
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Méthode de paiement</FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div 
                            className={`border rounded-lg p-4 cursor-pointer transition-all flex items-center gap-3 ${field.value === 'mobile' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                            onClick={() => form.setValue('paymentMethod', 'mobile')}
                          >
                            <div className="rounded-full bg-primary/10 p-2">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Mobile Money</p>
                              <p className="text-xs text-muted-foreground">Orange, MTN, Wave</p>
                            </div>
                          </div>
                          
                          <div 
                            className={`border rounded-lg p-4 cursor-pointer transition-all flex items-center gap-3 ${field.value === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                            onClick={() => form.setValue('paymentMethod', 'card')}
                          >
                            <div className="rounded-full bg-primary/10 p-2">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Carte bancaire</p>
                              <p className="text-xs text-muted-foreground">Visa, Mastercard</p>
                            </div>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="py-3 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted-foreground">Prix</span>
                      <span>{currencyInfo.amount} {getCurrencySymbol(currencyInfo.currency)}</span>
                    </div>
                    <div className="flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span className="text-lg">{currencyInfo.amount} {getCurrencySymbol(currencyInfo.currency)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Traitement en cours...
                      </>
                    ) : (
                      <>Payer maintenant</>
                    )}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6">
                <PaymentSecurity />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
