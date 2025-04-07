
export interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  created_by?: string | null;
  is_active: boolean;
}
