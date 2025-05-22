
import React, { useRef, useState } from 'react';
import ThumbnailUploader from '@/components/ThumbnailUploader';
import { toast } from '@/hooks/use-toast';
import EditorToolbar from './editor/EditorToolbar';
import EditorContent from './editor/EditorContent';

interface BlogEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onImageUpload: (file: File, previewUrl: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ content, onContentChange, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleContentChange = () => {
    if (fileInputRef.current?.parentElement?.querySelector('[contenteditable]')) {
      const newContent = fileInputRef.current.parentElement.querySelector('[contenteditable]')?.innerHTML || '';
      onContentChange(newContent);
    }
  };

  const handleInsertImage = (e: React.MouseEvent) => {
    // Empêcher le comportement par défaut du bouton
    e.preventDefault();
    
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Vérifier si c'est une image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une image valide",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const previewUrl = event.target.result as string;
          
          // Insérer l'image dans l'éditeur
          document.execCommand('insertHTML', false, `<img src="${previewUrl}" alt="Image insérée" style="max-width: 100%;" />`);
          
          // Déclencher la fonction de téléchargement
          onImageUpload(file, previewUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <ThumbnailUploader
        onThumbnailChange={(file, previewUrl) => onImageUpload(file!, previewUrl)}
      />
      
      <div className="border border-gray-200 rounded-md shadow-sm">
        {/* Barre d'outils */}
        <EditorToolbar 
          onInsertImage={handleInsertImage} 
          fileInputRef={fileInputRef} 
        />
        
        {/* Zone d'édition */}
        <EditorContent 
          content={content}
          onContentChange={handleContentChange}
          isInitialized={isInitialized}
          setIsInitialized={setIsInitialized}
        />
        
        {/* Input file caché pour l'upload d'images */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default BlogEditor;
