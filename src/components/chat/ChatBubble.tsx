
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
  avatar_url?: string;
}

const ChatBubble: React.FC = () => {
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [lastMessage, setLastMessage] = useState<Message | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fonction pour récupérer le dernier message
  useEffect(() => {
    if (!user) return;

    // Récupère le dernier message
    const fetchLastMessage = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setLastMessage(data[0]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du dernier message:', error);
      }
    };

    fetchLastMessage();

    // Écouter les nouveaux messages en temps réel
    const channel = (supabase as any)
      .channel('public:chat_messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages' 
      }, (payload: { new: Message }) => {
        // Ne pas compter les messages de l'utilisateur actuel
        if (payload.new.user_id !== user.id) {
          setUnreadMessages(prev => prev + 1);
          setLastMessage(payload.new);
          if (!isExpanded) {
            // Afficher le preview pendant quelques secondes
            setIsExpanded(true);
            setTimeout(() => {
              if (!document.hasFocus()) {
                setIsExpanded(false);
              }
            }, 5000);
          }
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isExpanded]);

  const handleBubbleClick = () => {
    if (isExpanded) {
      navigate('/chat');
      setUnreadMessages(0);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  // Format le contenu du message (limite la longueur)
  const formatContent = (content: string) => {
    return content.length > 30 ? content.substring(0, 30) + '...' : content;
  };

  // Format le temps (affiche uniquement l'heure)
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isExpanded && lastMessage && (
          <motion.div 
            className="mb-3 bg-background border border-border rounded-lg shadow-lg w-72 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center p-3 bg-primary/10">
              <h4 className="font-semibold text-sm">Message récent</h4>
              <X 
                className="h-4 w-4 cursor-pointer hover:text-primary" 
                onClick={handleClose}
              />
            </div>
            <div className="p-3 cursor-pointer" onClick={handleBubbleClick}>
              <div className="flex items-start space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={lastMessage.avatar_url} />
                  <AvatarFallback>
                    {lastMessage.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-medium text-primary">
                      {lastMessage.username}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(lastMessage.created_at)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatContent(lastMessage.content)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-14 h-14 shadow-lg hover:bg-primary/90 transition-colors relative"
        whileTap={{ scale: 0.9 }}
        onClick={handleBubbleClick}
      >
        <MessageCircle className="h-7 w-7" />
        {unreadMessages > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.5rem] h-6"
          >
            {unreadMessages}
          </Badge>
        )}
      </motion.button>
    </div>
  );
};

export default ChatBubble;
