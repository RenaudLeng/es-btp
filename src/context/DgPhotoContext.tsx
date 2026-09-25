import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultDgPhoto from '../assets/images/official_dg_sekoula.jpg';

interface DgPhotoContextType {
  dgPhotoUrl: string;
  isCustomPhoto: boolean;
  uploadDgPhoto: (file: File) => Promise<void>;
  resetDgPhoto: () => void;
}

const STORAGE_KEY_DG_PHOTO = 'es_btp_dg_custom_photo';

const DgPhotoContext = createContext<DgPhotoContextType | undefined>(undefined);

export const DgPhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DG_PHOTO);
      if (stored) {
        setCustomPhotoUrl(stored);
      }
    } catch {
      // Ignore
    }
  }, []);

  const uploadDgPhoto = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Veuillez sélectionner un fichier image valide'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setCustomPhotoUrl(result);
          try {
            localStorage.setItem(STORAGE_KEY_DG_PHOTO, result);
          } catch (err) {
            console.warn('LocalStorage quota exceeded', err);
          }
          resolve();
        } else {
          reject(new Error('Erreur de lecture du fichier'));
        }
      };
      reader.onerror = () => reject(new Error("Erreur lors du chargement de l'image"));
      reader.readAsDataURL(file);
    });
  };

  const resetDgPhoto = () => {
    setCustomPhotoUrl(null);
    try {
      localStorage.removeItem(STORAGE_KEY_DG_PHOTO);
    } catch {
      // Ignore
    }
  };

  return (
    <DgPhotoContext.Provider
      value={{
        dgPhotoUrl: customPhotoUrl || defaultDgPhoto,
        isCustomPhoto: Boolean(customPhotoUrl),
        uploadDgPhoto,
        resetDgPhoto,
      }}
    >
      {children}
    </DgPhotoContext.Provider>
  );
};

export const useDgPhoto = () => {
  const context = useContext(DgPhotoContext);
  if (!context) {
    throw new Error('useDgPhoto must be used within a DgPhotoProvider');
  }
  return context;
};
