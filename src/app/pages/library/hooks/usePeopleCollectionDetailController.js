import { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import { useUpdatePersonStatusMutation } from '@/queries';
import { useOverrideBackdropMutation, useUploadBackdropMutation } from '@/queries';
import {
  useLibraryCollectionDetailQuery,
  usePersonDetailQuery,
} from '@/queries/metadataQueries';
import { useSettingsQuery } from '@/queries/settingsQueries';
import { API_BASE } from '@/lib/backend';
import {
  buildPersonExternalLinks,
  resolveSocialLinks,
} from '@/lib/externalLinks';
import { getPosterImagePath, getProfileImagePath, resolveDetailsImageUrl } from '@/lib/imageUrls';
import { ROUTES } from '@/lib/routes';
import { useLibraryModeStore, isNsfwMode } from '@/stores/useLibraryModeStore';

export default function usePeopleCollectionDetailController({
  id,
  isPeople,
  t,
}) {
  const { locale } = useTranslation();
  const metadataLanguage = locale === 'en' ? 'en-US' : locale;
  const [isActivateHovered, setIsActivateHovered] = useState(false);
  const [editingReviewItem, setEditingReviewItem] = useState(null);
  const [reviewText, setReviewText] = useState('');

  const personQuery = usePersonDetailQuery(id, { enabled: isPeople && Boolean(id) });
  const collectionQuery = useLibraryCollectionDetailQuery(id, {
    enabled: !isPeople && Boolean(id),
    language: metadataLanguage,
  });
  const updatePersonStatusMutation = useUpdatePersonStatusMutation();
  const overrideBackdropMutation = useOverrideBackdropMutation();
  const uploadBackdropMutation = useUploadBackdropMutation();

  const item = isPeople ? personQuery.data : collectionQuery.data;
  const isLoading = isPeople ? personQuery.isLoading : collectionQuery.isLoading;
  const queryError = isPeople ? personQuery.error : collectionQuery.error;
  const hasError = isPeople ? personQuery.isError : collectionQuery.isError;

  const navigate = useNavigate();

  const { data: settings } = useSettingsQuery();

  useEffect(() => {
    if (!isLoading && item && item.is_adult && !settings?.include_adult) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isLoading, item, settings?.include_adult, navigate]);

  const overviewTitle = isPeople
    ? (t('library.details.biographyTitle') || 'Biography')
    : '';
  const overviewText = item?.biography || item?.overview || '';
  const overviewEmptyText = t('library.details.noOverviewAvailable') || 'No overview available.';
  const externalLinks = useMemo(
    () => (isPeople ? buildPersonExternalLinks(item) : []),
    [isPeople, item]
  );
  const profileLinks = useMemo(
    () => [],
    []
  );
  const extraLinks = useMemo(
    () => {
      if (!isPeople) return [];
      const profileLinkKeys = profileLinks.map((pl) => pl.key);
      return externalLinks.filter((link) => !profileLinkKeys.includes(link.key));
    },
    [isPeople, externalLinks, profileLinks]
  );
  const socialLinks = useMemo(() => {
    if (!isPeople || !item) return [];
    return resolveSocialLinks(externalLinks);
  }, [isPeople, externalLinks, item]);
  const personBackdropPath = item?.backdrop_path || (isPeople ? item?.known_for?.find(k => k.backdrop_path)?.backdrop_path : null);
  const backdropUrl = resolveDetailsImageUrl(personBackdropPath, API_BASE, 'backdrop');
  const mediaUrl = resolveDetailsImageUrl(
    isPeople ? getProfileImagePath(item) : getPosterImagePath(item),
    API_BASE,
    isPeople ? 'person' : 'poster'
  );
  const canChoosePeopleBackdrop = isPeople;
  const canChooseCollectionBackdrop = Boolean(
    item?.collection_backdrops?.some((bd) => !bd?.iso_639_1 || bd.iso_639_1 === 'null' || bd.iso_639_1 === '')
  );

  const handleToggleFavorite = () => {
    if (!isPeople || !item?.id) {
      return;
    }
    updatePersonStatusMutation.mutate({
      personId: item.id,
      routeId: id,
      payload: {
        is_favorite: !item?.is_favorite,
      },
    });
  };

  const handleToggleActive = () => {
    if (!isPeople || !item?.id) {
      return;
    }
    updatePersonStatusMutation.mutate({
      personId: item.id,
      routeId: id,
      payload: {
        is_active: !item?.is_active,
      },
    });
  };

  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  const showFinishes = Boolean(item?.is_adult && isNsfwMode(sessionMode));

  const handleRatingChange = (newRating) => {
    if (!isPeople || !item?.id) {
      return;
    }
    updatePersonStatusMutation.mutate({
      personId: item.id,
      routeId: id,
      payload: {
        user_rating: newRating,
      },
    });
  };

  const handleOpenReviewModal = () => {
    if (!isPeople || !item?.id) {
      return;
    }
    setEditingReviewItem(item || { name: item?.name });
    setReviewText(item?.user_comment || '');
  };

  const itemId = item?.id;

  const handleSaveReview = useCallback(() => {
    if (!isPeople || !itemId) {
      return;
    }
    updatePersonStatusMutation.mutate({
      personId: itemId,
      routeId: id,
      payload: {
        user_comment: reviewText || null,
      },
    });
    setEditingReviewItem(null);
  }, [isPeople, itemId, updatePersonStatusMutation, id, reviewText]);

  const [isImagePickerDrawerOpen, setIsImagePickerDrawerOpen] = useState(false);
  const [isBackdropDrawerOpen, setIsBackdropDrawerOpen] = useState(false);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);

  const isAnyDrawerOpen = isImagePickerDrawerOpen || isBackdropDrawerOpen || isDetailsDrawerOpen;

  const handleOpenImagePickerModal = useCallback(() => setIsImagePickerDrawerOpen(true), []);
  const handleCloseImagePickerModal = useCallback(() => setIsImagePickerDrawerOpen(false), []);
  const handleOpenBackdropModal = useCallback(() => setIsBackdropDrawerOpen(true), []);
  const handleCloseBackdropModal = useCallback(() => setIsBackdropDrawerOpen(false), []);
  const handleOpenDetailsDrawer = useCallback(() => setIsDetailsDrawerOpen(true), []);
  const handleCloseDetailsDrawer = useCallback(() => setIsDetailsDrawerOpen(false), []);

  return {
    item,
    isLoading,
    queryError,
    hasError,
    overviewTitle,
    overviewText,
    overviewEmptyText,
    profileLinks,
    extraLinks,
    socialLinks,
    backdropUrl,
    mediaUrl,
    isActivateHovered,
    canChoosePeopleBackdrop,
    canChooseCollectionBackdrop,
    updatePersonStatusMutation,
    setIsActivateHovered,
    handleToggleFavorite,
    handleToggleActive,
    handleOpenReviewModal,
    handleRatingChange,
    showFinishes,
    overrideBackdropMutation,
    uploadBackdropMutation,
    editingReviewItem,
    setEditingReviewItem,
    reviewText,
    setReviewText,
    handleSaveReview,
    isImagePickerDrawerOpen,
    setIsImagePickerDrawerOpen,
    isBackdropDrawerOpen,
    setIsBackdropDrawerOpen,
    isDetailsDrawerOpen,
    setIsDetailsDrawerOpen,
    isAnyDrawerOpen,
    handleOpenImagePickerModal,
    handleCloseImagePickerModal,
    handleOpenBackdropModal,
    handleCloseBackdropModal,
    handleOpenDetailsDrawer,
    handleCloseDetailsDrawer,
  };
}

