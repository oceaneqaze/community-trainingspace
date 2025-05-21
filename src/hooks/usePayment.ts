
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export const usePayment = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const initiatePayment = async (email?: string) => {
    try {
      setIsProcessing(true);
      
      // Get user's locale and IP for analytics
      const locale = navigator.language || 'fr';
      
      // Get client IP address (if possible)
      let ipAddress = '0.0.0.0';
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
      
      // Call Edge Function to create payment
      const { data, error } = await supabase.functions.invoke('create-lygos-payment', {
        body: { email, locale, ipAddress }
      });
      
      if (error) {
        console.error('Payment invoke error:', error);
        throw new Error(error.message || "Failed to create payment");
      }
      
      if (!data?.paymentUrl) {
        console.error('Payment data:', data);
        throw new Error('No payment URL received from the server');
      }
      
      // Redirect to payment page
      window.location.href = data.paymentUrl;
      
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Erreur de paiement",
        description: error.message || "Une erreur s'est produite lors de la création du paiement",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
    
    return true;
  };
  
  const checkPaymentStatus = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('id, status, invitation_code')
        .eq('lygos_order_id', orderId)
        .single();
        
      if (error) throw error;
      
      return {
        success: data.status === 'completed',
        invitationCode: data.invitation_code,
        paymentId: data.id
      };
    } catch (error) {
      console.error('Error checking payment status:', error);
      return { success: false };
    }
  };
  
  return {
    initiatePayment,
    checkPaymentStatus,
    isProcessing
  };
};

export default usePayment;
