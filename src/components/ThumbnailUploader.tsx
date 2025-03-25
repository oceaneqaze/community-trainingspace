
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from 'lucide-react';

interface ThumbnailUploaderProps {
  initialPreview?: string;
  disabled?: boolean;
  onThumbnailChange: (file: File | null, previewUrl: string) => void;
}

const ThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({ 
  initialPreview = '', 
  disabled = false, 
  onThumbnailChange 
}) => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(initialPreview);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const previewUrl = event.target.result as string;
          setThumbnailPreview(previewUrl);
          onThumbnailChange(file, previewUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearThumbnail = () => {
    setThumbnailPreview('');
    onThumbnailChange(null, '');
  };

  return (
    <div>
      <Label htmlFor="thumbnail">Miniature</Label>
      
      {!thumbnailPreview ? (
        <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400" />
            <label
              htmlFor="thumbnail-upload"
              className="mt-2 block text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Cliquez pour télécharger une image
              <Input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleThumbnailChange}
                disabled={disabled}
              />
            </label>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF jusqu'à 5MB
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-1 relative">
          <img
            src={thumbnailPreview}
            alt="Thumbnail preview"
            className="h-40 object-cover rounded-md"
          />
          <button
            type="button"
            onClick={clearThumbnail}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            disabled={disabled}
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ThumbnailUploader;
