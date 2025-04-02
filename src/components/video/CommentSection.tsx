
import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CommentItem, { CommentProps } from './CommentItem';

interface CommentSectionProps {
  comments: CommentProps[];
  onAddComment: (content: string) => void;
  onLikeComment: (commentId: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  comments, 
  onAddComment, 
  onLikeComment 
}) => {
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(newComment);
    setNewComment('');
    
    toast({
      title: "Commentaire ajouté",
      description: "Votre commentaire a été publié avec succès.",
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold flex items-center">
        <MessageCircle className="h-5 w-5 mr-2" />
        Commentaires ({comments.length})
      </h2>

      <form onSubmit={handleSubmitComment} className="mt-4 flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="flex-grow"
        />
        <Button type="submit" size="sm">
          <Send className="h-4 w-4 mr-1" />
          Envoyer
        </Button>
      </form>

      <div className="mt-6 space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            {...comment}
            onLike={onLikeComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
