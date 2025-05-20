
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface ArticleComment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  username?: string;
  avatar_url?: string;
}

export const useArticleComments = (articleId: string) => {
  const [comments, setComments] = useState<ArticleComment[]>([]);
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

  // Récupérer les commentaires
  const fetchComments = async () => {
    if (!articleId) return;
    
    try {
      setIsLoading(true);
      
      // Récupérer les commentaires avec les informations utilisateur
      const { data, error } = await supabase
        .from('article_comments')
        .select(`
          id,
          content,
          created_at,
          user_id,
          profiles:user_id (
            name,
            avatar_url
          )
        `)
        .eq('article_id', articleId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transformer les données pour inclure le nom et l'avatar
      const transformedComments = data.map(comment => ({
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        user_id: comment.user_id,
        username: comment.profiles?.name || 'Utilisateur anonyme',
        avatar_url: comment.profiles?.avatar_url || ''
      }));

      setComments(transformedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les commentaires au chargement
  useEffect(() => {
    fetchComments();
  }, [articleId]);

  // Ajouter un commentaire
  const addComment = async (content: string) => {
    if (!currentUser) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour commenter",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Commentaire vide",
        description: "Veuillez écrire un commentaire",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('article_comments')
        .insert({
          article_id: articleId,
          user_id: currentUser,
          content
        });

      if (error) throw error;
      
      toast({
        title: "Commentaire ajouté",
        description: "Votre commentaire a été publié",
      });
      
      // Actualiser les commentaires
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter votre commentaire",
        variant: "destructive"
      });
    }
  };

  // Supprimer un commentaire
  const deleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('article_comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', currentUser);

      if (error) throw error;
      
      toast({
        title: "Commentaire supprimé",
      });
      
      // Actualiser la liste
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer ce commentaire",
        variant: "destructive"
      });
    }
  };

  return { 
    comments, 
    commentsCount: comments.length, 
    isLoading, 
    addComment, 
    deleteComment, 
    isAuthenticated: !!currentUser,
    currentUserId: currentUser
  };
};
