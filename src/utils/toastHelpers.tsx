
import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const showSuccessToast = (title: string, description: string) => {
  toast({
    title,
    description,
    action: <div className="flex items-center">
      <Check className="h-4 w-4 text-green-500 mr-2" />
    </div>
  });
};

export const showErrorToast = (title: string, description: string) => {
  toast({
    title,
    description,
    variant: "destructive",
    action: <div className="flex items-center">
      <AlertCircle className="h-4 w-4 mr-2" />
    </div>
  });
};
