
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Member } from '@/types/member.types';
import MemberTable from '@/components/members/MemberTable';
import MemberSearch from '@/components/members/MemberSearch';
import MemberActionDialog from '@/components/members/MemberActionDialog';
import MemberStats from '@/components/members/MemberStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    roles: ['admin', 'member'],
    status: ['active', 'inactive']
  });
  const { isAuthenticated, isAdmin, updateUserStatus } = useAuth();
  const navigate = useNavigate();

  // Filter members based on search and filters
  const filteredMembers = useMemo(() => {
    return members.filter(
      member =>
        // Text search
        (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        // Role filter
        activeFilters.roles.includes(member.role) &&
        // Status filter (active/inactive)
        activeFilters.status.includes(member.banned ? 'inactive' : 'active')
    );
  }, [members, searchTerm, activeFilters]);

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

  // Handle ban/unban member
  const handleBanMember = async () => {
    if (!selectedMember) return;
    
    try {
      await updateUserStatus(selectedMember.id, { banned: !selectedMember.banned });
      await fetchMembers();
      setShowBanDialog(false);
      setSelectedMember(null);
      
      toast({
        title: selectedMember.banned ? "Membre réactivé" : "Membre banni",
        description: selectedMember.banned 
          ? `${selectedMember.name} a été réactivé avec succès.` 
          : `${selectedMember.name} a été banni avec succès.`,
      });
    } catch (error) {
      console.error('Error updating member status:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut.",
        variant: "destructive",
      });
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
      
      toast({
        title: selectedMember.limited ? "Limitations retirées" : "Membre limité",
        description: selectedMember.limited 
          ? `Les limitations ont été retirées pour ${selectedMember.name}.` 
          : `${selectedMember.name} a été limité avec succès.`,
      });
    } catch (error) {
      console.error('Error updating member limit status:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des limitations.",
        variant: "destructive",
      });
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
    toast({
      title: "Invitation mise à jour",
      description: "La liste des membres a été mise à jour.",
    });
  };

  // Mock add member
  const handleAddMember = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "L'ajout manuel de membres sera disponible prochainement.",
    });
  };

  // Export members as CSV
  const handleExportMembers = () => {
    try {
      // Create CSV content
      const headers = ['Nom', 'Email', 'Rôle', 'Statut', 'Date d\'inscription'];
      const csvContent = [
        headers.join(','),
        ...filteredMembers.map(member => [
          member.name,
          member.email,
          member.role === 'admin' ? 'Administrateur' : 'Membre',
          member.banned ? 'Banni' : 'Actif',
          member.joinDate
        ].join(','))
      ].join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `membres_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export réussi",
        description: "La liste des membres a été exportée avec succès.",
      });
    } catch (error) {
      console.error('Error exporting members:', error);
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export des membres.",
        variant: "destructive",
      });
    }
  };

  // Handle delete (soft delete by banning)
  const handleDelete = (member: Member) => {
    setSelectedMember(member);
    setShowBanDialog(true);
  };

  // Handle filter change
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
  };

  return (
    <div className="page-container max-w-screen-2xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-center sm:text-left">Gestion des membres</h1>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button 
            variant="outline"
            onClick={handleExportMembers}
            className="gap-1"
          >
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button 
            onClick={handleAddMember}
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            Ajouter un membre
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="list" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Liste des membres</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          {/* Search and filters controls */}
          <div className="max-w-md mb-6">
            <MemberSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          
          {/* Members table */}
          <MemberTable 
            members={members}
            filteredMembers={filteredMembers}
            isLoading={isLoading}
            onStatusChange={handleStatusChange}
            onLimitToggle={handleLimitToggle}
            onDelete={handleDelete}
            onInvitationSent={handleInvitationSent}
            onFilterChange={handleFilterChange}
          />
        </TabsContent>
        
        <TabsContent value="stats">
          <MemberStats members={members} />
        </TabsContent>
      </Tabs>

      {/* Ban Dialog */}
      <MemberActionDialog 
        isOpen={showBanDialog}
        onClose={() => setShowBanDialog(false)}
        onConfirm={handleBanMember}
        member={selectedMember}
        action="ban"
      />

      {/* Limit Dialog */}
      <MemberActionDialog 
        isOpen={showLimitDialog}
        onClose={() => setShowLimitDialog(false)}
        onConfirm={handleLimitMember}
        member={selectedMember}
        action="limit"
      />
    </div>
  );
};

export default Members;
