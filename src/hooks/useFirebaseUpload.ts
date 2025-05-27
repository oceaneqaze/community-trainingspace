
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/config/firebase';
import { v4 as uuidv4 } from 'uuid';

type UploadStatus = {
  isLoading: boolean;
  progress: number;
  error: string | null;
};

export const useFirebaseUpload = () => {
  const [status, setStatus] = useState<UploadStatus>({
    isLoading: false,
    progress: 0,
    error: null,
  });

  const uploadVideo = async (file: File): Promise<string> => {
    if (!file) throw new Error("Aucun fichier fourni");
    
    setStatus({ isLoading: true, progress: 0, error: null });
    
    try {
      // Créer une référence unique pour le fichier
      const fileExt = file.name.split('.').pop();
      const fileName = `videos/${uuidv4()}.${fileExt}`;
      const storageRef = ref(storage, fileName);
      
      // Créer la tâche d'upload avec suivi de progression
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Calculer le pourcentage de progression
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setStatus(prev => ({ ...prev, progress }));
          },
          (error) => {
            console.error('Erreur d\'upload Firebase:', error);
            setStatus({ isLoading: false, progress: 0, error: error.message });
            reject(error);
          },
          async () => {
            try {
              // Upload terminé avec succès, récupérer l'URL de téléchargement
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setStatus({ isLoading: false, progress: 100, error: null });
              resolve(downloadURL);
            } catch (error: any) {
              setStatus({ isLoading: false, progress: 0, error: error.message });
              reject(error);
            }
          }
        );
      });
    } catch (error: any) {
      setStatus({ isLoading: false, progress: 0, error: error.message });
      throw error;
    }
  };

  const uploadThumbnail = async (file: File): Promise<string> => {
    if (!file) throw new Error("Aucun fichier fourni");
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `thumbnails/${uuidv4()}.${fileExt}`;
      const storageRef = ref(storage, fileName);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Pour les thumbnails, on peut ignorer la progression
          },
          (error) => {
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      throw error;
    }
  };

  return {
    uploadVideo,
    uploadThumbnail,
    status,
  };
};
