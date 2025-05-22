
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { execCommand } from './editorUtils';

interface EditorToolbarProps {
  onInsertImage: (e: React.MouseEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ onInsertImage, fileInputRef }) => {
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
        onClick={onInsertImage} 
        title="Insérer une image"
      >
        🖼️ Image
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
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
  );
};

export default EditorToolbar;
