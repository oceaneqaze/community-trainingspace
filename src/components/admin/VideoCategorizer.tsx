
import React, { useState } from 'react';
import { VideoProps } from '@/components/video/VideoCard';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface VideoCategorizerProps {
  video: VideoProps;
  categories: string[];
  onCategoryChange: (videoId: string, newCategory: string) => void;
}

const VideoCategorizer: React.FC<VideoCategorizerProps> = ({ video, categories, onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(video.category || 'Sans catégorie');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCategoryChange = async (value: string) => {
    setSelectedCategory(value);
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('videos')
        .update({ category: value })
        .eq('id', video.id);
        
      if (error) throw error;
      
      onCategoryChange(video.id, value);
      toast({
        title: "Catégorie mise à jour",
        description: "La catégorie de la vidéo a été mise à jour avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la catégorie",
        variant: "destructive",
      });
      // Rétablir la catégorie précédente
      setSelectedCategory(video.category || 'Sans catégorie');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select 
        value={selectedCategory} 
        onValueChange={handleCategoryChange}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sélectionner une catégorie" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category, index) => (
            <SelectItem key={index} value={category}>
              {category}
            </SelectItem>
          ))}
          <SelectItem value="Sans catégorie">Sans catégorie</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default VideoCategorizer;
