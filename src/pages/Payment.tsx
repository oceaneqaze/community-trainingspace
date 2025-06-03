import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import ModernBackground from '@/components/ui/modern-background';
import ModernPaymentHeader from '@/components/payment/ModernPaymentHeader';
import ModernFeatureCard from '@/components/payment/ModernFeatureCard';
import ModernPaymentForm from '@/components/payment/ModernPaymentForm';
import { Loader2, CheckCircle, Shield, CreditCard, Zap, Rocket } from 'lucide-react';
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
    <ModernBackground variant="intense">
      <ModernPaymentHeader />
      
      <div className="container max-w-7xl py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column - Product Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 mb-6">
                <span className="text-2xl">⚡</span>
                <span className="text-sm font-medium text-purple-300">Automatisation Business IA</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Rejoins DOPE Content
                <br />
                <span className="text-gradient-multi">L'automatisation qui rapporte</span>
              </h1>
              
              <p className="text-gray-300 text-xl leading-relaxed">
                La communauté qui te forme à automatiser, optimiser, et scaler ton business grâce à l'intelligence artificielle.
              </p>
            </div>
            
            <ModernFeatureCard />
            
            {/* Additional content cards with modern styling */}
            {/* ... keep existing code (testimonials, FAQ) but style them with ModernCard */}
          </div>
          
          {/* Right column - Payment Form */}
          <div className="lg:sticky lg:top-8">
            <ModernPaymentForm 
              onSubmit={onSubmit}
              isLoading={isLoading}
              currencyInfo={currencyInfo}
            />
            
            <div className="mt-8">
              <PaymentSecurity />
            </div>
          </div>
        </div>
      </div>
    </ModernBackground>
  );
};

export default Payment;
