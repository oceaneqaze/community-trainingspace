
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CreditCard, Smartphone } from 'lucide-react';
import ModernCard from '@/components/ui/modern-card';
import ModernButton from '@/components/ui/modern-button';

interface ModernPaymentFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  currencyInfo: { currency: string; amount: number };
}

const ModernPaymentForm: React.FC<ModernPaymentFormProps> = ({
  onSubmit,
  isLoading,
  currencyInfo
}) => {
  const form = useForm({
    defaultValues: {
      email: '',
      paymentMethod: 'mobile',
    },
  });

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'XOF': return 'FCFA';
      default: return currency;
    }
  };

  return (
    <ModernCard variant="glass" className="p-8 animate-fade-in" glow="purple">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-3 text-gradient-multi">
          Accès immédiat à DOPE Content
        </h2>
        <p className="text-gray-300">
          Rejoins les entrepreneurs qui automatisent leur business
        </p>
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label className="text-white font-medium">
            Email (pour recevoir ton accès)
          </Label>
          <Input 
            {...form.register('email')}
            placeholder="ton@email.com" 
            type="email"
            className="modern-input"
          />
          <p className="text-sm text-gray-400">
            Tu recevras ton code d'accès privé immédiatement
          </p>
        </div>
        
        <div className="space-y-4">
          <Label className="text-white font-medium">Méthode de paiement</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ModernCard 
              variant="solid" 
              hover={false}
              className={`p-4 cursor-pointer transition-all ${
                form.watch('paymentMethod') === 'mobile' 
                  ? 'border-purple-400 bg-purple-900/20 glow-purple' 
                  : 'hover:border-purple-500/50'
              }`}
              onClick={() => form.setValue('paymentMethod', 'mobile')}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Mobile Money</p>
                  <p className="text-xs text-gray-400">Orange, MTN, Wave</p>
                </div>
              </div>
            </ModernCard>
            
            <ModernCard 
              variant="solid" 
              hover={false}
              className={`p-4 cursor-pointer transition-all ${
                form.watch('paymentMethod') === 'card' 
                  ? 'border-purple-400 bg-purple-900/20 glow-purple' 
                  : 'hover:border-purple-500/50'
              }`}
              onClick={() => form.setValue('paymentMethod', 'card')}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-2">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Carte bancaire</p>
                  <p className="text-xs text-gray-400">Visa, Mastercard</p>
                </div>
              </div>
            </ModernCard>
          </div>
        </div>
        
        <div className="py-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300">DOPE Content (accès à vie)</span>
            <span className="font-medium text-white">
              {currencyInfo.amount} {getCurrencySymbol(currencyInfo.currency)}
            </span>
          </div>
          <div className="flex items-center justify-between text-xl font-bold">
            <span className="text-white">Total</span>
            <span className="text-gradient-purple">
              {currencyInfo.amount} {getCurrencySymbol(currencyInfo.currency)}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Paiement unique • Pas d'abonnement • Accès permanent
          </p>
        </div>
        
        <ModernButton 
          type="submit" 
          className="w-full py-6 text-lg font-medium"
          disabled={isLoading}
          glow={!isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Redirection en cours...
            </>
          ) : (
            <>🚀 Obtenir mon accès maintenant</>
          )}
        </ModernButton>
      </form>
    </ModernCard>
  );
};

export default ModernPaymentForm;
