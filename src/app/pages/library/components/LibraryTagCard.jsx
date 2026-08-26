import React from 'react';
import Card from '@/ui/Card';
import cardStyles from '@/ui/Card.module.css';
import IconButton from '@/ui/IconButton';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import { Pencil, Trash2 } from '@/ui/icons';
import { useLibraryTagCardViewModel } from '../hooks/useLibraryTagCardViewModel';

export const LibraryTagCard = React.memo(function LibraryTagCard({
  item,
  index,
  t,
  onFocusTag,
  onEditTag,
  onDeleteTag,
  resolvePosterUrl,
}) {
  const {
    samplePreviews,
    previewCount,
    singlePreviewImage,
    isVideoPreview,
    resolvePreviewUrl,
    handleCardClick,
    handleKeyDown,
    handleEditClick,
    handleDeleteClick,
  } = useLibraryTagCardViewModel({
    item,
    onFocusTag,
    onEditTag,
    onDeleteTag,
    resolvePosterUrl,
  });

  return (
    <div
      key={item.name}
      /* eslint-disable-next-line react/forbid-dom-props */
      style={{
        '--tag-color': item.color || 'var(--color-accent)',
        '--item-index': index,
      }}
    >
      <Card
        variant="tag"
        role="button"
        tabIndex={0}
        data-preview={previewCount}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
      >
        {(previewCount > 1 || singlePreviewImage) ? (
          <div className={cardStyles['tag-preview']} aria-hidden="true">
            {isVideoPreview ? (
              <video
                src={singlePreviewImage}
                autoPlay
                loop
                muted
                playsInline
                className={cardStyles['tag-preview-video']}
              />
            ) : (
              samplePreviews.map((preview, previewIdx) => (
                <div
                  key={`${item.name}-preview-${previewIdx}`}
                  className={cardStyles['tag-preview-image']}
                  /* eslint-disable-next-line react/forbid-dom-props */
                  style={{
                    backgroundImage: `url(${
                      previewCount === 1
                        ? singlePreviewImage
                        : resolvePreviewUrl(preview)
                    })`,
                    backgroundPositionX: preview.position_x != null ? `${preview.position_x}%` : 'center',
                    backgroundPositionY: preview.position_y != null ? `${preview.position_y}%` : 'center',
                  }}
                />
              ))
            )}
          </div>
        ) : null}
        <div className={cardStyles['tag-actions']}>
          <IconButton
            type="button"
            size="xs"
            variant="ghost"
            label={t('library.tags.editBtn') || 'Edit Tag'}
            onClick={handleEditClick}
          >
            <Pencil size={12} />
          </IconButton>
          <IconButton
            type="button"
            size="xs"
            variant="ghost"
            label={t('library.tags.deleteBtn') || 'Delete Tag'}
            onClick={handleDeleteClick}
          >
            <Trash2 size={12} />
          </IconButton>
        </div>
        <Stack gap="2xs" className={cardStyles['tag-content']}>
          <Text truncate weight="bold" variant="small">
            {item.name}
          </Text>
          <Text color="secondary" className={cardStyles['tag-count']}>
            {t('library.tags.itemsCount', { count: item.total_count })}
          </Text>
        </Stack>
      </Card>
    </div>
  );
});

LibraryTagCard.displayName = 'LibraryTagCard';

export default LibraryTagCard;

