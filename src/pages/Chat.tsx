
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar_url?: string;
  content: string;
  created_at: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<{ id: string; username: string; avatar_url: string; role?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, profile } = useAuth();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(50);

        if (error) {
          throw error;
        }

        if (data) {
          const formattedMessages = data.map(msg => ({
            id: msg.id,
            userId: msg.user_id,
            username: msg.username,
            avatar_url: msg.avatar_url,
            content: msg.content,
            created_at: formatTimestamp(msg.created_at)
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Fetch online users
  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        // In a real application, you would use presence functionality
        // Here we're just fetching all profiles as a placeholder
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(10);

        if (error) {
          throw error;
        }

        if (data) {
          const users = data.map(profile => ({
            id: profile.id,
            username: profile.name || 'Utilisateur',
            avatar_url: profile.avatar_url || 'https://i.pravatar.cc/150?img=8',
            role: profile.role
          }));
          setOnlineUsers(users);
        }
      } catch (error) {
        console.error('Error fetching online users:', error);
      }
    };

    fetchOnlineUsers();
  }, []);

  // Setup realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
        },
        (payload) => {
          const newMsg = payload.new as any;
          const chatMsg: ChatMessage = {
            id: newMsg.id,
            userId: newMsg.user_id,
            username: newMsg.username,
            avatar_url: newMsg.avatar_url,
            content: newMsg.content,
            created_at: formatTimestamp(newMsg.created_at)
          };
          setMessages(prev => [...prev, chatMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTimestamp = (timestamp: string): string => {
    const messageDate = new Date(timestamp);
    const now = new Date();
    
    // For messages from today, show only the time
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // For older messages, include the date
    return messageDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    }) + ' à ' + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !profile) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          username: profile.name || 'Utilisateur',
          content: newMessage,
          avatar_url: profile.avatar_url || null
        });

      if (error) {
        throw error;
      }

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
    }
  };

  const toggleOnlineUsers = () => {
    setShowOnlineUsers(!showOnlineUsers);
  };

  // Function to determine the username color based on role
  const getUsernameColor = (userId: string): string => {
    const userInfo = onlineUsers.find(u => u.id === userId);
    if (userInfo?.role === 'admin') {
      return 'text-red-500';
    }
    return 'text-green-500';
  };

  return (
    <div className="page-container flex flex-col h-[calc(100vh-80px)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chat Communautaire</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleOnlineUsers}
          className="sm:hidden"
        >
          <Users className="h-4 w-4 mr-1" />
          {onlineUsers.length} en ligne
        </Button>
      </div>

      <div className="flex flex-grow gap-4 overflow-hidden">
        <div className="flex-grow flex flex-col border rounded-lg shadow-sm overflow-hidden bg-gray-50">
          <div className="bg-gray-100 p-3 border-b">
            <h2 className="font-semibold">Discussion générale</h2>
            <p className="text-xs text-gray-500">
              Soyez respectueux et bienveillant envers tous les membres
            </p>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                Aucun message pour le moment. Soyez le premier à écrire !
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.avatar_url || 'https://i.pravatar.cc/150?img=8'} alt={message.username} />
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getUsernameColor(message.userId)}`}>
                        {message.username}
                      </span>
                      <span className="text-xs text-gray-500">{message.created_at}</span>
                    </div>
                    <p className="mt-1 text-gray-800 leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-grow"
              />
              <Button type="submit" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        <div className={`w-64 border rounded-lg shadow-sm overflow-hidden bg-white ${showOnlineUsers ? 'block' : 'hidden sm:block'}`}>
          <div className="bg-gray-100 p-3 border-b">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Utilisateurs en ligne</h2>
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                {onlineUsers.length}
              </span>
            </div>
          </div>
          <div className="p-2">
            {onlineUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar_url} alt={user.username} />
                  </Avatar>
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                </div>
                <span className={`text-sm ${user.role === 'admin' ? 'text-red-500 font-medium' : 'text-green-500'}`}>
                  {user.username}
                  {user.role === 'admin' && <span className="ml-1 text-xs">(Admin)</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
