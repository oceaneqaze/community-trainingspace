
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';
import VideosHeader from '@/components/video/VideosHeader';
import VideoFilterSection from '@/components/video/VideoFilterSection';
import VideoFiltersDisplay from '@/components/video/VideoFiltersDisplay';
import VideoContent from '@/components/video/VideoContent';
import { useVideos } from '@/hooks/useVideos';

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
    <div className="page-container bg-background">
      <Card className="bg-card border-border shadow-lg mb-4 sm:mb-8">
        <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
          <VideosHeader isAdmin={isAdmin && isAdmin()} />
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Videos;
