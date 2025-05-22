
import React, { useRef, useEffect } from 'react';

interface EditorContentProps {
  content: string;
  onContentChange: () => void;
  isInitialized: boolean;
  setIsInitialized: (value: boolean) => void;
}

const EditorContent: React.FC<EditorContentProps> = ({ 
  content, 
  onContentChange, 
  isInitialized,
  setIsInitialized
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = content;
      setIsInitialized(true);
    }
  }, [content, isInitialized, setIsInitialized]);

  return (
    <div
      ref={editorRef}
      contentEditable
      className="min-h-[500px] p-4 focus:outline-none prose prose-sm max-w-none"
      onInput={onContentChange}
      onBlur={onContentChange}
    />
  );
};

export default EditorContent;
