
import React, { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { Member } from '@/types/member.types';
import { toast } from '@/components/ui/use-toast';
import MemberTable from '@/components/members/MemberTable';
import MemberStats from '@/components/members/MemberStats';
import MemberSearch from '@/components/members/MemberSearch';
import AddMemberDialog from '@/components/members/AddMemberDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserPlus } from 'lucide-react';

const Members: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuthRedirect(true);
  const { updateUserStatus } = useAuth();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    roles: ['admin', 'member'],
    status: ['active', 'inactive']
  });

  // Fetch members data
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(profile => ({
        id: profile.id,
        name: profile.name || profile.email,
        email: profile.email,
        role: profile.role,
        banned: profile.banned || false,
        limited: profile.limited || false,
        joinDate: new Date(profile.created_at).toLocaleDateString('fr-FR'),
        avatar: profile.avatar_url,
        invitation_code: profile.invitation_code,
        invitation_used: profile.invitation_used
      })) as Member[];
    },
    enabled: isAuthenticated && isAdmin,
  });

  // Filter members based on search term and filters
  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = filters.roles.includes(member.role);
      const matchesStatus = filters.status.includes(member.banned ? 'inactive' : 'active');
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, searchTerm, filters]);

  const handleMemberAdded = () => {
    queryClient.invalidateQueries({ queryKey: ['members'] });
    toast({
      title: "Membre ajouté",
      description: "Le nouveau membre a été ajouté avec succès.",
    });
  };

  const handleStatusChange = async (member: Member) => {
    const success = await updateUserStatus(member.id, { banned: !member.banned });
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast({
        title: member.banned ? "Membre réactivé" : "Membre banni",
        description: `${member.name} a été ${member.banned ? 'réactivé' : 'banni'}.`,
      });
    }
  };

  const handleLimitToggle = async (member: Member) => {
    const success = await updateUserStatus(member.id, { limited: !member.limited });
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast({
        title: member.limited ? "Limitations supprimées" : "Membre limité",
        description: `${member.name} ${member.limited ? 'n\'a plus de limitations' : 'a été limité'}.`,
      });
    }
  };

  const handleAdminToggle = async (member: Member) => {
    const newRole = member.role === 'admin' ? 'member' : 'admin';
    const success = await updateUserStatus(member.id, { role: newRole });
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast({
        title: "Rôle modifié",
        description: `${member.name} est maintenant ${newRole === 'admin' ? 'administrateur' : 'membre'}.`,
      });
    }
  };

  const handleDelete = async (member: Member) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(member.id);
      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast({
        title: "Membre supprimé",
        description: `${member.name} a été supprimé de la plateforme.`,
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer ce membre.",
        variant: "destructive",
      });
    }
  };

  const handleInvitationSent = () => {
    queryClient.invalidateQueries({ queryKey: ['members'] });
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Users className="h-10 w-10 text-zinc-900 dark:text-white mr-3" />
          <div>
            <h1 className="text-3xl font-medium">Gestion des membres</h1>
            <p className="text-muted-foreground">
              Gérez les utilisateurs de votre plateforme
            </p>
          </div>
        </div>
        <AddMemberDialog onMemberAdded={handleMemberAdded} />
      </div>

      <Tabs defaultValue="table" className="space-y-6">
        <TabsList>
          <TabsTrigger value="table">Liste des membres</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Recherche et filtres
              </CardTitle>
              <CardDescription>
                Recherchez et filtrez les membres selon vos critères
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemberSearch 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onFilterChange={setFilters}
              />
            </CardContent>
          </Card>

          <MemberTable
            members={members}
            isLoading={isLoading}
            onStatusChange={handleStatusChange}
            onLimitToggle={handleLimitToggle}
            onAdminToggle={handleAdminToggle}
            onDelete={handleDelete}
            onInvitationSent={handleInvitationSent}
            filteredMembers={filteredMembers}
            onFilterChange={setFilters}
          />
        </TabsContent>

        <TabsContent value="stats">
          <MemberStats members={members} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Members;
