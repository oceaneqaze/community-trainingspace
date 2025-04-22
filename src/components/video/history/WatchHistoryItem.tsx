
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Award, Check } from 'lucide-react';
import { WatchHistoryItem as WatchHistoryItemType } from '@/hooks/useWatchHistory';
import VideoProgressBar from '@/components/video/VideoProgressBar';
import { formatDuration } from '@/utils/videoUtils';

interface WatchHistoryItemProps {
  item: WatchHistoryItemType;
  onClick: (videoId: string) => void;
}

const WatchHistoryItem: React.FC<WatchHistoryItemProps> = ({ item, onClick }) => {
  // Convert duration string to number if it's a string
  const durationNumber = typeof item.duration === 'string' ? parseInt(item.duration) : item.duration;
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer mb-2"
      onClick={() => onClick(item.id)}
    >
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-48 h-36 sm:h-28">
            <img 
              src={item.thumbnail} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 px-1.5 py-0.5 rounded text-xs text-white">
              {formatDuration(durationNumber)}
            </div>
            {item.completed && (
              <div className="absolute top-1 right-1 bg-green-600 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 p-3">
            <h3 className="font-medium mb-1">{item.title}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <div className="flex items-center mr-3">
                <Clock className="h-4 w-4 mr-1" />
                <span>Visionné le {item.last_watched}</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                <span>{item.category}</span>
              </div>
            </div>
            
            <VideoProgressBar 
              progress={item.progress} 
              completed={item.completed}
              showTooltip={true}
              className="mt-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WatchHistoryItem;
