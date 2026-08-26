import { useRef, useState, useCallback } from 'react';
import { useUploadAvatarMutation } from '@/queries/settingsMutations';

export function useAvatarUpload({ onAvatarUploaded, t, fallbackError = 'Avatar upload failed.' } = {}) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const uploadAvatarMutation = useUploadAvatarMutation();

  const handleAvatarUpload = useCallback(async (event) => {
    const file = event?.target?.files?.[0];
    if (event?.target) {
      event.target.value = '';
    }
    if (!file) return;

    setIsUploading(true);
    setError('');
    try {
      const result = await uploadAvatarMutation.mutateAsync(file);
      if (result?.avatar_path && onAvatarUploaded) {
        onAvatarUploaded(result.avatar_path);
      }
      return result;
    } catch (uploadError) {
      const defaultErr = t
        ? (t('settingsPage.sections.profile.avatarUploadFailed') || fallbackError)
        : fallbackError;
      setError(uploadError.message || defaultErr);
    } finally {
      setIsUploading(false);
    }
  }, [fallbackError, onAvatarUploaded, t, uploadAvatarMutation]);

  const triggerUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return {
    fileInputRef,
    isUploading: isUploading || uploadAvatarMutation.isPending,
    error,
    setError,
    clearError,
    handleAvatarUpload,
    triggerUpload,
  };
}

export default useAvatarUpload;
