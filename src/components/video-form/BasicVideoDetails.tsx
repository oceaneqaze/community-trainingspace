
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BasicVideoDetailsProps {
  title: string;
  description: string;
  category: string;
  duration: string;
  isLoading: boolean;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setCategory: (category: string) => void;
}

const BasicVideoDetails: React.FC<BasicVideoDetailsProps> = ({
  title,
  description,
  category,
  duration,
  isLoading,
  setTitle,
  setDescription,
  setCategory
}) => {
  return (
    <>
      <div>
        <Label htmlFor="title">Titre de la vidéo</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Saisissez le titre de la vidéo"
          required
          disabled={isLoading}
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Saisissez une description de la vidéo"
          rows={4}
          disabled={isLoading}
        />
      </div>
      
      <div>
        <Label htmlFor="category">Catégorie</Label>
        <Input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Ex: Débutant, Avancé..."
          required
          disabled={isLoading}
        />
      </div>
      
      {duration && (
        <p className="text-sm text-gray-500">
          Durée détectée: {duration}
        </p>
      )}
    </>
  );
};

export default BasicVideoDetails;
