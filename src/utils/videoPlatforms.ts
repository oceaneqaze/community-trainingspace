
export interface VideoPlatform {
  name: string;
  icon: string;
  color: string;
  detect: (url: string) => boolean;
  extractId: (url: string) => string | null;
  generateEmbedUrl: (id: string) => string;
  generateThumbnailUrl: (id: string) => string;
  extractMetadata?: (url: string) => Promise<{ title?: string; duration?: string; thumbnail?: string }>;
}

export const videoPlatforms: VideoPlatform[] = [
  {
    name: 'YouTube',
    icon: '📺',
    color: 'text-red-600',
    detect: (url: string) => {
      return /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/.test(url);
    },
    extractId: (url: string) => {
      const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      return match ? match[1] : null;
    },
    generateEmbedUrl: (id: string) => `https://www.youtube.com/embed/${id}`,
    generateThumbnailUrl: (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  },
  {
    name: 'Vimeo',
    icon: '🎬',
    color: 'text-blue-500',
    detect: (url: string) => {
      return /vimeo\.com\/(\d+)/.test(url);
    },
    extractId: (url: string) => {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : null;
    },
    generateEmbedUrl: (id: string) => `https://player.vimeo.com/video/${id}`,
    generateThumbnailUrl: (id: string) => `https://vumbnail.com/${id}.jpg`,
  },
  {
    name: 'Loom',
    icon: '🎥',
    color: 'text-purple-600',
    detect: (url: string) => {
      return /loom\.com\/share\/([a-zA-Z0-9]+)/.test(url);
    },
    extractId: (url: string) => {
      const match = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
      return match ? match[1] : null;
    },
    generateEmbedUrl: (id: string) => `https://www.loom.com/embed/${id}`,
    generateThumbnailUrl: (id: string) => `https://cdn.loom.com/sessions/thumbnails/${id}-with-play.gif`,
  },
  {
    name: 'ScreenRec',
    icon: '📱',
    color: 'text-green-600',
    detect: (url: string) => {
      return /screenrec\.com\/share\/([a-zA-Z0-9_-]+)/.test(url);
    },
    extractId: (url: string) => {
      const match = url.match(/screenrec\.com\/share\/([a-zA-Z0-9_-]+)/);
      return match ? match[1] : null;
    },
    generateEmbedUrl: (id: string) => `https://upww.screenrec.com/videos/f_${id}.mp4/index.m3u8`,
    generateThumbnailUrl: (id: string) => `https://upww.screenrec.com/images/f_${id}.gif`,
  },
];

export const detectPlatform = (url: string): VideoPlatform | null => {
  return videoPlatforms.find(platform => platform.detect(url)) || null;
};

export const isDirectVideoUrl = (url: string): boolean => {
  return /\.(mp4|webm|ogg|avi|mov|wmv|flv|3gp)(\?.*)?$/i.test(url);
};

export const extractVideoMetadata = async (url: string): Promise<{
  platform?: VideoPlatform;
  id?: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  duration?: string;
}> => {
  const platform = detectPlatform(url);
  
  if (!platform) {
    return { embedUrl: url };
  }

  const id = platform.extractId(url);
  if (!id) {
    return { platform, embedUrl: url };
  }

  return {
    platform,
    id,
    embedUrl: platform.generateEmbedUrl(id),
    thumbnailUrl: platform.generateThumbnailUrl(id),
  };
};
