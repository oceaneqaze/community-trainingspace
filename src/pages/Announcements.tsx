
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Announcement } from '@/types/announcement.types';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Plus } from 'lucide-react';
import AnnouncementDialog from '@/components/announcements/AnnouncementDialog';
import AnnouncementDeleteDialog from '@/components/announcements/AnnouncementDeleteDialog';
import EmptyAnnouncementState from '@/components/announcements/EmptyAnnouncementState';
import AnnouncementCard from '@/components/announcements/AnnouncementCard';

type AnnouncementFormValues = {
  title: string;
  content: string;
  is_active: boolean;
};

const Announcements = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      navigate('/videos');
      return;
    }

    fetchAnnouncements();
  }, [isAuthenticated, isAdmin, navigate]);

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements(data as Announcement[] || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les annonces',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdate = async (values: AnnouncementFormValues) => {
    try {
      if (currentAnnouncement) {
        // Update
        const { error } = await supabase
          .from('announcements')
          .update({
            title: values.title,
            content: values.content,
            is_active: values.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq('id', currentAnnouncement.id);

        if (error) throw error;

        toast({
          title: 'Succès',
          description: 'L\'annonce a été mise à jour',
        });
      } else {
        // Create
        const { error } = await supabase
          .from('announcements')
          .insert({
            title: values.title,
            content: values.content,
            is_active: values.is_active,
            created_by: user?.id,
          });

        if (error) throw error;

        toast({
          title: 'Succès',
          description: 'L\'annonce a été créée',
        });
      }

      setIsDialogOpen(false);
      setCurrentAnnouncement(null);
      fetchAnnouncements();
    } catch (error) {
      console.error('Error saving announcement:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de sauvegarder l\'annonce',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!currentAnnouncement) return;

    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', currentAnnouncement.id);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'L\'annonce a été supprimée',
      });

      setIsDeleteDialogOpen(false);
      setCurrentAnnouncement(null);
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer l\'annonce',
        variant: 'destructive',
      });
    }
  };

  const openCreateDialog = () => {
    setCurrentAnnouncement(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (announcement: Announcement) => {
    setCurrentAnnouncement(announcement);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (announcement: Announcement) => {
    setCurrentAnnouncement(announcement);
    setIsDeleteDialogOpen(true);
  };

  if (!isAuthenticated || !isAdmin()) return null;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestion des annonces</h1>
        <Button onClick={openCreateDialog} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Nouvelle annonce
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : announcements.length === 0 ? (
        <EmptyAnnouncementState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((announcement) => (
            <AnnouncementCard 
              key={announcement.id}
              announcement={announcement}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <AnnouncementDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleCreateOrUpdate}
        announcement={currentAnnouncement}
      />
      
      <AnnouncementDeleteDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Announcements;
