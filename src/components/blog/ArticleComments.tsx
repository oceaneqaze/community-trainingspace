
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { MessageSquare, Send, Trash } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArticleComment, useArticleComments } from '@/hooks/useArticleComments';

interface ArticleCommentsProps {
  articleId: string;
}

const ArticleComments: React.FC<ArticleCommentsProps> = ({ articleId }) => {
  const { 
    comments, 
    isLoading, 
    addComment, 
    deleteComment, 
    isAuthenticated,
    currentUserId 
  } = useArticleComments(articleId);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComment(newComment);
    setNewComment('');
  };

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center">
        <MessageSquare className="h-5 w-5 mr-2" />
        <h3 className="text-2xl font-bold">Commentaires ({comments.length})</h3>
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea 
            placeholder="Partagez votre opinion..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" className="flex items-center gap-2">
            <Send size={16} />
            Publier
          </Button>
        </form>
      ) : (
        <div className="bg-muted p-4 rounded-lg text-center">
          Connectez-vous pour laisser un commentaire
        </div>
      )}

      <div className="space-y-6 mt-8">
        {isLoading ? (
          <p>Chargement des commentaires...</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Aucun commentaire pour le moment. Soyez le premier à commenter !
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    {comment.avatar_url ? <img src={comment.avatar_url} alt={comment.username} /> : null}
                  </Avatar>
                  <span className="font-medium">{comment.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {formatDistance(new Date(comment.created_at), new Date(), {
                      addSuffix: true,
                      locale: fr
                    })}
                  </span>
                  {currentUserId === comment.user_id && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteComment(comment.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash size={16} />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleComments;
