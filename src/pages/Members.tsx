
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Member } from '@/types/member.types';
import MemberTable from '@/components/members/MemberTable';
import MemberSearch from '@/components/members/MemberSearch';
import MemberActionDialog from '@/components/members/MemberActionDialog';

// URL validation regex
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      <MemberSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {/* Members table */}
      <MemberTable 
        members={filteredMembers}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
        onLimitToggle={handleLimitToggle}
        onDelete={handleDelete}
        onInvitationSent={handleInvitationSent}
      />

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
