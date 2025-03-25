import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Search, Trash2, CheckCircle, XCircle, MoreHorizontal, Ban, AlertTriangle, Mail } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import InvitationSystem from '@/components/InvitationSystem';

// Member type including banned and limited flags
type Member = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  status: 'active' | 'inactive';
  joinDate: string;
  avatar?: string;
  banned?: boolean;
  limited?: boolean;
  invitation_code?: string;
  invitation_used?: boolean;
};

// Link validation regex
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdownId, setShowDropdownId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const { isAuthenticated, isAdmin, updateUserStatus } = useAuth();
  const navigate = useNavigate();

  // Filter members based on search
  const filteredMembers = useMemo(() => {
    return members.filter(
      member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [members, searchTerm]);

  // Fetch actual members from Supabase
  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;

      const formattedMembers: Member[] = (data || []).map((profile: any) => ({
        id: profile.id,
        name: profile.name || 'Utilisateur inconnu',
        email: profile.email || '',
        role: profile.role || 'member',
        status: profile.banned ? 'inactive' : 'active',
        joinDate: new Date(profile.created_at).toLocaleDateString('fr-FR'),
        avatar: profile.avatar_url,
        banned: profile.banned,
        limited: profile.limited,
        invitation_code: profile.invitation_code,
        invitation_used: profile.invitation_used
      }));

      setMembers(formattedMembers);
    } catch (error) {
      console.error('Erreur lors de la récupération des membres:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les membres.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (isAuthenticated && isAdmin()) {
      fetchMembers();
    }
  }, [isAuthenticated, isAdmin]);

  // Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Toggle dropdown
  const toggleDropdown = (id: string) => {
    setShowDropdownId(prevId => prevId === id ? null : id);
  };

  // Handle ban/unban member
  const handleBanMember = async () => {
    if (!selectedMember) return;
    
    try {
      await updateUserStatus(selectedMember.id, { banned: !selectedMember.banned });
      await fetchMembers();
      setShowBanDialog(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Error updating member status:', error);
    }
  };

  // Handle limit/unlimit member
  const handleLimitMember = async () => {
    if (!selectedMember) return;
    
    try {
      await updateUserStatus(selectedMember.id, { limited: !selectedMember.limited });
      await fetchMembers();
      setShowLimitDialog(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Error updating member limit status:', error);
    }
  };

  // Handle status change
  const handleStatusChange = (member: Member) => {
    setSelectedMember(member);
    setShowBanDialog(true);
  };

  // Handle limit toggle
  const handleLimitToggle = (member: Member) => {
    setSelectedMember(member);
    setShowLimitDialog(true);
  };

  // Handle invitation refresh
  const handleInvitationSent = () => {
    fetchMembers();
  };

  // Mock add member (will need to be implemented)
  const handleAddMember = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "L'ajout de membres sera disponible prochainement.",
    });
  };

  // Handle delete (soft delete by banning)
  const handleDelete = (member: Member) => {
    setSelectedMember(member);
    setShowBanDialog(true);
  };

  return (
    <div className="page-container">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <h1 className="text-4xl font-bold text-center sm:text-left tech-text">Gestion des membres</h1>
        <div className="mt-4 sm:mt-0">
          <Button 
            onClick={handleAddMember}
            className="tech-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un membre
          </Button>
        </div>
      </div>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-input bg-background rounded-md shadow-sm focus:ring-primary focus:border-primary"
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Members table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Membre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Rôle
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date d'inscription
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Invitation
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                  Chargement des membres...
                </td>
              </tr>
            ) : filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {member.avatar ? (
                          <img 
                            className="h-10 w-10 rounded-full object-cover border border-border" 
                            src={member.avatar} 
                            alt="" 
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                            <span className="text-primary font-medium">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">
                          {member.name}
                          {member.limited && (
                            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-800 text-yellow-100">
                              Limité
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.role === 'admin' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {member.role === 'admin' ? 'Administrateur' : 'Membre'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.banned 
                        ? 'bg-destructive/20 text-destructive' 
                        : 'bg-green-800/30 text-green-500'
                    }`}>
                      {member.banned ? 'Banni' : 'Actif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {member.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {member.invitation_used ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-800/30 text-green-500">
                        Utilisée
                      </span>
                    ) : member.invitation_code ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-800/30 text-blue-500">
                        En attente
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        Non envoyée
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <InvitationSystem 
                        member={{
                          id: member.id,
                          name: member.name,
                          email: member.email
                        }}
                        onInvitationSent={handleInvitationSent}
                      />
                      
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(member.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                        
                        {showDropdownId === member.id && (
                          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-popover ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1" role="menu" aria-orientation="vertical">
                              <button
                                className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                                onClick={() => handleStatusChange(member)}
                              >
                                {member.banned ? (
                                  <>
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                    <span>Réactiver</span>
                                  </>
                                ) : (
                                  <>
                                    <Ban className="mr-2 h-4 w-4 text-destructive" />
                                    <span>Bannir</span>
                                  </>
                                )}
                              </button>
                              <button
                                className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                                onClick={() => handleLimitToggle(member)}
                              >
                                {member.limited ? (
                                  <>
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                    <span>Enlever les limitations</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                                    <span>Limiter</span>
                                  </>
                                )}
                              </button>
                              <button
                                className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted"
                                onClick={() => handleDelete(member)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Supprimer</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                  Aucun membre trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Ban Dialog */}
      <Dialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>{selectedMember?.banned ? 'Réactiver le membre' : 'Bannir le membre'}</DialogTitle>
            <DialogDescription>
              {selectedMember?.banned 
                ? `Voulez-vous vraiment réactiver ${selectedMember?.name}? Ils pourront à nouveau accéder à la plateforme.` 
                : `Voulez-vous vraiment bannir ${selectedMember?.name}? Ils ne pourront plus accéder à la plateforme.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowBanDialog(false)}>
              Annuler
            </Button>
            <Button 
              variant={selectedMember?.banned ? "default" : "destructive"}
              onClick={handleBanMember}
            >
              {selectedMember?.banned ? 'Réactiver' : 'Bannir'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Limit Dialog */}
      <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>{selectedMember?.limited ? 'Enlever les limitations' : 'Limiter le membre'}</DialogTitle>
            <DialogDescription>
              {selectedMember?.limited 
                ? `Voulez-vous vraiment enlever les limitations pour ${selectedMember?.name}? Ils pourront à nouveau poster librement.` 
                : `Voulez-vous vraiment limiter ${selectedMember?.name}? Ils ne pourront plus poster de liens ou de certains contenus.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowLimitDialog(false)}>
              Annuler
            </Button>
            <Button 
              variant={selectedMember?.limited ? "default" : "destructive"}
              onClick={handleLimitMember}
              className={selectedMember?.limited ? "" : "bg-yellow-600 hover:bg-yellow-700"}
            >
              {selectedMember?.limited ? 'Enlever les limitations' : 'Limiter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Members;
