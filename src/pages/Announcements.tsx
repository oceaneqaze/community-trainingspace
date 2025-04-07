
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Announcement } from '@/types/announcement.types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import { Pencil, Trash2, Plus, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const announcementSchema = z.object({
  title: z.string().min(3, { message: 'Le titre doit contenir au moins 3 caractères' }),
  content: z.string().min(10, { message: 'Le contenu doit contenir au moins 10 caractères' }),
  is_active: z.boolean().default(true),
});

type AnnouncementFormValues = z.infer<typeof announcementSchema>;

const Announcements = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);

  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: '',
      content: '',
      is_active: true,
    },
  });

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      navigate('/videos');
      return;
    }

    fetchAnnouncements();
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    if (currentAnnouncement) {
      form.reset({
        title: currentAnnouncement.title,
        content: currentAnnouncement.content,
        is_active: currentAnnouncement.is_active,
      });
    } else {
      form.reset({
        title: '',
        content: '',
        is_active: true,
      });
    }
  }, [currentAnnouncement, form]);

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
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
        <Card className="text-center p-12">
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-semibold">Aucune annonce</h3>
            <p className="text-muted-foreground">
              Créez votre première annonce en cliquant sur le bouton "Nouvelle annonce"
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className={`overflow-hidden ${!announcement.is_active ? 'border-muted bg-muted/30' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {announcement.title}
                      {!announcement.is_active && (
                        <span className="text-xs bg-muted-foreground/20 text-muted-foreground px-2 py-0.5 rounded-full">Inactive</span>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {formatDistanceToNow(new Date(announcement.created_at), { addSuffix: true, locale: fr })}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(announcement)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(announcement)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{announcement.content}</p>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                <div>
                  Dernière mise à jour: {format(new Date(announcement.updated_at), 'dd/MM/yyyy HH:mm')}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentAnnouncement ? 'Modifier l\'annonce' : 'Créer une annonce'}</DialogTitle>
            <DialogDescription>
              {currentAnnouncement 
                ? 'Modifiez les informations de l\'annonce ci-dessous'
                : 'Remplissez le formulaire pour créer une nouvelle annonce'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateOrUpdate)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre de l'annonce" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contenu</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Contenu de l'annonce" 
                        className="min-h-[150px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Cette annonce sera visible par tous les utilisateurs si active
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">Enregistrer</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Announcements;
