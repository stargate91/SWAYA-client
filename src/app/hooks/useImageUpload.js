import { useRef, useState, useCallback } from 'react';

/**
 * Hook for managing image file uploads, file reader previews, and URL input state.
 */
export function useImageUpload({ onUploadFile, onSaveUrl } = {}) {
  const fileInputRef = useRef(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [urlInput, setUrlInput] = useState('');

  const processFile = useCallback(
    (file) => {
      if (!file) return;

      setUploadFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result);
      };
      reader.readAsDataURL(file);

      if (onUploadFile) {
        void onUploadFile(file);
      }
    },
    [onUploadFile]
  );

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const handleDropFiles = useCallback(
    (files) => {
      const file = files?.[0];
      if (file && file.type?.startsWith('image/')) {
        processFile(file);
      }
    },
    [processFile]
  );

  const handleSaveUrl = useCallback(() => {
    if (!onSaveUrl) return;
    const trimmedUrl = urlInput.trim();
    if (trimmedUrl) {
      void onSaveUrl(trimmedUrl);
    }
  }, [onSaveUrl, urlInput]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    fileInputRef,
    uploadFile,
    uploadPreview,
    hasUploadPreview: Boolean(uploadPreview),
    urlInput,
    setUrlInput,
    handleFileChange,
    handleDropFiles,
    handleSaveUrl,
    triggerFileInput,
  };
}

export default useImageUpload;
