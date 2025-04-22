
import React from 'react';
import { Folder, Video } from 'lucide-react';
import { VideoProps } from '@/components/VideoCard';

interface FileExplorerViewProps {
  videosByCategory: Record<string, VideoProps[]>;
  onVideoClick: (videoId: string) => void;
}

const FileExplorerView: React.FC<FileExplorerViewProps> = ({
  videosByCategory,
  onVideoClick,
}) => {
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="space-y-2">
      {Object.entries(videosByCategory).map(([category, videos]) => (
        <div key={category} className="rounded-lg border bg-card">
          <button
            onClick={() => toggleCategory(category)}
            className="w-full p-3 flex items-center gap-2 hover:bg-accent/50 transition-colors"
          >
            <Folder className="h-5 w-5 text-primary" />
            <span className="font-medium">{category}</span>
            <span className="text-sm text-muted-foreground ml-2">
              ({videos.length})
            </span>
          </button>
          
          {expandedCategories.includes(category) && (
            <div className="p-2 border-t">
              <div className="grid gap-2">
                {videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => onVideoClick(video.id)}
                    className="w-full p-2 flex items-center gap-3 rounded-md hover:bg-accent/50 transition-colors text-left"
                  >
                    <div className="w-16 h-9 relative flex-shrink-0 rounded overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">{video.title}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                        <span>{video.duration}</span>
                        {typeof video.progress === 'number' && (
                          <span className="flex items-center gap-1">
                            •
                            <span>
                              {video.completed ? "Terminée" : `${video.progress}%`}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileExplorerView;
