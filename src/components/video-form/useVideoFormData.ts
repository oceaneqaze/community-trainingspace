
import { useState, useEffect } from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import { useFirebaseUpload } from '@/hooks/useFirebaseUpload';
import { toast } from '@/components/ui/use-toast';

export const useVideoFormData = (video?: VideoProps) => {
  const [title, setTitle] = useState(video?.title || '');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(video?.category || '');
  const [duration, setDuration] = useState(video?.duration || '');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [externalVideoUrl, setExternalVideoUrl] = useState<string>('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(video?.thumbnail || '');
  const [activeTab, setActiveTab] = useState<string>("details");
  const [videoPlatform, setVideoPlatform] = useState<string>('');
  const { uploadVideo, uploadThumbnail, status: uploadStatus } = useFirebaseUpload();

  useEffect(() => {
    if (video?.id) {
      async function loadFullVideoData() {
        try {
          const { supabase } = await import('@/integrations/supabase/client');
          const { data, error } = await supabase
            .from('videos')
            .select('description, video_url')
            .eq('id', video.id)
            .single();

          if (data && !error) {
            setDescription(data.description || '');
            // Vérifier si c'est une URL externe (Firebase ou autres)
            if (data.video_url && !data.video_url.includes('storage.googleapis.com')) {
              setExternalVideoUrl(data.video_url);
            }
          }
        } catch (err) {
          console.error('Error loading video description:', err);
        }
      }

      loadFullVideoData();
    }
  }, [video?.id]);
  
  const handleThumbnailChange = (file: File | null, previewUrl: string) => {
    setThumbnailFile(file);
    setThumbnailPreview(previewUrl);
  };
  
  const handleVideoChange = (file: File | null) => {
    setVideoFile(file);
    // Clear external URL if a file is selected
    if (file) {
      setExternalVideoUrl('');
      setVideoPlatform('');
    }
  };
  
  const handleExternalUrlChange = (url: string) => {
    setExternalVideoUrl(url);
    // Clear video file if an external URL is provided
    if (url) {
      setVideoFile(null);
    }
  };

  const handleMetadataChange = (metadata: { title?: string; thumbnail?: string; platform?: string }) => {
    console.log('📊 VideoFormData - Received metadata:', metadata);
    
    // Auto-compléter le titre si vide et si on a des métadonnées
    if (metadata.title && !title.trim()) {
      setTitle(metadata.title);
    }
    
    // Utiliser le thumbnail de la plateforme si pas de thumbnail personnalisé
    if (metadata.thumbnail && !thumbnailFile && !thumbnailPreview) {
      setThumbnailPreview(metadata.thumbnail);
    }
    
    // Stocker la plateforme
    if (metadata.platform) {
      setVideoPlatform(metadata.platform);
    }
  };
  
  const handleDurationExtracted = (extractedDuration: string) => {
    setDuration(extractedDuration);
    console.log(`Durée extraite: ${extractedDuration}`);
  };

  const handleSubmit = async (e: React.FormEvent, onSubmit: (video: Partial<VideoProps>) => void) => {
    e.preventDefault();
    
    if (uploadStatus.isLoading) return;
    
    if (!title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre est obligatoire",
        variant: "destructive",
      });
      return;
    }
    
    if (!videoFile && !externalVideoUrl && !video?.videoUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez télécharger une vidéo ou fournir un lien",
        variant: "destructive",
      });
      return;
    }
    
    try {
      let thumbnailUrl = thumbnailPreview;
      let videoUrl = video?.videoUrl;
      
      // Upload du thumbnail avec Firebase si un fichier est fourni
      if (thumbnailFile) {
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
      }
      
      // Upload de la vidéo avec Firebase si un fichier est fourni
      if (videoFile) {
        videoUrl = await uploadVideo(videoFile);
      } else if (externalVideoUrl) {
        videoUrl = externalVideoUrl;
      }
      
      const videoData: Partial<VideoProps> = {
        title,
        thumbnail: thumbnailUrl,
        duration,
        category: category || (videoPlatform ? `Vidéos ${videoPlatform}` : undefined),
        videoUrl,
      };
      
      if (video?.id) {
        videoData.id = video.id;
      }
      
      onSubmit(videoData);
    } catch (error: any) {
      console.error('Error uploading files:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'upload des fichiers",
        variant: "destructive",
      });
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    duration,
    videoFile,
    thumbnailFile,
    externalVideoUrl,
    thumbnailPreview,
    activeTab,
    setActiveTab,
    videoPlatform,
    uploadStatus,
    handleThumbnailChange,
    handleVideoChange,
    handleExternalUrlChange,
    handleMetadataChange,
    handleDurationExtracted,
    handleSubmit
  };
};
