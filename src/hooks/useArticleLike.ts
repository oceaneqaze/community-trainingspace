
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const useArticleLike = (articleId: string) => {
  const [likesCount, setLikesCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Vérifier l'utilisateur actuel
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setCurrentUser(data.user.id);
      }
    };
    
    checkUser();
  }, []);

  // Récupérer le nombre de likes et vérifier si l'utilisateur a déjà liké
  useEffect(() => {
    const fetchLikes = async () => {
      if (!articleId) return;
      
      try {
        setIsLoading(true);
        
        // Récupérer le nombre total de likes
        const { count, error: countError } = await supabase
          .from('article_likes')
          .select('*', { count: 'exact', head: false })
          .eq('article_id', articleId);

        if (countError) throw countError;
        setLikesCount(count || 0);

        // Vérifier si l'utilisateur actuel a liké
        if (currentUser) {
          const { data: likeData, error: likeError } = await supabase
            .from('article_likes')
            .select('*')
            .eq('article_id', articleId)
            .eq('user_id', currentUser)
            .single();

          if (likeError && likeError.code !== 'PGRST116') { // Pas de résultat trouvé
            throw likeError;
          }
          
          setIsLiked(!!likeData);
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikes();
  }, [articleId, currentUser]);

  // Fonction pour aimer/ne plus aimer un article
  const toggleLike = async () => {
    if (!currentUser) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour aimer cet article",
        variant: "destructive"
      });
      return;
    }

    try {
      if (isLiked) {
        // Supprimer le like
        const { error } = await supabase
          .from('article_likes')
          .delete()
          .eq('article_id', articleId)
          .eq('user_id', currentUser);

        if (error) throw error;
        setIsLiked(false);
        setLikesCount(prev => Math.max(0, prev - 1));
      } else {
        // Ajouter un like
        const { error } = await supabase
          .from('article_likes')
          .insert({
            article_id: articleId,
            user_id: currentUser
          });

        if (error) throw error;
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive"
      });
    }
  };

  return { likesCount, isLiked, toggleLike, isLoading, isAuthenticated: !!currentUser };
};
