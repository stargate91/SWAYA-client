import UniversalImageGrid from './entityDetail/UniversalImageGrid';
import SegmentedControl from '@/ui/SegmentedControl';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Grid from '@/ui/Grid';
import Inline from '@/ui/Inline';
import ImageUploadPanel from '@/ui/ImageUploadPanel';
import { resolveMediaImageUrl, pathsMatch } from '@/lib/imageUrls';
import PersonBackdropPicker from './entityDetail/PersonBackdropPicker';
import SelectableCard from '@/ui/SelectableCard';
import useUniversalImagePickerState from '../hooks/useUniversalImagePickerState';

const DEFAULT_TEXT_LETTERS = 'Aa';

export default function UniversalImagePicker({
  entityId,
  tmdbId,
  imageType = 'backdrop',
  entityType = 'movie',
  currentPath,
  t,
  toast,
  onClose,
  closeOnSelect = true,
  externalIds,
  item,
}) {
  const {
    sources,
    selectedPath,
    imageSource,
    setImageSource,
    isPending,
    isPersonBackdrop,
    isScene,
    imageLookupId,
    logoOptions,
    sceneImageOptions,
    handleSelectTmdbImage,
    handleSelectDefaultText,
    handleUploadFile,
  } = useUniversalImagePickerState({
    entityId,
    tmdbId,
    imageType,
    entityType,
    currentPath,
    t,
    toast,
    onClose,
    closeOnSelect,
    externalIds,
    item,
  });

  if (isPersonBackdrop) {
    return (
      <PersonBackdropPicker
        personId={entityId}
        item={item}
        t={t}
        toast={toast}
      />
    );
  }

  return (
    <Stack gap="md" fullWidth className="universal-image-picker">
      <ImageUploadPanel
        imageType={imageType}
        isPending={isPending}
        t={t}
        onSaveUrl={handleSelectTmdbImage}
        onUploadFile={handleUploadFile}
      />

      {imageType === 'logo' && isScene && (
        <Stack gap="md" fullWidth className="scene-image-picker-options scene-image-picker-options--logo">
          <Text as="h4" variant="body" weight="semibold">
            {t('library.details.availableLogos') || 'Available Logos'}
          </Text>
          <Grid variant="logo">
            <SelectableCard
              selected={!(selectedPath || currentPath)}
              onClick={handleSelectDefaultText}
              aspect="logo"
              variant="picker"
              showCheckmark={false}
              alt=" "
              infoLeft={t('library.details.defaultText') || 'Default Text'}
              textPreview={DEFAULT_TEXT_LETTERS}
            />

            {logoOptions.map((opt, idx) => (
              <SelectableCard
                key={idx}
                imageUrl={resolveMediaImageUrl(opt.path, 'logo')}
                alt={opt.alt}
                selected={pathsMatch(selectedPath || currentPath, opt.path)}
                onClick={() => handleSelectTmdbImage(opt.path)}
                aspect="logo"
                variant="picker"
                showCheckmark={false}
                infoLeft={opt.label}
              />
            ))}
          </Grid>
        </Stack>
      )}

      {isScene && (imageType === 'poster' || imageType === 'backdrop') && (
        <Stack gap="md" fullWidth className="scene-image-picker-options">
          <Text as="h4" variant="body" weight="semibold">
            {imageType === 'poster'
              ? (t('library.details.availablePosters') || 'Available Posters')
              : (t('library.details.availableBackdrops') || 'Available Backdrops')}
          </Text>
          <Grid variant={imageType === 'backdrop' ? 'backdrop' : 'picker'}>
            {sceneImageOptions.map((opt, idx) => (
              <SelectableCard
                key={idx}
                imageUrl={resolveMediaImageUrl(opt.path, imageType)}
                alt={opt.alt}
                selected={pathsMatch(selectedPath || currentPath, opt.path)}
                onClick={() => handleSelectTmdbImage(opt.path)}
                aspect={imageType === 'backdrop' ? 'landscape' : 'poster'}
                variant="picker"
                showCheckmark={false}
                infoLeft={opt.label}
              />
            ))}
          </Grid>
        </Stack>
      )}

      {sources.length > 1 && (
        <Inline align="center" justify="center" data-divider="bottom" fullWidth>
          <SegmentedControl
            value={imageSource}
            onChange={(val) => setImageSource(val)}
            options={sources}
          />
        </Inline>
      )}

      {!isScene && entityType !== 'studio' && (
        <div className="universal-image-picker__grid">
          <UniversalImageGrid
            itemId={imageLookupId}
            mediaType={entityType}
            imageType={imageType === 'profile' ? 'poster' : imageType}
            currentPath={selectedPath || currentPath}
            onSelect={handleSelectTmdbImage}
            isPending={isPending}
            t={t}
            selectedSource={imageSource}
          />
        </div>
      )}
    </Stack>
  );
}
