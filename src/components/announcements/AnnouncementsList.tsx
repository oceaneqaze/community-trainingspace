
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Announcement } from '@/types/announcement.types';
import { Loader2 } from 'lucide-react';

interface AnnouncementsListProps {
  onAnnouncementsRead?: () => void;
  compact?: boolean;
  limit?: number;
}

const AnnouncementsList = ({ onAnnouncementsRead, compact = false, limit = 5 }: AnnouncementsListProps) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) {
          throw error;
        }

        setAnnouncements(data || []);
        
        // Mark announcements as read
        if (onAnnouncementsRead && data && data.length > 0) {
          onAnnouncementsRead();
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, [limit, onAnnouncementsRead]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Aucune annonce pour le moment
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${compact ? 'p-0' : 'p-4'}`}>
      <h3 className={`${compact ? 'text-sm font-medium mb-2' : 'text-lg font-semibold mb-4'}`}>
        Annonces
      </h3>
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="overflow-hidden">
            <CardHeader className={`${compact ? 'p-3' : 'p-4'}`}>
              <CardTitle className={`${compact ? 'text-base' : 'text-lg'}`}>{announcement.title}</CardTitle>
              <CardDescription>
                {formatDistanceToNow(new Date(announcement.created_at), { 
                  addSuffix: true, 
                  locale: fr 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className={`${compact ? 'p-3 pt-0' : 'p-4 pt-0'}`}>
              <p className={`${compact ? 'text-sm' : 'text-base'} whitespace-pre-wrap`}>
                {announcement.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsList;
