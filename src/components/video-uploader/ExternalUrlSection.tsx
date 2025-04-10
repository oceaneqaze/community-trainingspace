
import React from 'react';
import { Input } from "@/components/ui/input";
import { Link } from 'lucide-react';

interface ExternalUrlSectionProps {
  externalUrl: string;
  setExternalUrl: (url: string) => void;
  handleExternalUrlSubmit: () => void;
  disabled: boolean;
}

const ExternalUrlSection: React.FC<ExternalUrlSectionProps> = ({
  externalUrl,
  setExternalUrl,
  handleExternalUrlSubmit,
  disabled
}) => {
  return (
    <div className="space-y-2">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="flex flex-col items-center">
          <Link className="h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm font-medium">
            Ajouter un lien vidéo externe
          </p>
          <div className="w-full mt-2 flex gap-2">
            <Input
              type="url"
              placeholder="https://screenrec.com/share/..."
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              disabled={disabled}
            />
            <button
              type="button"
              onClick={handleExternalUrlSubmit}
              className="px-3 py-1 bg-primary text-white rounded-md text-sm"
              disabled={disabled || !externalUrl}
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Formats supportés: liens screenrec.com et autres services de vidéos en ligne
      </p>
    </div>
  );
};

export default ExternalUrlSection;
