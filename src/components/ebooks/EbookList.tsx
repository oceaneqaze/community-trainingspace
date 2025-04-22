
import React from 'react';
import { useEbooks } from '@/hooks/useEbooks';
import EbookCard from './EbookCard';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EbookList = () => {
  const { ebooks, isLoading } = useEbooks();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!ebooks.length) {
    return (
      <Alert>
        <AlertDescription>
          Aucun document n'est disponible pour le moment.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ebooks.map((ebook) => (
        <EbookCard key={ebook.id} ebook={ebook} />
      ))}
    </div>
  );
};

export default EbookList;
