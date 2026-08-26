import Autocomplete from '@/ui/Autocomplete';
import Badge from '@/ui/Badge';
import Card from '@/ui/Card';
import Input from '@/ui/Input';
import Tooltip from '@/ui/Tooltip';
import Button from '@/ui/Button';
import Chip from '@/ui/Chip';
import Field from '@/ui/Field';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Text from '@/ui/Text';
import ColorSwatch from '@/ui/ColorSwatch';
import Thumbnail from '@/ui/Thumbnail';
import Lightbox from '@/ui/Lightbox';
import { Image as ImageIcon, Film } from '@/ui/icons';
import { resolveCustomImageUrl } from '@/lib/imageUrls';
import { useTagForm } from '../hooks/useTagForm';

const BULLET_POINT = '• ';

const PREDEFINED_COLORS = [
  'var(--color-accent-blue)',
  'color-mix(in srgb, var(--color-accent-blue) 75%, white)',
  'color-mix(in srgb, var(--color-accent-blue) 75%, black)',
  'var(--color-state-success)',
  'var(--color-state-warning)',
  'var(--color-state-danger)'
];

export default function CreateTagModalContent({
  onClose,
  t,
  initialTag = null,
  mode = 'create',
  onSuccess,
  defaultColor = 'var(--color-accent-blue)',
  isAdult = false,
}) {
  const {
    formId,
    name,
    color,
    setColor,
    customImages,
    newUrl,
    setNewUrl,
    selectedFeederboxTag,
    selectedMediaType,
    lightboxUrl,
    setLightboxUrl,
    error,
    feederboxSuggestions,
    isFetchingAsset,
    handleDragStart,
    handleFileUpload,
    handleAddUrl,
    handleRemoveImage,
    handleNameChange,
    handleApplyMedia,
    handleSelectFeederbox,
    handleSubmit,
  } = useTagForm({
    initialTag,
    mode,
    onSuccess,
    onClose,
    defaultColor,
    isAdult,
    t,
  });

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <Stack gap="xl" fullWidth>
        <Autocomplete
          label={t('library.tags.nameLabel') || 'Tag Name'}
          placeholder={t('library.tags.namePlaceholder') || 'Enter tag name...'}
          value={name}
          onChange={handleNameChange}
          options={isAdult ? feederboxSuggestions : []}
          onSelect={handleSelectFeederbox}
          error={error}
          autoFocus
          renderItem={(item) => (
            <Inline justify="between" align="center" fullWidth wrap={false}>
              <Inline gap="sm" align="center" flex={1} wrap={false}>
                <Text variant="small" weight="medium" truncate>{item.name}</Text>
                {item.matched_alias && (
                  <Text variant="xsmall" color="secondary" truncate>
                    {t('library.tags.aliasFormat', { alias: item.matched_alias })}
                  </Text>
                )}
              </Inline>
              <Inline gap="xs" align="center">
                {item.has_video && (
                  <Badge family="status" tone="accent" size="xs" roundness="sm">
                    {t('library.tags.badgeVid')}
                  </Badge>
                )}
                {item.has_image && (
                  <Badge family="status" tone="accent" size="xs" roundness="sm">
                    {t('library.tags.badgeImg')}
                  </Badge>
                )}
              </Inline>
            </Inline>
          )}
        />

        {isAdult && selectedFeederboxTag && (
          <Field label={t('library.tags.onlineArtwork', { defaultValue: 'Online Artwork (StashDB / Feederbox)' })}>
            <Card variant="soft" padding="md">
              <Inline gap="lg" align="center" wrap={false}>
                <Tooltip content={t('common.viewLarge', { defaultValue: 'Click to view full size' })} side="top">
                  <Thumbnail
                    size="preview"
                    hoverZoom
                    videoSrc={selectedMediaType === 'vid' ? selectedFeederboxTag.video_url : null}
                    src={selectedMediaType === 'img' ? selectedFeederboxTag.image_url : null}
                    onClick={() => {
                      if (selectedMediaType === 'vid' && selectedFeederboxTag.video_url) {
                        setLightboxUrl(selectedFeederboxTag.video_url);
                      } else if (selectedMediaType === 'img' && selectedFeederboxTag.image_url) {
                        setLightboxUrl(selectedFeederboxTag.image_url);
                      }
                    }}
                  />
                </Tooltip>

                <Stack gap="xs" flex={1}>
                  <Text variant="small" weight="semibold">{selectedFeederboxTag.name}</Text>
                  <Text variant="xsmall" color="secondary">
                    {isFetchingAsset
                      ? t('library.tags.downloadingAsset')
                      : t('library.tags.stashdbStandardTag')}
                  </Text>
                  <Inline gap="sm" align="center" wrap>
                    {selectedFeederboxTag.has_image && (
                      <Chip
                        size="sm"
                        variant={selectedMediaType === 'img' ? 'default' : 'outline'}
                        active={selectedMediaType === 'img'}
                        leftElement={<ImageIcon size={12} />}
                        onClick={() => handleApplyMedia(selectedFeederboxTag, 'img')}
                      >
                        {t('library.tags.squareImage')}
                      </Chip>
                    )}
                    {selectedFeederboxTag.has_video && (
                      <Chip
                        size="sm"
                        variant={selectedMediaType === 'vid' ? 'default' : 'outline'}
                        active={selectedMediaType === 'vid'}
                        leftElement={<Film size={12} />}
                        onClick={() => handleApplyMedia(selectedFeederboxTag, 'vid')}
                      >
                        {t('library.tags.videoLoop')}
                      </Chip>
                    )}
                    <Chip
                      size="sm"
                      variant={selectedMediaType === 'none' ? 'default' : 'ghost'}
                      active={selectedMediaType === 'none'}
                      onClick={() => handleApplyMedia(selectedFeederboxTag, 'none')}
                    >
                      {t('common.none')}
                    </Chip>
                  </Inline>
                </Stack>
              </Inline>
            </Card>
          </Field>
        )}

        {(!isAdult || !selectedFeederboxTag || selectedMediaType === 'none') && (
          <Field label={t('library.tags.customImagesLabel', { defaultValue: 'Custom Images (Max 3)' })}>
            <Stack gap="sm" fullWidth>
              {customImages.length > 0 && (
                <Inline gap="md">
                  {customImages.map((img, idx) => {
                    const imgObj = typeof img === 'string' ? { path: img, position_y: 50 } : img;
                    const imageUrl = resolveCustomImageUrl(imgObj.path);
                    return (
                      <Tooltip
                        key={idx}
                        content={t('library.tags.dragToReposition') || 'Drag to reposition'}
                        side="top"
                      >
                        <Thumbnail
                          src={imageUrl}
                          position={{ x: imgObj.position_x ?? 50, y: imgObj.position_y ?? 50 }}
                          repositionable
                          onMouseDown={(e) => handleDragStart(idx, e)}
                          onTouchStart={(e) => handleDragStart(idx, e)}
                          onRemove={() => handleRemoveImage(idx)}
                          removeLabel={t('library.tags.removeImage') || 'Remove image'}
                        />
                      </Tooltip>
                    );
                  })}
                </Inline>
              )}

              {customImages.length < 3 && (
                <Inline gap="sm" align="center">
                  <Input
                    placeholder={t('library.tags.imageUrlPlaceholder') || 'Paste image URL...'}
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    flex={1}
                  />
                  <Button
                    type="button"
                    onClick={handleAddUrl}
                    variant="secondary"
                  >
                    {t('library.tags.addImageUrl') || 'Add URL'}
                  </Button>
                  <Button
                    as="label"
                    variant="secondary"
                  >
                    {t('library.tags.uploadImage') || 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      hidden
                    />
                  </Button>
                </Inline>
              )}

              {customImages.length <= 1 ? (
                <Text variant="caption" color="secondary">
                  {BULLET_POINT}{t('library.tags.aspectRatioOne') || 'Ideal aspect ratio is 16:9 (landscape/backdrop)'}
                </Text>
              ) : (
                <Text variant="caption" color="secondary">
                  {BULLET_POINT}{t('library.tags.aspectRatioMultiple') || 'Ideal aspect ratio is 2:3 (portrait/portrait)'}
                </Text>
              )}
            </Stack>
          </Field>
        )}

        <Field label={t('library.tags.colorLabel') || 'Select Color'}>
          <Inline gap="md" fullWidth>
            {PREDEFINED_COLORS.map((c) => {
              const isSelected = color === c;
              return (
                <Tooltip key={c} content={c} side="top">
                  <ColorSwatch
                    color={c}
                    selected={isSelected}
                    onClick={() => setColor(c)}
                  />
                </Tooltip>
              );
            })}
          </Inline>
        </Field>
      </Stack>

      <Lightbox
        mediaUrl={lightboxUrl}
        isVideo={selectedMediaType === 'vid' || Boolean(lightboxUrl && (lightboxUrl.includes('/vid/') || lightboxUrl.endsWith('.webm') || lightboxUrl.endsWith('.mp4')))}
        onClose={() => setLightboxUrl(null)}
        t={t}
      />
    </form>
  );
}
