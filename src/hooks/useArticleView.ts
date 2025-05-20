
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

// Créer ou récupérer un ID de session pour le visiteur
const getSessionId = () => {
  let sessionId = localStorage.getItem('blog_session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('blog_session_id', sessionId);
  }
  return sessionId;
};

export const useArticleView = (articleId: string) => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Récupérer le compte de vues actuel
  const fetchViewCount = async () => {
    try {
      const { count, error } = await supabase
        .from('article_views')
        .select('*', { count: 'exact', head: false })
        .eq('article_id', articleId);

      if (error) throw error;
      setViewCount(count || 0);
    } catch (error) {
      console.error('Error fetching view count:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Enregistrer une nouvelle vue
  const registerView = async () => {
    try {
      const sessionId = getSessionId();
      const { error } = await supabase.from('article_views').insert({
        article_id: articleId,
        session_id: sessionId,
        user_id: (await supabase.auth.getUser()).data.user?.id
      });

      if (error && error.code !== '23505') {  // Ignorer l'erreur unique constraint
        throw error;
      }

      // Actualiser le compte après l'enregistrement
      await fetchViewCount();
    } catch (error) {
      console.error('Error registering view:', error);
    }
  };

  // Enregistrer la vue lors du chargement de la page
  useEffect(() => {
    if (articleId) {
      fetchViewCount();
      registerView();
    }
  }, [articleId]);

  return { viewCount, isLoading };
};
