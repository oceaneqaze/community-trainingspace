
import React from 'react';
import { Input } from "@/components/ui/input";
import { FileVideo } from 'lucide-react';

interface FileUploadSectionProps {
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({ 
  handleVideoChange,
  disabled
}) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
      <div className="flex flex-col items-center">
        <FileVideo className="h-8 w-8 text-gray-400" />
        <label
          htmlFor="video-upload"
          className="mt-2 block text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
        >
          Cliquez pour télécharger une vidéo
          <Input
            id="video-upload"
            type="file"
            accept="video/*"
            className="sr-only"
            onChange={handleVideoChange}
            disabled={disabled}
          />
        </label>
        <p className="mt-1 text-xs text-gray-500">
          MP4, WEBM, MOV jusqu'à 1GB
        </p>
      </div>
    </div>
  );
};

export default FileUploadSection;
