
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, profile, isAuthenticated, refreshProfile } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [isAuthenticated, profile, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          name,
          email,
          avatar_url: avatarUrl,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      await refreshProfile();
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour du profil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="page-container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center sm:text-left">Mon Profil</h1>
      
      <div className="bg-card rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 mb-4">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={name} />
            ) : (
              <AvatarFallback className="text-xl">
                {name ? getInitials(name) : '?'}
              </AvatarFallback>
            )}
          </Avatar>
          
          <h2 className="text-2xl font-semibold">{name || 'Utilisateur'}</h2>
          <p className="text-muted-foreground">{email}</p>
        </div>
        
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="avatar_url">URL de l'avatar (optionnel)</Label>
            <Input
              id="avatar_url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mise à jour...
              </>
            ) : (
              'Mettre à jour le profil'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
