
import React from 'react';
import { Input } from "@/components/ui/input";
import { FileVideo, Upload } from 'lucide-react';

interface FileUploadSectionProps {
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({ 
  handleVideoChange,
  disabled
}) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary/50 transition-colors">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <label
          htmlFor="video-upload"
          className="block text-center cursor-pointer"
        >
          <span className="text-lg font-medium text-primary hover:text-primary/80 transition-colors">
            Télécharger une vidéo depuis votre PC
          </span>
          <Input
            id="video-upload"
            type="file"
            accept="video/*"
            className="sr-only"
            onChange={handleVideoChange}
            disabled={disabled}
          />
        </label>
        <p className="mt-2 text-sm text-gray-500 text-center">
          <FileVideo className="inline h-4 w-4 mr-1" />
          MP4, WEBM, MOV, AVI jusqu'à 10GB
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Les vidéos seront stockées de manière sécurisée sur Firebase Storage
        </p>
      </div>
    </div>
  );
};

export default FileUploadSection;
