import { useState, useMemo } from 'react';
import { useMediaHoverPreview } from '@/hooks/useMediaHoverPreview';
import {
  getPosterImagePath,
  getProfileImagePath,
  getTvPosterImagePath,
  resolveMediaImageUrl,
} from '@/lib/imageUrls';
import {
  isLibraryMovieTab,
  isLibraryPeopleTab,
  isLibraryTvTab,
  isLibraryScenesTab,
  isLibraryStudiosTab,
} from '@/lib/libraryTabs';
import { isSceneMediaType } from '@/lib/mediaTypes';
import { normalizeMediaEntity } from '@/lib/normalizeMediaEntity';
import {
  formatRating,
  formatFileSize,
  formatReleaseDate,
  formatPerformerSubtitle,
  formatMediaSubtitle,
  formatRuntimeMinutes,
} from '@/lib/formatters';

export function usePosterCardViewModel({
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
  hideWatchToggle = false,
  bulkUpdateWatchedMutation,
}) {
  const cardData = useMemo(() => {
    const isPeople = isLibraryPeopleTab(resolvedTab);
    const isLibraryTv = isLibraryTvTab(resolvedTab);
    const isLibraryMovie = isLibraryMovieTab(resolvedTab);
    const isLibraryScenes = isLibraryScenesTab(resolvedTab);
    const isStudios = isLibraryStudiosTab(resolvedTab);
    const isScene = isSceneMediaType(item.type) || isLibraryScenes;

    const resolvePosterUrl = (path) => resolveMediaImageUrl(path, 'poster');
    const n = normalizeMediaEntity(item, { context: 'library', settings });

    let title = item.title || item.name;
    let subtitle;
    let imageUrl;
    const ratingImdb = (isPeople || isStudios || onRemove) ? undefined : n.ratingImdb;
    const ratingTmdb = (isPeople || isStudios || onRemove) ? undefined : n.ratingTmdb;
    const ratingTheporndb = (isPeople || isStudios || onRemove) ? undefined : item.rating_theporndb;
    let className = '';
    let ratingPillText;
    let performers;
    let dateText;

    if (onRemove) {
      imageUrl = resolvePosterUrl(n.imageUrl);
    } else if (isCollections) {
      title = item.name || item.title;
      subtitle = t('library.collections.partsCount', { owned: item.owned_count, total: item.total_count });
      imageUrl = resolvePosterUrl(getPosterImagePath(item));
    } else if (isPeople) {
      title = item.name || item.title;
      subtitle = formatPerformerSubtitle(item, sortKey, t);
      imageUrl = resolvePosterUrl(getProfileImagePath(item));
      className = 'library-person-card';
    } else if (isStudios) {
      title = item.name || item.title;
      if (sortKey === 'user_rating') {
        subtitle = item.user_rating ? `${t('library.sort.userRating') || 'User Rating'}: ${formatRating(item.user_rating)}` : '—';
      } else {
        const count = item.library_count ?? item.items_count ?? 0;
        subtitle = t('library.sort.libraryCountValue', { count }) || `${count} ${count === 1 ? 'item' : 'items'}`;
      }
      imageUrl = item.logo_path ? resolveMediaImageUrl(item.logo_path, 'logo') : null;
      className = 'library-studio-card';
    } else if (isLibraryScenes) {
      performers = n.performers;
      dateText = formatReleaseDate(item) || undefined;

      let pillText;
      if (sortKey === 'duration') {
        const runTime = item.duration || item.runtime || item.run_time;
        if (runTime) {
          pillText = formatRuntimeMinutes(runTime, 'mins');
        }
      } else if (sortKey === 'file_size') {
        const sizeVal = Number(item.file_size || item.size || item.size_mb);
        if (sizeVal) {
          pillText = formatFileSize(sizeVal);
        }
      } else if (sortKey === 'last_watched') {
        pillText = formatReleaseDate(item.last_watched_at, '—');
      } else if (sortKey === 'watch_count') {
        pillText = `${item.watch_count || 0}x`;
      } else if (sortKey === 'tag_count') {
        const tCount = item.tag_count || (item.custom_tags || []).length;
        pillText = `${tCount} tags`;
      } else if (sortKey === 'finish_count') {
        pillText = `${item.finish_count || 0} f`;
      } else if (sortKey === 'last_finish') {
        const fDate = item.last_finish_at || item.last_finish;
        pillText = formatReleaseDate(fDate, '—');
      }

      ratingPillText = pillText;
      imageUrl = n.imageUrl;
      className = 'library-scene-card';
    } else {
      let defaultSubtitle;
      const isTmdb = item.provider === 'tmdb' || item.source === 'tmdb';
      if (isTmdb) {
        const firstAirDate = item.first_air_date || item.release_date;
        const firstYear = firstAirDate ? new Date(firstAirDate).getFullYear() : null;
        const lastYear = item.last_air_date ? new Date(item.last_air_date).getFullYear() : null;
        const isEnded = ['ended', 'canceled', 'cancelled'].includes(item.release_status?.toLowerCase());

        if (firstYear) {
          if (isLibraryTv || item.type === 'tv' || item.media_type === 'tv') {
            if (isEnded && lastYear) {
              defaultSubtitle = firstYear === lastYear ? `${firstYear}` : `${firstYear}-${lastYear}`;
            } else {
              defaultSubtitle = `${firstYear}-`;
            }
          } else {
            defaultSubtitle = `${firstYear}`;
          }
        } else {
          defaultSubtitle = item.year ? String(item.year) : '';
        }
      } else {
        defaultSubtitle = n.subtitle || '';
      }

      subtitle = formatMediaSubtitle(item, sortKey, t, defaultSubtitle);
      imageUrl = resolvePosterUrl(isLibraryTv ? getTvPosterImagePath(item) : getPosterImagePath(item));
    }

    return {
      isPeople,
      isLibraryTv,
      isLibraryMovie,
      isLibraryScenes,
      isStudios,
      isScene,
      title,
      subtitle,
      imageUrl,
      ratingImdb,
      ratingTmdb,
      ratingTheporndb,
      className,
      ratingPillText,
      performers,
      dateText,
    };
  }, [item, resolvedTab, isCollections, onRemove, settings, sortKey, t]);

  const {
    isPeople,
    isLibraryTv,
    isLibraryMovie,
    isLibraryScenes,
    isStudios,
    isScene,
    title,
    subtitle,
    imageUrl,
    ratingImdb,
    ratingTmdb,
    ratingTheporndb,
    className,
    ratingPillText,
    performers,
    dateText,
  } = cardData;

  const showRemoveButton = Boolean(onRemove);
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    onRemove?.(item);
  };

  const showEditButton = Boolean(onEditImageClick && !isStudios && !onRemove);
  const editButtonTitle = isPeople
    ? (t('library.details.changeProfile') || 'Change Profile Picture')
    : (t('library.details.changePoster') || 'Change Poster');

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onEditImageClick?.(item);
  };

  let playOverlay = null;
  if (!onRemove && isLibraryScenes && item.in_library !== false && onPlayOverlayClick) {
    const playTitle = ((item.resume_position || 0) > 0 ? (t('library.details.resume') || 'Resume') : (t('library.details.play') || 'Play'));
    playOverlay = {
      onClick: (event) => onPlayOverlayClick(event, item),
      title: playTitle,
      label: playTitle,
      disabled: Boolean(playMutationPending),
    };
  } else if (!onRemove && item.in_library !== false && (isLibraryMovie || isLibraryTv) && onPlayOverlayClick) {
    const playTitle = isLibraryTv
      ? (t('library.details.continue') || 'Continue')
      : ((item.resume_position || 0) > 0 ? (t('library.details.resume') || 'Resume') : (t('library.details.play') || 'Play'));

    playOverlay = {
      onClick: (event) => onPlayOverlayClick(event, item),
      title: playTitle,
      label: playTitle,
      disabled: Boolean(playMutationPending),
    };
  }

  const [isHovered, setIsHovered] = useState(false);

  const previewItemId = (isScene && item.in_library !== false && !onRemove)
    ? (item.library_item_id || item.id)
    : undefined;

  const { previewSrc, isLoadingPreview } = useMediaHoverPreview(previewItemId, {
    isHovered,
    settings,
    previewEnabled: onRemove ? false : Boolean(settings?.hover_previews_enabled ?? true),
    previewDelay: onRemove ? 800 : Number(settings?.hover_previews_delay ?? 800),
  });

  const showUnfollowPerson = Boolean(onUnfollow && isPeople && !onRemove);
  const handleUnfollowPersonClick = (e) => {
    e.stopPropagation();
    onUnfollow?.(item);
  };

  const showUnfollowStudio = Boolean(onUnfollowStudio && isStudios && !onRemove);
  const handleUnfollowStudioClick = (e) => {
    e.stopPropagation();
    onUnfollowStudio?.(item);
  };

  const showWatchToggle = Boolean(!isCollections && !isPeople && !isStudios && !onRemove && !hideWatchToggle);
  const isWatched = Boolean(item.is_watched);
  const isWatchPending = Boolean(bulkUpdateWatchedMutation?.isPending);

  const handleWatchToggleClick = (e) => {
    e.stopPropagation();
    if (!bulkUpdateWatchedMutation || bulkUpdateWatchedMutation.isPending) return;
    bulkUpdateWatchedMutation.mutate({
      itemIds: [String(item.id)],
      isWatched: !item.is_watched,
      entityId: String(item.id),
      tvId: isLibraryTv ? (item.tv_tmdb_id || item.tmdb_id) : undefined,
    });
  };

  const aspect = isStudios ? 'logo' : (isScene ? (onRemove ? 'mixed-landscape' : 'landscape') : 'poster');

  return {
    aspect,
    isStudios,
    isScene,
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
    playOverlay,
  };
}
