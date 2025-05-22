
import React, { useState } from 'react';
import { useEbooks } from '@/hooks/useEbooks';
import EbookCard from './EbookCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Search, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const EbookList = () => {
  const { ebooks, isLoading } = useEbooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extraire les catégories uniques des ebooks
  const categories = [...new Set(ebooks.map(ebook => ebook.category).filter(Boolean))];
  
  // Filtrer les ebooks en fonction de la recherche et de la catégorie sélectionnée
  const filteredEbooks = ebooks.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (ebook.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    const matchesCategory = selectedCategory ? ebook.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10 rounded-full border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm"
            placeholder="Rechercher un document..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <button
            className={`px-4 py-2 text-sm rounded-full transition-colors whitespace-nowrap ${
              selectedCategory === null 
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' 
                : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            Tous
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 text-sm rounded-full transition-colors whitespace-nowrap ${
                selectedCategory === category 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' 
                  : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {filteredEbooks.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredEbooks.map((ebook, index) => (
            <motion.div
              key={ebook.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <EbookCard ebook={ebook} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Alert className="bg-zinc-50/70 dark:bg-zinc-900/70 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 rounded-xl">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <AlertDescription>
            Aucun document ne correspond à votre recherche.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EbookList;
