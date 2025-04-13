
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Mail, Plus, RefreshCw, Search, UserPlus, Link as LinkIcon, Copy, Check, Filter } from 'lucide-react';

type InvitationUser = {
  id: string;
  name: string;
  email?: string;
  invitation_code?: string;
  invitation_used?: boolean;
  created_at?: string;
};

const InvitationManager = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<InvitationUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<InvitationUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedUser, setSelectedUser] = useState<InvitationUser | null>(null);
  const [isInvitationDialogOpen, setIsInvitationDialogOpen] = useState(false);
  const [invitationLink, setInvitationLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [showUsed, setShowUsed] = useState(true);
  const [showUnused, setShowUnused] = useState(true);
  const [showPending, setShowPending] = useState(true);

  // Check if user is authenticated and admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!isAdmin()) {
      navigate('/videos');
      toast({
        title: "Accès refusé",
        description: "Vous devez être administrateur pour accéder à cette page.",
        variant: "destructive",
      });
    } else {
      fetchUsers();
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Fetch all users from the database
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, invitation_code, invitation_used, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      console.log("Fetched users:", data);
      setUsers(data || []);
      applyFilters(data || [], searchQuery);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des utilisateurs.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search and filtering
  useEffect(() => {
    applyFilters(users, searchQuery);
  }, [searchQuery, showUsed, showUnused, showPending, users]);

  const applyFilters = (userList: InvitationUser[], query: string) => {
    let filtered = userList;

    // Apply invitation status filter
    filtered = filtered.filter(user => {
      if (user.invitation_code) {
        // Has an invitation code
        if (user.invitation_used && !showUsed) return false;
        if (!user.invitation_used && !showUnused) return false;
      } else {
        // No invitation code yet
        if (!showPending) return false;
      }
      return true;
    });

    // Apply search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        user => user.name.toLowerCase().includes(lowerQuery) || 
                (user.email && user.email.toLowerCase().includes(lowerQuery))
      );
    }

    setFilteredUsers(filtered);
  };

  const generateInvitationLink = async (user: InvitationUser) => {
    try {
      setIsGenerating(true);
      setSelectedUser(user);
      
      console.log("Generating invitation for user:", user.id);
      
      // Call the Supabase function to generate a new invitation code
      const { data, error } = await supabase
        .rpc('generate_invitation_code', { user_id: user.id });
      
      if (error) {
        console.error("Error from RPC:", error);
        throw error;
      }
      
      console.log("Invitation code generated:", data);
      
      // Create the full invitation link
      const baseUrl = window.location.origin;
      const inviteLink = `${baseUrl}/invitation/${data}`;
      
      console.log("Full invitation link:", inviteLink);
      
      setInvitationLink(inviteLink);
      setIsInvitationDialogOpen(true);
      
      // Update local data
      fetchUsers();
      
      toast({
        title: "Lien d'invitation généré",
        description: "Le lien d'invitation a été généré avec succès.",
      });
    } catch (error: any) {
      console.error('Error generating invitation link:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de générer le lien d'invitation",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(invitationLink);
    setIsCopied(true);
    
    toast({
      title: "Lien copié",
      description: "Le lien d'invitation a été copié dans le presse-papier.",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendEmail = () => {
    if (!selectedUser?.email) return;
    
    const subject = encodeURIComponent("Votre invitation à Dope Content");
    const body = encodeURIComponent(
      `Vous avez été invité à rejoindre notre plateforme.\n\nVoici votre lien d'invitation: ${invitationLink}`
    );
    
    window.open(`mailto:${selectedUser.email}?subject=${subject}&body=${body}`);
    
    toast({
      title: "Email préparé",
      description: "L'email avec le lien d'invitation a été préparé.",
    });
  };

  const handleCreateUser = async () => {
    if (!inviteName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom est requis.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a new user profile
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          { 
            name: inviteName.trim(),
            email: inviteEmail.trim() || null,
            role: 'member'
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Utilisateur créé",
        description: "Le nouvel utilisateur a été créé avec succès.",
      });

      setIsNewUserDialogOpen(false);
      setInviteName('');
      setInviteEmail('');
      
      // Generate invitation for the new user
      if (data) {
        await generateInvitationLink(data);
      }
      
      // Refresh user list
      fetchUsers();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer l'utilisateur",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (user: InvitationUser) => {
    if (!user.invitation_code) {
      return <Badge variant="outline" className="bg-muted text-muted-foreground">Non invité</Badge>;
    }
    
    if (user.invitation_used) {
      return <Badge variant="outline" className="bg-green-800/30 text-green-500">Utilisée</Badge>;
    }
    
    return <Badge variant="outline" className="bg-blue-800/30 text-blue-500">En attente</Badge>;
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Gestion des invitations</h1>
        <Button onClick={() => setIsNewUserDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nouveau membre
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Liste des invitations</CardTitle>
          <CardDescription>
            Gérez les invitations des utilisateurs et générez des liens d'invitation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-4 justify-between">
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un utilisateur..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={showPending ? "default" : "outline"}
                size="sm"
                className="gap-1"
                onClick={() => setShowPending(!showPending)}
              >
                <Filter className="h-3.5 w-3.5" />
                Non invités
              </Button>
              <Button
                variant={showUnused ? "default" : "outline"}
                size="sm"
                className="gap-1"
                onClick={() => setShowUnused(!showUnused)}
              >
                <Filter className="h-3.5 w-3.5" />
                En attente
              </Button>
              <Button
                variant={showUsed ? "default" : "outline"}
                size="sm"
                className="gap-1"
                onClick={() => setShowUsed(!showUsed)}
              >
                <Filter className="h-3.5 w-3.5" />
                Utilisées
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={fetchUsers}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Actualiser
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Statut d'invitation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        <p className="mt-2 text-muted-foreground">Chargement des utilisateurs...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email || '-'}</TableCell>
                      <TableCell>{getStatusBadge(user)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant={user.invitation_code && !user.invitation_used ? "secondary" : "outline"} 
                          size="sm"
                          disabled={isGenerating || Boolean(user.invitation_used)}
                          onClick={() => generateInvitationLink(user)}
                        >
                          {user.invitation_code && !user.invitation_used ? (
                            <>
                              <RefreshCw className="mr-1 h-4 w-4" />
                              Régénérer
                            </>
                          ) : user.invitation_used ? (
                            <>
                              <Check className="mr-1 h-4 w-4" />
                              Utilisée
                            </>
                          ) : (
                            <>
                              <LinkIcon className="mr-1 h-4 w-4" />
                              Inviter
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="p-8 text-center">
                      <p className="text-muted-foreground">Aucun utilisateur trouvé.</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Invitation dialog */}
      <Dialog open={isInvitationDialogOpen} onOpenChange={setIsInvitationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invitation pour {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Copiez le lien d'invitation ou envoyez-le par email.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-secondary/30 p-3 rounded-md">
              <p className="text-sm mb-2 font-medium">Lien d'invitation généré:</p>
              <div className="flex items-center space-x-2">
                <Input
                  value={invitationLink}
                  readOnly
                  className="flex-1"
                />
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={copyToClipboard}
                  title={isCopied ? "Copié !" : "Copier le lien"}
                >
                  {isCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            {selectedUser?.email && (
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={handleSendEmail}
              >
                <Mail className="mr-2 h-4 w-4" />
                Envoyer par email
              </Button>
            )}
          </div>
          <DialogFooter className="sm:justify-end">
            <Button 
              variant="outline"
              onClick={() => setIsInvitationDialogOpen(false)}
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New user dialog */}
      <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau membre</DialogTitle>
            <DialogDescription>
              Créez un utilisateur et générez un lien d'invitation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nom *
              </label>
              <Input
                id="name"
                placeholder="Nom du membre"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email (optionnel)
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email du membre"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                L'email est nécessaire pour envoyer l'invitation directement.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewUserDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateUser}>
              <Plus className="mr-2 h-4 w-4" />
              Créer et inviter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvitationManager;
