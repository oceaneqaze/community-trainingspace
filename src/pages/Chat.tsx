
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Interface for our chat message type
interface ChatMessage {
  id: string;
  user_id: string;
  username: string;
  content: string;
  avatar_url?: string;
  created_at: string;
}

// Interface for our user type from profiles table
interface UserProfile {
  id: string;
  name: string;
  role?: string;
  avatar_url?: string;
}

const Chat = () => {
  const { user, isAdmin } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>({});

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        
        // Use any here to bypass TypeScript checking since the table was just created
        // and TypeScript doesn't know about it yet
        const { data, error } = await (supabase as any)
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        
        setMessages(data || []);
        
        // Collect all unique user IDs
        const userIds = [...new Set(data.map((message: ChatMessage) => message.user_id))];
        await fetchUserProfiles(userIds);
      } catch (error: any) {
        console.error('Error fetching messages:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les messages.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    // Set up realtime subscription
    const channel = (supabase as any)
      .channel('public:chat_messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages' 
      }, (payload: { new: ChatMessage }) => {
        setMessages(prev => [...prev, payload.new]);
        
        // Fetch user profile if not already in state
        if (!userProfiles[payload.new.user_id]) {
          fetchUserProfiles([payload.new.user_id]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fetch user profiles
  const fetchUserProfiles = async (userIds: string[]) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, role, avatar_url')
        .in('id', userIds);
      
      if (error) throw error;
      
      // Create a map of user profiles by ID
      const profileMap = (data || []).reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {} as Record<string, UserProfile>);
      
      setUserProfiles(prev => ({ ...prev, ...profileMap }));
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !user) return;
    
    try {
      setIsSending(true);
      
      // Use any to bypass TypeScript type checking
      const { error } = await (supabase as any)
        .from('chat_messages')
        .insert({
          user_id: user.id,
          username: user.user_metadata.name || user.email,
          content: message.trim(),
          avatar_url: user.user_metadata.avatar_url,
        });
      
      if (error) throw error;
      
      setMessage('');
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  // Determine if the message is from the current user
  const isCurrentUser = (userId: string) => {
    return user?.id === userId;
  };

  // Determine user role color
  const getUsernameColor = (userId: string) => {
    const profile = userProfiles[userId];
    if (profile?.role === 'admin') {
      return 'text-red-500 font-medium';
    }
    return 'text-green-500 font-medium';
  };

  return (
    <div className="page-container">
      <h1 className="text-4xl font-bold text-center sm:text-left mb-8">Chat</h1>
      
      <div className="flex flex-col w-full max-w-4xl mx-auto bg-card rounded-lg shadow-md overflow-hidden border border-border">
        <div className="bg-muted p-4 border-b border-border">
          <h2 className="text-xl font-semibold">Discussion en direct</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 h-[60vh]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Chargement des messages...</span>
            </div>
          ) : messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${isCurrentUser(msg.user_id) ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      isCurrentUser(msg.user_id) 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-muted text-muted-foreground rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage 
                          src={msg.avatar_url || userProfiles[msg.user_id]?.avatar_url} 
                          alt={msg.username} 
                        />
                        <AvatarFallback>
                          {msg.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className={getUsernameColor(msg.user_id)}>
                        {userProfiles[msg.user_id]?.name || msg.username}
                      </span>
                      <span className="text-xs opacity-70">{formatTime(msg.created_at)}</span>
                    </div>
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Aucun message. Soyez le premier à écrire !
            </div>
          )}
        </div>
        
        <form 
          onSubmit={handleSendMessage} 
          className="p-4 border-t border-border flex items-center space-x-2"
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            disabled={isSending || !user}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isSending || !message.trim() || !user}
            className="shrink-0"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="ml-2">Envoyer</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
