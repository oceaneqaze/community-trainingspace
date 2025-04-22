
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ThumbnailUploader from '@/components/ThumbnailUploader';

interface BlogEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onImageUpload: (file: File, previewUrl: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ content, onContentChange, onImageUpload }) => {
  return (
    <div className="space-y-6">
      <ThumbnailUploader 
        onThumbnailChange={(file, previewUrl) => onImageUpload(file!, previewUrl)} 
      />
      
      <Editor
        apiKey="your-tinymce-api-key"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        value={content}
        onEditorChange={onContentChange}
      />
    </div>
  );
};

export default BlogEditor;
