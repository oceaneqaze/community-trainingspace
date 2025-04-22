
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { CommentProps } from '@/components/video/CommentItem';

export const useVideoComments = (videoId: string) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const fetchComments = async (id: string) => {
    setLoadingComments(true);
    try {
      const { data: dbComments, error } = await supabase
        .from('video_comments')
        .select('*')
        .eq('video_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedComments: CommentProps[] = await Promise.all(
        (dbComments || []).map(async (comment: any) => {
          let username = "Utilisateur";
          let avatar = "https://i.pravatar.cc/150?img=3";
          if (comment.user_id) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('name, avatar_url')
              .eq('id', comment.user_id)
              .maybeSingle();
            if (profileData) {
              username = profileData.name || username;
              avatar = profileData.avatar_url || avatar;
            }
          }
          return {
            id: comment.id,
            userId: comment.user_id || '',
            username,
            avatar,
            content: comment.content,
            timestamp: comment.created_at
              ? new Date(comment.created_at).toLocaleString('fr-FR', {
                  day: '2-digit', month: '2-digit', year: '2-digit',
                  hour: '2-digit', minute: '2-digit'
                })
              : 'Maintenant',
            likes: 0,
            onLike: () => {},
          };
        })
      );
      setComments(mappedComments);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les commentaires.",
        variant: "destructive",
      });
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async (content: string, user: any) => {
    if (!user || !videoId) {
      toast({
        title: "Non authentifié",
        description: "Veuillez vous connecter pour commenter.",
        variant: "destructive",
      });
      return;
    }
    try {
      const { error } = await supabase
        .from('video_comments')
        .insert({
          video_id: videoId,
          user_id: user.id,
          content,
        });

      if (error) throw error;

      fetchComments(videoId);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le commentaire.",
        variant: "destructive",
      });
    }
  };

  return {
    comments,
    loadingComments,
    fetchComments,
    handleAddComment
  };
};
