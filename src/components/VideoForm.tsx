
import React, { useState } from 'react';
import ThumbnailUploader from './ThumbnailUploader';
import { useVideoFormData } from './video-form/useVideoFormData';
import BasicVideoDetails from './video-form/BasicVideoDetails';
import FormButtons from './video-form/FormButtons';
import UploadProgress from './video-form/UploadProgress';
import VideoUploader from './VideoUploader';
import VideoPlayer from './video/VideoPlayer';

const VideoForm: React.FC = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    duration,
    uploadStatus,
    handleSubmit,
    handleVideoChange,
    handleDurationExtracted,
    handleExternalUrlChange,
  } = useVideoFormData();

  const [screenRecVideoId, setScreenRecVideoId] = useState('');
  const [screenRecPosterUrl, setScreenRecPosterUrl] = useState('');
  const [previewVideoUrl, setPreviewVideoUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleScreenRecVideoSubmit = () => {
    if (screenRecVideoId && screenRecPosterUrl) {
      // Construire l'URL de la vidéo au format m3u8
      const videoUrl = `https://upww.screenrec.com/videos/f_${screenRecVideoId}.mp4/index.m3u8`;
      setPreviewVideoUrl(videoUrl);
      setPreviewImage(screenRecPosterUrl);
      
      // Passer l'URL externe au gestionnaire de formulaire
      if (handleExternalUrlChange) {
        handleExternalUrlChange(videoUrl);
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, () => {})} className="space-y-4">
      <BasicVideoDetails
        title={title}
        description={description}
        category={category}
        duration={duration}
        isLoading={uploadStatus.isLoading}
        setTitle={setTitle}
        setDescription={setDescription}
        setCategory={setCategory}
      />

      {/* Section d'upload vidéo standard */}
      <div className="mb-6">
        <VideoUploader 
          onVideoChange={handleVideoChange} 
          onDurationExtracted={handleDurationExtracted} 
          onExternalUrlChange={handleExternalUrlChange}
          screenRecVideoId={screenRecVideoId}
          screenRecPosterUrl={screenRecPosterUrl}
        />
      </div>

      {/* Section ScreenRec simplifiée */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">Ajouter une vidéo ScreenRec</h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="screenRecVideoId" className="block text-sm font-medium text-gray-700">
              ID de la vidéo ScreenRec
            </label>
            <input
              type="text"
              id="screenRecVideoId"
              value={screenRecVideoId}
              onChange={(e) => setScreenRecVideoId(e.target.value)}
              placeholder="Ex: ixnzbml6CrZtDj8THq20haXUWLOdKypk"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
            <p className="text-xs text-gray-500 mt-1">
              Extracte l'ID depuis le lien partagé ScreenRec
            </p>
          </div>
          <div>
            <label htmlFor="screenRecPosterUrl" className="block text-sm font-medium text-gray-700">
              URL du GIF d'aperçu
            </label>
            <input
              type="text"
              id="screenRecPosterUrl"
              value={screenRecPosterUrl}
              onChange={(e) => setScreenRecPosterUrl(e.target.value)}
              placeholder="https://upww.screenrec.com/images/f_XXXX.gif"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <button
            type="button"
            onClick={handleScreenRecVideoSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Prévisualiser la vidéo
          </button>
        </div>
      </div>

      {/* Section de prévisualisation */}
      {previewVideoUrl && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-medium mb-3">Prévisualisation</h3>
          <VideoPlayer videoUrl={previewVideoUrl} poster={previewImage} />
        </div>
      )}

      {/* Progression et boutons */}
      <UploadProgress progress={uploadStatus.progress} />
      <FormButtons 
        isLoading={uploadStatus.isLoading} 
        uploadLoading={uploadStatus.isLoading} 
        isEdit={false} 
      />
    </form>
  );
};

export default VideoForm;
