import { useRef } from 'react';
import {
  useOverrideBackdropMutation,
  useUploadBackdropMutation,
  useOverridePosterMutation,
  useUploadPosterMutation,
  useOverrideLogoMutation,
  useUploadLogoMutation,
  useOverridePersonProfileMutation,
  useUploadPersonProfileMutation,
  useOverridePersonBackdropMutation,
  useUploadPersonBackdropMutation,
  useOverrideStudioLogoMutation,
  useUploadStudioLogoMutation,
} from '@/queries';

export default function useImagePicker({
  entityId,
  entityType = 'movie',
  imageType = 'backdrop',
  toast,
  t,
  onClose,
  closeOnSelect = true,
  overrideMutation: customOverrideMutation,
  uploadMutation: customUploadMutation,
  onSaveSuccess,
  onUploadSuccess,
  onBeforeSave,
}) {
  const overrideBackdropMutation = useOverrideBackdropMutation();
  const uploadBackdropMutation = useUploadBackdropMutation();
  const overridePosterMutation = useOverridePosterMutation();
  const uploadPosterMutation = useUploadPosterMutation();
  const overrideLogoMutation = useOverrideLogoMutation();
  const uploadLogoMutation = useUploadLogoMutation();
  const overridePersonProfileMutation = useOverridePersonProfileMutation();
  const uploadPersonProfileMutation = useUploadPersonProfileMutation();
  const overridePersonBackdropMutation = useOverridePersonBackdropMutation();
  const uploadPersonBackdropMutation = useUploadPersonBackdropMutation();
  const overrideStudioLogoMutation = useOverrideStudioLogoMutation();
  const uploadStudioLogoMutation = useUploadStudioLogoMutation();

  const getOverrideMutation = () => {
    if (customOverrideMutation) return customOverrideMutation;
    if (imageType === 'backdrop') {
      if (entityType === 'person') return overridePersonBackdropMutation;
      return overrideBackdropMutation;
    }
    if (imageType === 'poster') return overridePosterMutation;
    if (imageType === 'logo') {
      if (entityType === 'studio') return overrideStudioLogoMutation;
      return overrideLogoMutation;
    }
    if (imageType === 'profile' && entityType === 'person') return overridePersonProfileMutation;
    return null;
  };

  const getUploadMutation = () => {
    if (customUploadMutation) return customUploadMutation;
    if (imageType === 'backdrop') {
      if (entityType === 'person') return uploadPersonBackdropMutation;
      return uploadBackdropMutation;
    }
    if (imageType === 'poster') return uploadPosterMutation;
    if (imageType === 'logo') {
      if (entityType === 'studio') return uploadStudioLogoMutation;
      return uploadLogoMutation;
    }
    if (imageType === 'profile' && entityType === 'person') return uploadPersonProfileMutation;
    return null;
  };

  const overrideMutation = getOverrideMutation();
  const uploadMutation = getUploadMutation();

  const isPending =
    overrideMutation?.isPending ||
    uploadMutation?.isPending ||
    (!customOverrideMutation && (
      overrideBackdropMutation.isPending ||
      overridePosterMutation.isPending ||
      overrideLogoMutation.isPending ||
      overridePersonProfileMutation.isPending ||
      overridePersonBackdropMutation.isPending ||
      overrideStudioLogoMutation.isPending
    )) ||
    (!customUploadMutation && (
      uploadBackdropMutation.isPending ||
      uploadPosterMutation.isPending ||
      uploadLogoMutation.isPending ||
      uploadPersonProfileMutation.isPending ||
      uploadPersonBackdropMutation.isPending ||
      uploadStudioLogoMutation.isPending
    ));

  const latestPathRef = useRef(null);

  const handleSaveUrl = async (pathOrUrl) => {
    if (!overrideMutation) return;
    latestPathRef.current = pathOrUrl;

    if (onBeforeSave) {
      await onBeforeSave(pathOrUrl);
    }

    try {
      if (customOverrideMutation) {
        await overrideMutation.mutateAsync({
          personId: entityId,
          backdropPath: pathOrUrl,
        });
      } else if (imageType === 'profile' && entityType === 'person') {
        await overrideMutation.mutateAsync({
          personId: entityId,
          profilePath: pathOrUrl,
        });
      } else if (imageType === 'backdrop' && entityType === 'person') {
        await overrideMutation.mutateAsync({
          personId: entityId,
          backdropPath: pathOrUrl,
        });
      } else if (imageType === 'logo' && entityType === 'studio') {
        await overrideMutation.mutateAsync({
          studioId: entityId,
          logoPath: pathOrUrl,
        });
      } else {
        await overrideMutation.mutateAsync({
          itemId: entityId,
          [imageType === 'backdrop' ? 'backdropPath' : imageType === 'poster' ? 'posterPath' : 'logoPath']: pathOrUrl,
          mediaType: entityType,
        });
      }

      if (latestPathRef.current === pathOrUrl) {
        toast?.(t?.('library.details.imageUpdated') || 'Image updated successfully!', 'success');

        if (onSaveSuccess) {
          onSaveSuccess(pathOrUrl);
        }

        if (closeOnSelect) {
          onClose?.();
        }
      }
    } catch (err) {
      if (latestPathRef.current === pathOrUrl) {
        toast?.(err.message || t?.('library.details.imageUpdateFailed') || 'Failed to update image', 'danger');
      }
    }
  };

  const handleUploadFile = async (file) => {
    if (!file || !uploadMutation || isPending) return;
    try {
      let data;
      if (customUploadMutation) {
        data = await uploadMutation.mutateAsync({
          personId: entityId,
          file,
        });
      } else if (imageType === 'profile' && entityType === 'person') {
        data = await uploadMutation.mutateAsync({
          personId: entityId,
          file,
        });
      } else if (imageType === 'backdrop' && entityType === 'person') {
        data = await uploadMutation.mutateAsync({
          personId: entityId,
          file,
        });
      } else if (imageType === 'logo' && entityType === 'studio') {
        data = await uploadMutation.mutateAsync({
          studioId: entityId,
          file,
        });
      } else {
        data = await uploadMutation.mutateAsync({
          itemId: entityId,
          file,
          mediaType: entityType,
        });
      }

      toast?.(t?.('library.details.imageUploaded') || 'Image uploaded and updated successfully!', 'success');
      
      if (onUploadSuccess) {
        onUploadSuccess(data);
      }

      if (closeOnSelect) {
        onClose?.();
      }
    } catch (err) {
      toast?.(err.message || t?.('library.details.imageUploadFailed') || 'Failed to upload image', 'danger');
    }
  };

  return {
    isPending,
    handleSaveUrl,
    handleUploadFile,
  };
}
