
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Link, AlertCircle } from 'lucide-react';
import { videoPlatforms, detectPlatform, extractVideoMetadata, isDirectVideoUrl } from '@/utils/videoPlatforms';
import { toast } from "@/components/ui/use-toast";
import FileUploadSection from './FileUploadSection';

interface MultiPlatformVideoUploaderProps {
  onVideoData: (data: {
    videoUrl: string;
    thumbnailUrl?: string;
    platform?: string;
    title?: string;
    duration?: string;
  }) => void;
  onFileUpload?: (file: File) => void;
  disabled?: boolean;
}

const MultiPlatformVideoUploader: React.FC<MultiPlatformVideoUploaderProps> = ({
  onVideoData,
  onFileUpload,
  disabled = false
}) => {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);

  const handleUrlChange = (value: string) => {
    setUrl(value);
    const platform = detectPlatform(value);
    setDetectedPlatform(platform ? platform.name : null);
  };

  const handleUrlSubmit = async () => {
    if (!url.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une URL valide",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const metadata = await extractVideoMetadata(url);
      
      setPreviewData({
        url: url,
        embedUrl: metadata.embedUrl,
        thumbnailUrl: metadata.thumbnailUrl,
        platform: metadata.platform?.name,
        title: metadata.title,
        duration: metadata.duration,
      });

      onVideoData({
        videoUrl: metadata.embedUrl || url,
        thumbnailUrl: metadata.thumbnailUrl,
        platform: metadata.platform?.name,
        title: metadata.title,
        duration: metadata.duration,
      });

      toast({
        title: "Succès",
        description: `Vidéo ${metadata.platform?.name || 'externe'} ajoutée avec succès`,
      });
    } catch (error) {
      console.error('Erreur lors du traitement de la vidéo:', error);
      toast({
        title: "Erreur",
        description: "Impossible de traiter cette URL vidéo",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onFileUpload) {
      onFileUpload(e.target.files[0]);
    }
  };

  const handlePlatformTabClick = (platformName: string) => {
    setActiveTab(platformName.toLowerCase());
    setUrl('');
    setDetectedPlatform(null);
    setPreviewData(null);
  };

  const clearPreview = () => {
    setUrl('');
    setDetectedPlatform(null);
    setPreviewData(null);
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Source de la vidéo</Label>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-4">
          <TabsTrigger value="upload" className="flex items-center gap-1 text-xs">
            <Upload className="h-3 w-3" />
            Upload
          </TabsTrigger>
          {videoPlatforms.map((platform) => (
            <TabsTrigger 
              key={platform.name.toLowerCase()}
              value={platform.name.toLowerCase()}
              className="flex items-center gap-1 text-xs"
              onClick={() => handlePlatformTabClick(platform.name)}
            >
              <span>{platform.icon}</span>
              {platform.name}
            </TabsTrigger>
          ))}
          <TabsTrigger value="direct" className="flex items-center gap-1 text-xs">
            <Link className="h-3 w-3" />
            URL directe
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <FileUploadSection 
            handleVideoChange={handleFileChange}
            disabled={disabled}
          />
        </TabsContent>

        {videoPlatforms.map((platform) => (
          <TabsContent key={platform.name.toLowerCase()} value={platform.name.toLowerCase()}>
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className={`flex items-center gap-2 text-lg ${platform.color}`}>
                  <span className="text-2xl">{platform.icon}</span>
                  Ajouter une vidéo {platform.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`${platform.name.toLowerCase()}-url`}>
                    URL de la vidéo {platform.name}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id={`${platform.name.toLowerCase()}-url`}
                      value={url}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder={`Collez votre lien ${platform.name} ici...`}
                      disabled={disabled || isProcessing}
                    />
                    <Button 
                      onClick={handleUrlSubmit}
                      disabled={!url || disabled || isProcessing}
                      className="shrink-0"
                    >
                      {isProcessing ? 'Traitement...' : 'Ajouter'}
                    </Button>
                  </div>
                  
                  {detectedPlatform && detectedPlatform !== platform.name && (
                    <div className="flex items-center gap-2 text-amber-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      Cette URL semble être une vidéo {detectedPlatform}
                    </div>
                  )}
                </div>

                {previewData && previewData.platform === platform.name && (
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Aperçu de la vidéo</h4>
                      <Button variant="ghost" size="sm" onClick={clearPreview}>
                        ×
                      </Button>
                    </div>
                    {previewData.thumbnailUrl && (
                      <img 
                        src={previewData.thumbnailUrl} 
                        alt="Aperçu"
                        className="w-full max-w-sm rounded-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      Plateforme: {previewData.platform}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="direct">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Link className="h-5 w-5" />
                URL directe de vidéo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="direct-url">
                  URL directe (.mp4, .webm, etc.)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="direct-url"
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://example.com/video.mp4"
                    disabled={disabled || isProcessing}
                  />
                  <Button 
                    onClick={handleUrlSubmit}
                    disabled={!url || disabled || isProcessing}
                    className="shrink-0"
                  >
                    {isProcessing ? 'Traitement...' : 'Ajouter'}
                  </Button>
                </div>
                
                {url && !isDirectVideoUrl(url) && !detectPlatform(url) && (
                  <div className="flex items-center gap-2 text-amber-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    Cette URL ne semble pas être un fichier vidéo direct
                  </div>
                )}
              </div>

              {previewData && !previewData.platform && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Vidéo ajoutée</h4>
                    <Button variant="ghost" size="sm" onClick={clearPreview}>
                      ×
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    URL: {previewData.url}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiPlatformVideoUploader;
