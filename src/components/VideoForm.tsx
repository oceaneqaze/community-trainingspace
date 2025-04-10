import React, { useState } from 'react';
import ThumbnailUploader from './ThumbnailUploader';
import { useVideoFormData } from './video-form/useVideoFormData';
import BasicVideoDetails from './video-form/BasicVideoDetails';
import FormButtons from './video-form/FormButtons';
import UploadProgress from './video-form/UploadProgress';

const VideoForm: React.FC = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    uploadStatus,
    handleSubmit,
  } = useVideoFormData();

  const [screenRecVideoId, setScreenRecVideoId] = useState('');
  const [screenRecPosterUrl, setScreenRecPosterUrl] = useState('');
  const [previewVideoUrl, setPreviewVideoUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleScreenRecVideoSubmit = () => {
    if (screenRecVideoId && screenRecPosterUrl) {
      const videoUrl = `https://upww.screenrec.com/videos/f_${screenRecVideoId}.mp4/index.m3u8`;
      setPreviewVideoUrl(videoUrl);
      setPreviewImage(screenRecPosterUrl);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
      <BasicVideoDetails
        title={title}
        description={description}
        category={category}
        setTitle={setTitle}
        setDescription={setDescription}
        setCategory={setCategory}
      />

      {/* ScreenRec Video Inputs */}
      <div>
        <label htmlFor="screenRecVideoId">ID de la vidéo ScreenRec</label>
        <input
          type="text"
          id="screenRecVideoId"
          value={screenRecVideoId}
          onChange={(e) => setScreenRecVideoId(e.target.value)}
          className="form-input"
        />
      </div>
      <div>
        <label htmlFor="screenRecPosterUrl">URL du GIF d'aperçu</label>
        <input
          type="text"
          id="screenRecPosterUrl"
          value={screenRecPosterUrl}
          onChange={(e) => setScreenRecPosterUrl(e.target.value)}
          className="form-input"
        />
      </div>
      <button
        type="button"
        onClick={handleScreenRecVideoSubmit}
        className="btn-primary"
      >
        Charger la vidéo ScreenRec
      </button>

      {/* Preview Section */}
      {previewImage && (
        <div>
          <h3>Aperçu</h3>
          <img
            src={previewImage}
            alt="Prévisualisation"
            style={{ width: '100%', maxHeight: '250px', objectFit: 'cover' }}
          />
        </div>
      )}
      {previewVideoUrl && (
        <div>
          <h3>Vidéo chargée</h3>
          <video src={previewVideoUrl} controls width="100%" />
        </div>
      )}

      {/* Upload Progress and Buttons */}
      <UploadProgress progress={uploadStatus.progress} />
      <FormButtons isLoading={uploadStatus.isLoading} />
    </form>
  );
};

export default VideoForm;
