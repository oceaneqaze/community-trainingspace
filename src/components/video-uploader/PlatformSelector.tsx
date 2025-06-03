
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { videoPlatforms } from '@/utils/videoPlatforms';
import { Upload, Link } from 'lucide-react';

interface PlatformSelectorProps {
  onPlatformSelect: (platform: string) => void;
  selectedPlatform?: string;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  onPlatformSelect,
  selectedPlatform
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Choisissez la source de votre vidéo</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedPlatform === 'upload' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onPlatformSelect('upload')}
        >
          <CardContent className="flex flex-col items-center p-4 text-center">
            <Upload className="h-8 w-8 text-blue-600 mb-2" />
            <span className="font-medium">Upload local</span>
            <span className="text-xs text-muted-foreground">Fichier depuis PC</span>
          </CardContent>
        </Card>

        {videoPlatforms.map((platform) => (
          <Card 
            key={platform.name}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedPlatform === platform.name.toLowerCase() ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onPlatformSelect(platform.name.toLowerCase())}
          >
            <CardContent className="flex flex-col items-center p-4 text-center">
              <span className="text-3xl mb-2">{platform.icon}</span>
              <span className={`font-medium ${platform.color}`}>{platform.name}</span>
              <span className="text-xs text-muted-foreground">Lien {platform.name}</span>
            </CardContent>
          </Card>
        ))}

        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedPlatform === 'direct' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onPlatformSelect('direct')}
        >
          <CardContent className="flex flex-col items-center p-4 text-center">
            <Link className="h-8 w-8 text-gray-600 mb-2" />
            <span className="font-medium">URL directe</span>
            <span className="text-xs text-muted-foreground">Lien MP4, WebM...</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlatformSelector;
