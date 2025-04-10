import React, { useState, useEffect } from 'react';
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
  const [videoId, setVideoId] = useState<string>(''); // L'ID de la vidéo ScreenRec
  const [previewImage, setPreviewImage] = useState<string>(''); // L'URL de prévisualisation (GIF)

  // Fonction pour extraire l'ID de la vidéo à partir de l'URL de ScreenRec
  const extractVideoId = (url: string) => {
    const regex = /screenrec\.com\/share\/([a-zA-Z0-9_-]+)/; // Regex pour extraire l'ID
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  // Met à jour l'ID vidéo et l'URL de prévisualisation lorsqu'une URL valide est saisie
  useEffect(() => {
    if (externalUrl) {
      const id = extractVideoId(externalUrl);
      setVideoId(id);

      if (id) {
        // Générez l'URL de prévisualisation pour ScreenRec à partir de l'ID
        const previewUrl = `https://upww.screenrec.com/share/${id}.gif`;
        setPreviewImage(previewUrl); // Mettez à jour l'URL de prévisualisation
      }
    }
  }, [externalUrl]);

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

      {/* Affichage de l'aperçu si un ID valide est trouvé */}
      {previewImage && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Aperçu de la vidéo</h3>
          <img
            src={previewImage}
            alt="Aperçu de la vidéo"
            className="mt-2 w-full max-w-xs rounded-lg shadow-md"
          />
        </div>
      )}

      <p className="text-xs text-gray-500">
        Formats supportés: liens screenrec.com et autres services de vidéos en ligne
      </p>
    </div>
  );
};

export default ExternalUrlSection;
