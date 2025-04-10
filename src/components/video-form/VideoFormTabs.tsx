
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoResourcesManager from '@/components/resources/VideoResourcesManager';

interface VideoFormTabsProps {
  videoId: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const VideoFormTabs: React.FC<VideoFormTabsProps> = ({ 
  videoId, 
  activeTab, 
  setActiveTab, 
  children 
}) => {
  return (
    <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="mb-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Détails de la vidéo</TabsTrigger>
        <TabsTrigger value="resources">Documents PDF</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details">
        {children}
      </TabsContent>
      
      <TabsContent value="resources">
        <VideoResourcesManager videoId={videoId} />
      </TabsContent>
    </Tabs>
  );
};

export default VideoFormTabs;
