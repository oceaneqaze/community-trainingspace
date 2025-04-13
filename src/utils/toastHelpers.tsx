
import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const showSuccessToast = (title: string, description: string) => {
  toast({
    title,
    description,
    icon: <Check className="h-4 w-4 text-green-500" />
  });
};

export const showErrorToast = (title: string, description: string) => {
  toast({
    title,
    description,
    variant: "destructive",
    icon: <AlertCircle className="h-4 w-4" />
  });
};
