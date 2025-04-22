
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ThumbnailUploader from '@/components/ThumbnailUploader';

interface BlogEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onImageUpload: (file: File, previewUrl: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ content, onContentChange, onImageUpload }) => {
  const editorRef = useRef(null);

  return (
    <div className="space-y-6">
      <ThumbnailUploader 
        onThumbnailChange={(file, previewUrl) => onImageUpload(file!, previewUrl)} 
      />
      
      <Editor
        apiKey="b2e7b22dcdf2377ea14e48ea9f455339c892373c0757465bf48fa4bc8c2a3a1b"
        onInit={(evt, editor) => editorRef.current = editor}
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
            'removeformat | image | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          language: 'fr_FR',
          language_url: '/tinymce/langs/fr_FR.js',
          file_picker_types: 'image',
          images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
            try {
              const file = new File([blobInfo.blob()], blobInfo.filename());
              const previewUrl = URL.createObjectURL(file);
              onImageUpload(file, previewUrl);
              resolve(previewUrl);
            } catch (e) {
              reject('Erreur lors du téléchargement de l\'image');
            }
          })
        }}
        value={content}
        onEditorChange={onContentChange}
      />
    </div>
  );
};

export default BlogEditor;
