
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
    document.execCommand(command, false, value ? value.toString() : '');
    handleContentChange();
  };

  const handleInsertImage = () => {
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

  return (
    <div className="space-y-6">
      <ThumbnailUploader
        onThumbnailChange={(file, previewUrl) => onImageUpload(file!, previewUrl)}
      />
      
      <div className="border border-gray-200 rounded-md shadow-sm">
        {/* Barre d'outils */}
        <div className="bg-gray-50 p-2 border-b border-gray-200 flex flex-wrap gap-1">
          <Button variant="outline" size="sm" onClick={() => execCommand('bold')} title="Gras">
            <b>G</b>
          </Button>
          <Button variant="outline" size="sm" onClick={() => execCommand('italic')} title="Italique">
            <i>I</i>
          </Button>
          <Button variant="outline" size="sm" onClick={() => execCommand('underline')} title="Souligné">
            <u>S</u>
          </Button>
          
          <div className="h-6 border-r border-gray-300 mx-1" />
          
          <Button variant="outline" size="sm" onClick={() => execCommand('justifyLeft')} title="Aligner à gauche">
            ⟨⟨
          </Button>
          <Button variant="outline" size="sm" onClick={() => execCommand('justifyCenter')} title="Centrer">
            ≡
          </Button>
          <Button variant="outline" size="sm" onClick={() => execCommand('justifyRight')} title="Aligner à droite">
            ⟩⟩
          </Button>
          
          <div className="h-6 border-r border-gray-300 mx-1" />
          
          <Button variant="outline" size="sm" onClick={() => execCommand('insertUnorderedList')} title="Liste à puces">
            • Liste
          </Button>
          <Button variant="outline" size="sm" onClick={() => execCommand('insertOrderedList')} title="Liste numérotée">
            1. Liste
          </Button>
          
          <div className="h-6 border-r border-gray-300 mx-1" />
          
          <Button variant="outline" size="sm" onClick={handleInsertImage} title="Insérer une image">
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
          
          <Button variant="outline" size="sm" onClick={() => execCommand('createLink', prompt('URL du lien:'))} title="Insérer un lien">
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
