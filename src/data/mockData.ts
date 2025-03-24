
import { VideoProps } from '@/components/VideoCard';

// URL de l'image par défaut pour les vignettes de vidéos
export const DEFAULT_THUMBNAIL = '/lovable-uploads/3c1cfa01-899c-4090-b1dd-f597ec6a239b.png';

// Mock data for videos
export const mockVideos: VideoProps[] = [
  {
    id: '1',
    title: 'Introduction aux fondamentaux',
    thumbnail: DEFAULT_THUMBNAIL,
    duration: '12:34',
    category: 'Débutant',
    date: '10 Juin 2023',
    viewed: true,
    progress: 100,
    likes: 24,
    comments: 5,
  },
  {
    id: '2',
    title: 'Techniques avancées de résolution',
    thumbnail: DEFAULT_THUMBNAIL,
    duration: '24:15',
    category: 'Avancé',
    date: '18 Juillet 2023',
    progress: 45,
    likes: 42,
    comments: 8,
  },
  {
    id: '3',
    title: 'Méthodologie et approche pratique',
    thumbnail: DEFAULT_THUMBNAIL,
    duration: '18:22',
    category: 'Intermédiaire',
    date: '02 Août 2023',
    likes: 18,
    comments: 3,
  },
  {
    id: '4',
    title: 'Exercices pratiques - Session 1',
    thumbnail: DEFAULT_THUMBNAIL,
    duration: '31:47',
    category: 'Pratique',
    date: '15 Septembre 2023',
    likes: 15,
    comments: 2,
  },
  {
    id: '5',
    title: 'Analyse de cas concrets',
    thumbnail: DEFAULT_THUMBNAIL,
    duration: '22:05',
    category: 'Étude de cas',
    date: '30 Septembre 2023',
    likes: 10,
  },
  {
    id: '6',
    title: 'Atelier collaboratif',
    thumbnail: DEFAULT_THUMBNAIL,
    duration: '45:12',
    category: 'Atelier',
    date: '10 Octobre 2023',
    likes: 7,
    comments: 1,
  },
];
