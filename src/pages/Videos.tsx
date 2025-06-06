
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ModernBackground from '@/components/ui/modern-background';
import ModernCard from '@/components/ui/modern-card';
import { useAuth } from '@/context/AuthContext';
import VideosHeader from '@/components/video/VideosHeader';
import VideoFilterSection from '@/components/video/VideoFilterSection';
import VideoFiltersDisplay from '@/components/video/VideoFiltersDisplay';
import VideoContent from '@/components/video/VideoContent';
import { useVideos, VideoViewType } from '@/hooks/useVideos';

const Videos: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredVideos,
    selectedCategory,
    setSelectedCategory,
    categories,
    isLoading,
    activeView,
    setActiveView,
    statusFilter,
    setStatusFilter
  } = useVideos();
  
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Memoized video grouping
  const videosByCategory = useMemo(() => {
    if (!filteredVideos.length) return {};
    
    return filteredVideos.reduce((acc, video) => {
      const category = video.category || 'Sans catégorie';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(video);
      return acc;
    }, {} as Record<string, typeof filteredVideos>);
  }, [filteredVideos]);

  const sortedCategories = useMemo(() => {
    return Object.keys(videosByCategory).sort();
  }, [videosByCategory]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleVideoClick = (videoId: string) => {
    navigate(`/videos/${videoId}`);
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setSelectedCategory(null);
  };

  return (
    <ModernBackground variant="default">
      <div className="container mx-auto px-4 py-8">
        <ModernCard variant="glass" className="shadow-xl mb-8" glow="purple">
          <div className="p-6">
            <VideosHeader isAdmin={isAdmin && isAdmin()} />
          </div>
          <div className="px-6 pb-6">
            <VideoFilterSection
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              activeView={activeView}
              setActiveView={setActiveView}
            />
            
            <VideoFiltersDisplay
              statusFilter={statusFilter}
              selectedCategory={selectedCategory}
              onClearFilters={handleClearFilters}
            />
            
            <VideoContent
              activeView={activeView}
              setActiveView={setActiveView}
              isLoading={isLoading}
              videosByCategory={videosByCategory}
              filteredVideos={filteredVideos}
              selectedCategory={selectedCategory}
              sortedCategories={sortedCategories}
              onVideoClick={handleVideoClick}
            />
          </div>
        </ModernCard>
      </div>
    </ModernBackground>
  );
};

export default Videos;
