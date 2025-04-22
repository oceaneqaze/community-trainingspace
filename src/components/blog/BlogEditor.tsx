
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
        apiKey="votre-clé-api-tinymce"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
            'image'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | image | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          file_picker_types: 'image',
          images_upload_handler: async (blobInfo, success, failure) => {
            try {
              const file = new File([blobInfo.blob()], blobInfo.filename());
              const previewUrl = URL.createObjectURL(file);
              onImageUpload(file, previewUrl);
              success(previewUrl);
            } catch (e) {
              failure('Erreur lors du téléchargement de l\'image');
            }
          }
        }}
        value={content}
        onEditorChange={onContentChange}
      />
    </div>
  );
};

export default BlogEditor;
