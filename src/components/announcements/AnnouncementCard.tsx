
import React from 'react';
import { Announcement } from '@/types/announcement.types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface AnnouncementCardProps {
  announcement: Announcement;
  onEdit: (announcement: Announcement) => void;
  onDelete: (announcement: Announcement) => void;
}

const AnnouncementCard = ({ announcement, onEdit, onDelete }: AnnouncementCardProps) => {
  return (
    <Card className={`overflow-hidden ${!announcement.is_active ? 'border-muted bg-muted/30' : ''}`}>
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
            <Button variant="ghost" size="icon" onClick={() => onEdit(announcement)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(announcement)}>
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
  );
};

export default AnnouncementCard;
