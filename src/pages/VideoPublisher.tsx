
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import CloudinaryVideoUploader from '@/components/video/CloudinaryVideoUploader';
import VideoGallery from '@/components/video/VideoGallery';
import VideoPlayer from '@/components/video/VideoPlayer';
import { Upload, Video, Library } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Video {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  duration: string | null;
  category: string | null;
  created_at: string;
  updated_at: string | null;
  uploader_name?: string;
}

const VideoPublisher: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleVideoUploaded = () => {
    // Rafraîchir la galerie après upload
    setRefreshTrigger(prev => prev + 1);
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Publication et Visionnage de Vidéos
          </CardTitle>
        </CardHeader>
      </Card>

      {selectedVideo ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedVideo(null)}
            className="text-primary hover:underline flex items-center gap-2"
          >
            ← Retour à la galerie
          </button>
          
          <VideoPlayer
            videoUrl={selectedVideo.video_url}
            title={selectedVideo.title}
            description={selectedVideo.description || undefined}
            category={selectedVideo.category || undefined}
            createdAt={selectedVideo.created_at}
            uploaderName={selectedVideo.uploader_name}
          />
        </div>
      ) : (
        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="mb-6">
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Library className="h-4 w-4" />
              Galerie vidéo
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Publier une vidéo
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery">
            <VideoGallery 
              onVideoSelect={handleVideoSelect}
              refreshTrigger={refreshTrigger}
            />
          </TabsContent>
          
          <TabsContent value="upload">
            <CloudinaryVideoUploader onVideoUploaded={handleVideoUploaded} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default VideoPublisher;
