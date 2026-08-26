import { memo, useMemo, useCallback } from 'react';
import PosterCard from '@/ui/PosterCard';
import Button from '@/ui/Button';
import Text from '@/ui/Text';
import { Pencil, Play, Minus, Check, Eye, EyeOff } from '@/ui/icons';
import posterCardStyles from '@/ui/PosterCard.module.css';
import buttonStyles from '@/ui/IconButton.module.css';
import { usePosterCardViewModel } from '../hooks/usePosterCardViewModel';

export const LibraryPosterCard = memo(({
  item,
  index,
  resolvedTab,
  isCollections,
  emptyIcon,
  t,
  playMutationPending,
  onItemClick,
  onPlayOverlayClick,
  onEditImageClick,
  onRemove,
  onUnfollow,
  onUnfollowStudio,
  settings,
  sortKey,
  hideWatchToggle = false,
  bulkUpdateWatchedMutation,
}) => {
  const {
    aspect,
    isStudios,
    title,
    subtitle,
    imageUrl,
    ratingImdb,
    ratingTmdb,
    ratingTheporndb,
    ratingPillText,
    performers,
    dateText,
    className,
    previewSrc,
    isLoadingPreview,
    setIsHovered,
    // Actions & Flags
    showRemoveButton,
    handleRemoveClick,
    showEditButton,
    editButtonTitle,
    handleEditClick,
    showUnfollowPerson,
    handleUnfollowPersonClick,
    showUnfollowStudio,
    handleUnfollowStudioClick,
    showWatchToggle,
    isWatched,
    isWatchPending,
    handleWatchToggleClick,
    playOverlay: playOverlayConfig,
  } = usePosterCardViewModel({
    item,
    resolvedTab,
    isCollections,
    t,
    playMutationPending,
    onPlayOverlayClick,
    onEditImageClick,
    onRemove,
    onUnfollow,
    onUnfollowStudio,
    settings,
    sortKey,
    hideWatchToggle,
    bulkUpdateWatchedMutation,
  });

  const handleClick = useCallback(() => {
    onItemClick?.(item);
  }, [onItemClick, item]);

  const customStyle = useMemo(() => ({ '--item-index': index }), [index]);

  const ratingPill = useMemo(() => {
    return ratingPillText ? (
      <Text variant="small" color="muted">{ratingPillText}</Text>
    ) : undefined;
  }, [ratingPillText]);

  const topLeftAction = useMemo(() => {
    if (!showWatchToggle) return null;
    const label = isWatched
      ? (t('library.details.markUnwatched') || 'Mark as Unwatched')
      : (t('library.details.markWatched') || 'Mark as Watched');
    return (
      <button
        type="button"
        className={posterCardStyles['watch-toggle']}
        title={label}
        aria-label={label}
        onClick={handleWatchToggleClick}
        disabled={isWatchPending}
      >
        {isWatched ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    );
  }, [showWatchToggle, isWatched, t, handleWatchToggleClick, isWatchPending]);

  const topRightAction = useMemo(() => {
    if (!showEditButton) return null;
    return (
      <button
        type="button"
        className={`${buttonStyles['image-edit-badge']} ui-image-edit-badge`}
        title={editButtonTitle}
        aria-label={editButtonTitle}
        onClick={handleEditClick}
      >
        <Pencil size={14} />
      </button>
    );
  }, [showEditButton, editButtonTitle, handleEditClick]);

  const bottomAction = useMemo(() => {
    if (showRemoveButton) {
      return (
        <Button
          variant="glass"
          aria-invalid={true}
          className={posterCardStyles['action-btn']}
          title={t('common.remove') || 'Remove'}
          aria-label={t('common.remove') || 'Remove'}
          leftIcon={<Minus size={12} strokeWidth={3} />}
          onClick={handleRemoveClick}
        >
          {t('common.remove') || 'Remove'}
        </Button>
      );
    }
    if (showUnfollowPerson) {
      return (
        <Button
          variant="glass"
          aria-pressed={true}
          destructiveHover={true}
          className={posterCardStyles['action-btn']}
          onClick={handleUnfollowPersonClick}
        >
          <span className={posterCardStyles['action-btn-state-default']}>
            <Check size={12} strokeWidth={3} /> {t('library.people.followed') || 'Followed'}
          </span>
          <span className={posterCardStyles['action-btn-state-hover']}>
            <Minus size={12} strokeWidth={3} /> {t('library.people.unfollow') || 'Unfollow'}
          </span>
        </Button>
      );
    }
    if (showUnfollowStudio) {
      return (
        <Button
          variant="glass"
          aria-pressed={true}
          destructiveHover={true}
          className={posterCardStyles['action-btn']}
          onClick={handleUnfollowStudioClick}
        >
          <span className={posterCardStyles['action-btn-state-default']}>
            <Check size={12} strokeWidth={3} /> {t('library.studios.followed') || 'Active'}
          </span>
          <span className={posterCardStyles['action-btn-state-hover']}>
            <Minus size={12} strokeWidth={3} /> {t('library.studios.unfollow') || 'Deactivate'}
          </span>
        </Button>
      );
    }
    return null;
  }, [
    showRemoveButton,
    showUnfollowPerson,
    showUnfollowStudio,
    t,
    handleRemoveClick,
    handleUnfollowPersonClick,
    handleUnfollowStudioClick,
  ]);

  const playOverlay = useMemo(() => {
    if (!playOverlayConfig) return null;
    return {
      onClick: playOverlayConfig.onClick,
      title: playOverlayConfig.title,
      label: playOverlayConfig.label,
      disabled: playOverlayConfig.disabled,
      icon: <Play size={12} fill="currentColor" />,
    };
  }, [playOverlayConfig]);

  return (
    <PosterCard
      aspect={aspect}
      fillHeight={Boolean(onRemove)}
      customStyle={customStyle}
      onClick={handleClick}
      isWatched={isStudios ? false : isWatched}
      title={title}
      subtitle={subtitle}
      imageUrl={imageUrl}
      icon={emptyIcon}
      backgroundColor={item.color}
      ratingImdb={ratingImdb}
      ratingTmdb={ratingTmdb}
      ratingTheporndb={ratingTheporndb}
      ratingPill={ratingPill}
      performers={performers}
      date={dateText}
      topLeftAction={topLeftAction}
      topRightAction={topRightAction}
      bottomAction={bottomAction}
      userRating={onRemove ? 0 : (Number(item.user_rating) || 0)}
      isFavorite={Boolean(item.is_favorite)}
      playOverlay={playOverlay}
      className={className}
      previewSrc={previewSrc}
      isLoadingPreview={isLoadingPreview}
      onHoverChange={setIsHovered}
      sortKey={sortKey}
      loading="eager"
    />
  );
});

LibraryPosterCard.displayName = 'LibraryPosterCard';
