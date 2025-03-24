
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
}

// Mock data for initial chat messages
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'Sophie Martin',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Bonjour tout le monde ! Quelqu\'un a-t-il vu la nouvelle vidéo sur les techniques avancées ?',
    timestamp: '10:30'
  },
  {
    id: '2',
    userId: 'user2',
    username: 'Thomas Dubois',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Oui, je l\'ai regardée hier. Elle est très instructive, surtout la partie sur la résolution de problèmes complexes.',
    timestamp: '10:32'
  },
  {
    id: '3',
    userId: 'user3',
    username: 'Emma Petit',
    avatar: 'https://i.pravatar.cc/150?img=3',
    content: 'Est-ce que quelqu\'un peut recommander une bonne vidéo pour les débutants ?',
    timestamp: '10:35'
  }
];

// Mock data for online users
const onlineUsers = [
  { id: 'user1', username: 'Sophie Martin', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 'user2', username: 'Thomas Dubois', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 'user3', username: 'Emma Petit', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 'user4', username: 'Lucas Bernard', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 'user5', username: 'Léa Dupont', avatar: 'https://i.pravatar.cc/150?img=5' }
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const newMessageObj: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: user.id,
      username: user.displayName || 'Utilisateur',
      avatar: user.photoURL || 'https://i.pravatar.cc/150?img=8',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessageObj]);
    setNewMessage('');
  };

  const toggleOnlineUsers = () => {
    setShowOnlineUsers(!showOnlineUsers);
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
        <div className="flex-grow flex flex-col border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-50 p-3 border-b">
            <h2 className="font-semibold">Discussion générale</h2>
            <p className="text-xs text-gray-500">
              Soyez respectueux et bienveillant envers tous les membres
            </p>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <img src={message.avatar} alt={message.username} />
                </Avatar>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{message.username}</span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="mt-1 text-gray-800">{message.content}</p>
                </div>
              </div>
            ))}
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
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        <div className={`w-64 border rounded-lg shadow-sm overflow-hidden ${showOnlineUsers ? 'block' : 'hidden sm:block'}`}>
          <div className="bg-gray-50 p-3 border-b">
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
                    <img src={user.avatar} alt={user.username} />
                  </Avatar>
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                </div>
                <span className="text-sm">{user.username}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
