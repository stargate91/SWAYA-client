import Button from '@/ui/Button';
import ImageUploadPanel from '@/ui/ImageUploadPanel';
import ImagePickerDrawer from '@/components/drawers/ImagePickerDrawer';
import Stack from '@/ui/Stack';

export default function ListImageSelectorDrawer({
  isOpen,
  onClose,
  list,
  state,
}) {
  return (
    <ImagePickerDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={state.t('lists.edit_image_title') || 'Edit List Image'}
    >
      <Stack gap="xl">
        <ImageUploadPanel
          aspect="landscape"
          label={state.t('lists.upload_image_label') || 'Upload custom cover image'}
          isLoading={state.uploadImageMutation.isPending}
          onUploadFile={(file) => {
            state.uploadImageMutation.mutate(
              { listId: list.id, file },
              { onSuccess: onClose }
            );
          }}
        />
        {list?.custom_image_path && (
          <Button
            variant="secondary-neutral"
            fullWidth
            onClick={() => {
              state.overrideImageMutation.mutate(
                { listId: list.id, path: null },
                { onSuccess: onClose }
              );
            }}
            disabled={state.overrideImageMutation.isPending || state.uploadImageMutation.isPending}
          >
            {state.t('lists.reset_to_default_collage') || 'Reset to Default Collage'}
          </Button>
        )}
      </Stack>
    </ImagePickerDrawer>
  );
}
