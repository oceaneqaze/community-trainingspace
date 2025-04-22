
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import EbookList from '@/components/ebooks/EbookList';
import EbookUploader from '@/components/ebooks/EbookUploader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Book } from 'lucide-react';

const Ebooks = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="container mx-auto py-6">
      <Card className="bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-primary" />
              <CardTitle>Bibliothèque de documents</CardTitle>
            </div>
            {isAdmin() && <EbookUploader />}
          </div>
        </CardHeader>
        <CardContent>
          <EbookList />
        </CardContent>
      </Card>
    </div>
  );
};

export default Ebooks;
