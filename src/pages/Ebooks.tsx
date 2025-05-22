
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import EbookList from '@/components/ebooks/EbookList';
import EbookUploader from '@/components/ebooks/EbookUploader';
import { Card, CardContent } from '@/components/ui/card';
import { Library } from 'lucide-react';
import { motion } from 'framer-motion';

const Ebooks = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Library className="h-10 w-10 text-zinc-900 dark:text-white mr-3" />
            <h1 className="text-3xl font-medium">Bibliothèque</h1>
          </div>
          {isAdmin() && <EbookUploader />}
        </div>
        <p className="mt-2 text-muted-foreground max-w-3xl">
          Accédez à notre collection de documents, guides et ressources. Tous les documents sont disponibles en téléchargement.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50"
      >
        <CardContent className="p-6">
          <EbookList />
        </CardContent>
      </motion.div>
    </div>
  );
};

export default Ebooks;
