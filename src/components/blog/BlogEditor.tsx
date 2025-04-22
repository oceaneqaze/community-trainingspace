
import React, { useRef, useState, useEffect } from 'react';
import ThumbnailUploader from '@/components/ThumbnailUploader';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface BlogEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onImageUpload: (file: File, previewUrl: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ content, onContentChange, onImageUpload }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = content;
      setIsInitialized(true);
    }
  }, [content, isInitialized]);

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      onContentChange(newContent);
    }
  };

  const execCommand = (command: string, value: string | boolean = false) => {
    // Prévenir le comportement par défaut et la propagation de l'événement
    document.execCommand(command, false, value ? value.toString() : '');
    handleContentChange();
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
          execCommand('insertHTML', `<img src="${previewUrl}" alt="Image insérée" style="max-width: 100%;" />`);
          
          // Déclencher la fonction de téléchargement
          onImageUpload(file, previewUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = (e: React.MouseEvent, command: string, value?: string | boolean) => {
    e.preventDefault(); // Empêcher la soumission du formulaire
    execCommand(command, value);
  };

  const handleLinkInsert = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêcher la soumission du formulaire
    const url = prompt('URL du lien:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  return (
    <div className="space-y-6">
      <ThumbnailUploader
        onThumbnailChange={(file, previewUrl) => onImageUpload(file!, previewUrl)}
      />
      
      <div className="border border-gray-200 rounded-md shadow-sm">
        {/* Barre d'outils */}
        <div className="bg-gray-50 p-2 border-b border-gray-200 flex flex-wrap gap-1">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={(e) => handleButtonClick(e, 'bold')} 
            title="Gras"
          >
            <b>G</b>
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={(e) => handleButtonClick(e, 'italic')} 
            title="Italique"
          >
            <i>I</i>
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={(e) => handleButtonClick(e, 'underline')} 
            title="Souligné"
          >
            <u>S</u>
          </Button>
          
          <div className="h-6 border-r border-gray-300 mx-1" />
          
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={(e) => handleButtonClick(e, 'justifyLeft')} 
            title="Aligner à gauche"
          >
            ⟨⟨
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={(e) => handleButtonClick(e, 'justifyCenter')} 
            title="Centrer"
          >
            ≡
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={(e) => handleButtonClick(e, 'justifyRight')} 
            title="Aligner à droite"
          >
            ⟩⟩
          </Button>
          
          <div className="h-6 border-r border-gray-300 mx-1" />
          
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={(e) => handleButtonClick(e, 'insertUnorderedList')} 
            title="Liste à puces"
          >
            • Liste
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={(e) => handleButtonClick(e, 'insertOrderedList')} 
            title="Liste numérotée"
          >
            1. Liste
          </Button>
          
          <div className="h-6 border-r border-gray-300 mx-1" />
          
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleInsertImage} 
            title="Insérer une image"
          >
            🖼️ Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          
          <div className="h-6 border-r border-gray-300 mx-1" />
          
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleLinkInsert} 
            title="Insérer un lien"
          >
            🔗 Lien
          </Button>
        </div>
        
        {/* Zone d'édition */}
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[500px] p-4 focus:outline-none prose prose-sm max-w-none"
          onInput={handleContentChange}
          onBlur={handleContentChange}
        />
      </div>
    </div>
  );
};

export default BlogEditor;
