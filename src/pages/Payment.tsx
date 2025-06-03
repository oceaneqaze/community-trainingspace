
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, CheckCircle, Shield, CreditCard, Zap, Rocket } from 'lucide-react';
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Automatisation Business IA</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                Rejoins DOPE Content
                <br />
                <span className="text-primary">L'automatisation qui rapporte</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                La communauté qui te forme à automatiser, optimiser, et scaler ton business grâce à l'intelligence artificielle.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border/50 shadow-sm space-y-4 animate-fade-in">
                <h2 className="text-xl font-semibold flex items-center">
                  <Rocket className="h-5 w-5 mr-2 text-primary" />
                  Ce que tu reçois immédiatement
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">🌊</span>
                    <span><strong>Le Hub DOPE :</strong> base de connaissances IA + automatisation complète</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">🏋️</span>
                    <span><strong>Templates IA :</strong> prompts pour contenus, relances, closing, funnels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">📖</span>
                    <span><strong>Fiches pratiques :</strong> "que faire" + "comment faire" pour chaque outil</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">🕊️</span>
                    <span><strong>Communauté privée :</strong> support + retours d'expérience en temps réel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">📲</span>
                    <span><strong>Mises à jour continues :</strong> nouvelles ressources chaque semaine</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-primary/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-bold text-green-700">Garantie à vie</span>
                  </div>
                  <p className="text-sm">
                    🔒 Un seul paiement de {currencyInfo.amount} {getCurrencySymbol(currencyInfo.currency)} • Accès permanent • Toutes les mises à jour incluses
                  </p>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-700 mb-2">🚀 En 4 semaines, tu peux :</h3>
                <ul className="text-sm space-y-1 text-yellow-600">
                  <li>• Avoir un funnel automatisé complet</li>
                  <li>• Gérer ton SAV avec un chatbot IA</li>
                  <li>• Automatiser ta création de contenu</li>
                  <li>• Closer des ventes en dormant</li>
                </ul>
              </div>
            </div>
            
            <PaymentTestimonials />
            <PaymentFAQ />
          </div>
          
          {/* Right column - Payment Form */}
          <div>
            <div className="bg-card rounded-xl border border-border shadow-lg p-6 animate-scale-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Accès immédiat à DOPE Content</h2>
                <p className="text-sm text-muted-foreground">Rejoins les entrepreneurs qui automatisent leur business</p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (pour recevoir ton accès)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="ton@email.com" 
                            type="email"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Tu recevras ton code d'accès privé immédiatement
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
                  
                  <div className="py-4 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted-foreground">DOPE Content (accès à vie)</span>
                      <span className="font-medium">{currencyInfo.amount} {getCurrencySymbol(currencyInfo.currency)}</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{currencyInfo.amount} {getCurrencySymbol(currencyInfo.currency)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Paiement unique • Pas d'abonnement • Accès permanent</p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-base font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirection en cours...
                      </>
                    ) : (
                      <>🚀 Obtenir mon accès maintenant</>
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
