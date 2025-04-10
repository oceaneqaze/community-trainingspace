
import { useState, useEffect } from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import { useFileUpload } from '@/hooks/useFileUpload';
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
  const { uploadFile, status: uploadStatus } = useFileUpload();

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
            // Check if it's an external URL (doesn't start with a Supabase storage URL)
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
    }
  };
  
  const handleExternalUrlChange = (url: string) => {
    setExternalVideoUrl(url);
    // Clear video file if an external URL is provided
    if (url) {
      setVideoFile(null);
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
      
      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile, 'videos', 'thumbnails/');
      }
      
      if (videoFile) {
        videoUrl = await uploadFile(videoFile, 'videos', 'content/');
      } else if (externalVideoUrl) {
        videoUrl = externalVideoUrl;
      }
      
      const videoData: Partial<VideoProps> = {
        title,
        thumbnail: thumbnailUrl,
        duration,
        category,
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
    uploadStatus,
    handleThumbnailChange,
    handleVideoChange,
    handleExternalUrlChange,
    handleDurationExtracted,
    handleSubmit
  };
};
