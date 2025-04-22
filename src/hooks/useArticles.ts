
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export const useArticles = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createArticle = async (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .insert(article)
        .select()
        .single();

      if (error) throw error;
      toast({ title: "Article créé avec succès" });
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'article",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Article mis à jour avec succès" });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'article:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'article",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Article supprimé avec succès" });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createArticle,
    updateArticle,
    deleteArticle
  };
};
