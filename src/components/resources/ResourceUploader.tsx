
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Upload, X } from 'lucide-react';

interface ResourceUploaderProps {
  onFileSelect: (file: File, title: string, description: string) => Promise<void>;
  isLoading: boolean;
}

const ResourceUploader: React.FC<ResourceUploaderProps> = ({ onFileSelect, isLoading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Vérification du type de fichier (PDF uniquement)
      if (selectedFile.type !== 'application/pdf') {
        alert('Veuillez sélectionner un document PDF');
        return;
      }
      
      setFile(selectedFile);
      
      // Si le titre est vide, utiliser le nom du fichier comme titre par défaut
      if (!title) {
        setTitle(selectedFile.name.replace('.pdf', ''));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file && title) {
      await onFileSelect(file, title, description);
      resetForm();
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setDescription('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titre du document</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre du document"
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description (optionnelle)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description du document"
          disabled={isLoading}
        />
      </div>
      
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf"
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 flex flex-col items-center justify-center"
            disabled={isLoading}
          >
            <Upload className="h-8 w-8 mb-2" />
            <span className="text-sm">Sélectionner un fichier PDF</span>
            <span className="text-xs text-muted-foreground mt-1">PDF uniquement</span>
          </Button>
        </div>
      ) : (
        <div className="flex items-center p-4 bg-muted rounded-lg">
          <FileText className="h-8 w-8 text-primary mr-3" />
          <div className="flex-1">
            <p className="font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetForm}
            disabled={isLoading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!file || !title || isLoading}
        >
          {isLoading ? 'Téléchargement...' : 'Ajouter la ressource'}
        </Button>
      </div>
    </form>
  );
};

export default ResourceUploader;
