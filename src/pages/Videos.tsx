
import React, { useState, useEffect } from 'react';
import VideoCard, { VideoProps } from '@/components/VideoCard';
import { Search, Filter } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock data for videos
const mockVideos: VideoProps[] = [
  {
    id: '1',
    title: 'Introduction aux fondamentaux',
    thumbnail: 'https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    duration: '12:34',
    category: 'Débutant',
    date: '10 Juin 2023',
    viewed: true,
    progress: 100,
  },
  {
    id: '2',
    title: 'Techniques avancées de résolution',
    thumbnail: 'https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    duration: '24:15',
    category: 'Avancé',
    date: '18 Juillet 2023',
    progress: 45,
  },
  {
    id: '3',
    title: 'Méthodologie et approche pratique',
    thumbnail: 'https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    duration: '18:22',
    category: 'Intermédiaire',
    date: '02 Août 2023',
  },
  {
    id: '4',
    title: 'Exercices pratiques - Session 1',
    thumbnail: 'https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    duration: '31:47',
    category: 'Pratique',
    date: '15 Septembre 2023',
  },
  {
    id: '5',
    title: 'Analyse de cas concrets',
    thumbnail: 'https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    duration: '22:05',
    category: 'Étude de cas',
    date: '30 Septembre 2023',
  },
  {
    id: '6',
    title: 'Atelier collaboratif',
    thumbnail: 'https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    duration: '45:12',
    category: 'Atelier',
    date: '10 Octobre 2023',
  },
];

// Extract unique categories
const categories = Array.from(new Set(mockVideos.map(video => video.category)));

const Videos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVideos, setFilteredVideos] = useState<VideoProps[]>(mockVideos);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Handle search and filtering
  useEffect(() => {
    let results = mockVideos;
    
    if (searchTerm) {
      results = results.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      results = results.filter(video => video.category === selectedCategory);
    }
    
    setFilteredVideos(results);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Handle video click
  const handleVideoClick = (videoId: string) => {
    console.log(`Video ${videoId} clicked`);
    // In a real app, navigate to video player or detailed view
  };

  return (
    <div className="page-container">
      <h1 className="text-4xl font-bold mb-8 text-center sm:text-left">Bibliothèque de vidéos</h1>
      
      {/* Search and filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Rechercher une vidéo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative inline-block">
          <select
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Videos grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => handleVideoClick(video.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune vidéo trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            Essayez d'ajuster vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default Videos;
