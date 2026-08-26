import { useMemo, createElement } from 'react';
import { Star, Heart, Edit3, Clapperboard, Tv, Video, Users, CheckCircle, Film } from '@/ui/icons';
import Button from '@/ui/Button';
import IconButton from '@/ui/IconButton';
import SegmentedRating from '@/ui/SegmentedRating';
import RatingsTitleCell from '../components/RatingsTitleCell';
import Inline from '@/ui/Inline';
import Text from '@/ui/Text';
import { getLibraryTabTranslationKey } from '@/lib/libraryTabs';
import { navigateToLibraryItem } from '@/lib/routes';

export function useRatingsColumns({
  state,
  t,
  navigate,
}) {
  const {
    activeSessionMode,
    mediaType,
    settings,
    handleOpenReviewDrawer,
    handleRateItem,
    handleToggleFavorite,
  } = state;

  const isAdultMode = activeSessionMode === 'nsfw';

  // Tabs configurations
  const ratingTabs = useMemo(() => [
    { value: 'unrated', label: t('ratings.tabs.unrated', { defaultValue: 'To Be Rated' }), icon: Star },
    { value: 'rated', label: t('ratings.tabs.rated', { defaultValue: 'Rated & Reviewed' }), icon: CheckCircle },
  ], [t]);

  // Media Type Filter configuration
  const subTabs = useMemo(() => [
    { value: 'movies', label: t('library.tabs.movies'), icon: Clapperboard },
    { value: 'tv', label: t('library.tabs.tv'), icon: Tv },
    ...(isAdultMode ? [{ value: 'scenes', label: t('library.tabs.scenes'), icon: Video }] : []),
    { value: 'videos', label: t('library.tabs.videos'), icon: Video },
    { value: 'people', label: t(`library.tabs.${getLibraryTabTranslationKey('people', activeSessionMode)}`), icon: Users },
    { value: 'studios', label: t('library.tabs.studios'), icon: Film },
  ], [t, isAdultMode, activeSessionMode]);

  // Define table columns dynamically based on state
  const columns = useMemo(() => [
    {
      key: 'name',
      sortable: true,
      label: mediaType === 'people' || mediaType === 'studios'
        ? t('ratings.table.name', { defaultValue: 'Name' })
        : t('ratings.table.title', { defaultValue: 'Title' }),
      render: (val, row) => createElement(RatingsTitleCell, {
        row,
        mediaType,
        settings,
        onNavigate: () => navigateToLibraryItem(navigate, row, mediaType),
      }),
    },
    {
      key: 'comment',
      sortable: true,
      label: t('ratings.table.comment', { defaultValue: 'Review' }),
      render: (val, row) => {
        const hasComment = row.user_comment && String(row.user_comment).trim();
        return createElement(
          Inline,
          { gap: 'md', align: 'center', fullWidth: true },
          hasComment
            ? createElement(Text, { color: 'secondary', variant: 'small', truncate: true }, row.user_comment)
            : createElement(Text, { color: 'faint', variant: 'xsmall', italic: true }, t('ratings.dialog.placeholder', { defaultValue: 'Write a review...' })),
          createElement(
            Button,
            {
              variant: 'ghost',
              size: 'sm',
              onClick: (e) => handleOpenReviewDrawer(e, row),
            },
            createElement(Edit3, { size: 12 }),
            hasComment ? (t('common.edit') || 'Edit') : (t('common.add') || 'Add')
          )
        );
      },
    },
    {
      key: 'rating',
      sortable: true,
      label: t('ratings.table.rating', { defaultValue: 'My Rating' }),
      width: '240px',
      render: (val, row) => createElement(SegmentedRating, {
        value: row.user_rating,
        onChange: (newVal) => handleRateItem(row, newVal),
        t,
      }),
    },
    ...(mediaType === 'people' || mediaType === 'studios'
      ? [
        {
          key: 'favorite',
          label: t('ratings.table.favorite', { defaultValue: 'Favorite' }),
          width: '110px',
          align: 'center',
          render: (val, row) => createElement(
            IconButton,
            {
              variant: 'favorite',
              active: row.is_favorite,
              size: 'sm',
              label: t('ratings.table.favorite', { defaultValue: 'Favorite' }),
              title: null,
              onClick: (e) => {
                e.stopPropagation();
                handleToggleFavorite(row);
              },
            },
            createElement(Heart, { size: 16, fill: row.is_favorite ? 'currentColor' : 'none' })
          ),
        },
      ]
      : []),
  ], [t, mediaType, settings, handleOpenReviewDrawer, handleRateItem, handleToggleFavorite, navigate]);

  return {
    ratingTabs,
    subTabs,
    columns,
  };
}

export default useRatingsColumns;
