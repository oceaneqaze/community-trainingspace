
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Video, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

interface CloudinaryVideoUploaderProps {
  onVideoUploaded?: () => void;
}

const CloudinaryVideoUploader: React.FC<CloudinaryVideoUploaderProps> = ({ onVideoUploaded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useAuth();

  const CLOUDINARY_CLOUD_NAME = 'dopecontent';
  const CLOUDINARY_UPLOAD_PRESET = 'video_upload';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Vérifier que c'est bien un fichier vidéo
      if (!selectedFile.type.startsWith('video/')) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un fichier vidéo valide",
          variant: "destructive",
        });
        return;
      }

      // Vérifier la taille du fichier (limite de 100MB pour l'exemple)
      const maxSize = 100 * 1024 * 1024; // 100MB
      if (selectedFile.size > maxSize) {
        toast({
          title: "Erreur",
          description: "Le fichier est trop volumineux. Taille maximum : 100MB",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
      
      // Si le titre est vide, utiliser le nom du fichier
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title || !user) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Étape 1: Upload vers Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("resource_type", "video");

      console.log("🔄 Début de l'upload vers Cloudinary...");

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`, {
        method: "POST",
        body: formData
      });

      if (!uploadRes.ok) {
        throw new Error(`Erreur Cloudinary: ${uploadRes.status}`);
      }

      const data = await uploadRes.json();
      console.log("✅ Upload Cloudinary réussi:", data);

      const videoUrl = data.secure_url;
      const thumbnailUrl = data.secure_url.replace(/\.(mp4|mov|avi|webm)$/, '.jpg');
      const duration = data.duration ? `${Math.floor(data.duration / 60)}:${(data.duration % 60).toString().padStart(2, '0')}` : null;

      setUploadProgress(70);

      // Étape 2: Insertion dans Supabase
      console.log("💾 Insertion dans Supabase...");
      
      const { data: videoData, error } = await supabase
        .from('videos')
        .insert([
          {
            title: title.trim(),
            description: description.trim() || null,
            video_url: videoUrl,
            thumbnail_url: thumbnailUrl,
            duration: duration,
            category: category.trim() || null,
            uploaded_by: user.id
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("❌ Erreur Supabase:", error);
        throw error;
      }

      console.log("✅ Vidéo sauvegardée:", videoData);
      setUploadProgress(100);

      toast({
        title: "Succès",
        description: "La vidéo a été uploadée avec succès !",
      });

      // Reset du formulaire
      setTitle('');
      setDescription('');
      setCategory('');
      setFile(null);
      setUploadProgress(0);

      // Callback pour rafraîchir la liste
      if (onVideoUploaded) {
        onVideoUploaded();
      }

    } catch (error: any) {
      console.error('❌ Erreur lors de l\'upload:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'upload",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setDescription('');
    setCategory('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Publier une nouvelle vidéo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de votre vidéo"
              required
              disabled={isUploading}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description de votre vidéo (optionnel)"
              rows={3}
              disabled={isUploading}
            />
          </div>

          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Catégorie (optionnel)"
              disabled={isUploading}
            />
          </div>

          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
                id="video-upload"
                disabled={isUploading}
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium">Cliquez pour sélectionner une vidéo</p>
                <p className="text-sm text-gray-500 mt-2">MP4, MOV, AVI, WebM (max 100MB)</p>
              </label>
            </div>
          ) : (
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Video className="h-8 w-8 text-blue-500 mr-3" />
              <div className="flex-1">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetForm}
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
              <p className="text-sm text-center mt-2">
                {uploadProgress < 70 ? 'Upload vers Cloudinary...' : 'Enregistrement...'}
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={!file || !title || isUploading}
            className="w-full"
          >
            {isUploading ? 'Publication en cours...' : 'Publier la vidéo'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CloudinaryVideoUploader;
