import { useState, createElement } from 'react';
import { useResolveMetadataMutation, useBulkResolveMetadataMutation } from '@/queries';
import { MEDIA_TYPES, isEpisodeMediaType, toMetadataMediaType, scanModeToMediaType } from '@/lib/mediaTypes';
import { usePromptPreferencesStore, PROMPT_PREFERENCE_KEYS } from '@/stores/usePromptPreferencesStore';
import { isNsfwMode } from '@/stores/useLibraryModeStore';
import { confirmDialog } from '@/stores/useModalStore';
import { HelpCircle } from '@/ui/icons';
import MatchModalConfirmDialog from '../components/matchModal/MatchModalConfirmDialog';

const toOptionalNumber = (value) => {
  const normalized = String(value ?? '').trim();
  if (!normalized) {
    return null;
  }
  const parsed = Number.parseInt(normalized, 10);
  return Number.isFinite(parsed) ? parsed : null;
};

const buildResolvePayload = (row, candidate, selectedMode, seasonValue, episodeValue, sessionMode) => {
  const episodeList = Array.isArray(candidate?.episodes) ? candidate.episodes : [];
  const defaultType = scanModeToMediaType(selectedMode);
  let mediaType = toMetadataMediaType(candidate?.type || candidate?.media_type || defaultType, defaultType);

  const rowType = row.rawType || row.rawPayload?.parsed_info?.type;
  if (rowType === 'movie' && (mediaType === MEDIA_TYPES.TV || mediaType === MEDIA_TYPES.EPISODE)) {
    mediaType = MEDIA_TYPES.MOVIE;
  } else if ((isEpisodeMediaType(rowType) || rowType === 'tv' || rowType === 'episode') && mediaType === MEDIA_TYPES.MOVIE) {
    mediaType = MEDIA_TYPES.TV;
  }
  const season = toOptionalNumber(seasonValue);
  const episode = toOptionalNumber(episodeValue);

  const payload = {
    item_id: row.itemId,
    tmdb_id: candidate.tmdb_id || candidate.id,
    type: mediaType,
    media_type: mediaType,
    provider: candidate.provider || 'tmdb',
    is_adult: isNsfwMode(sessionMode),
  };

  const isMatchedEpisode = isEpisodeMediaType(row.rawType)
    && (row.rawStatus === 'matched' || row.rawStatus === 'renamed' || row.rawStatus === 'organized');

  if (mediaType === MEDIA_TYPES.TV) {
    if (season != null) {
      payload.season_number = season;
    } else if (isMatchedEpisode) {
      payload.season_number = null;
    }

    if (episodeList.length > 0) {
      payload.episode_number = episodeList;
    } else if (episode != null) {
      payload.episode_number = episode;
    } else if (isMatchedEpisode) {
      payload.episode_number = null;
    }
  }

  return payload;
};

const getDefaultSeason = (row) => {
  const payload = row?.rawPayload || {};
  return payload.season ?? payload.fn_season ?? payload.fd_season ?? payload.it_season ?? '';
};

const getDefaultEpisode = (row) => {
  const payload = row?.rawPayload || {};
  return payload.episode ?? payload.fn_episode ?? payload.fd_episode ?? payload.it_episode ?? '';
};

export function useMatchResolve({ rows = [], t, toast, onResolved, mode, sessionMode }) {
  const [isResolvingId, setIsResolvingId] = useState(null);
  const resolveMutation = useResolveMetadataMutation();
  const bulkResolveMutation = useBulkResolveMetadataMutation();

  const requestConfirm = (type, skipKey, onConfirm) => {
    if (usePromptPreferencesStore.getState().isPromptDismissed(skipKey)) {
      onConfirm();
      return;
    }

    let hasExisting = false;
    let existingDetails = '';

    for (const r of rows) {
      const isMatchedEpisode = isEpisodeMediaType(r.rawType)
        && (r.rawStatus === 'matched' || r.rawStatus === 'renamed' || r.rawStatus === 'organized');
      if (!isMatchedEpisode) {
        continue;
      }
      const defaultSeasonVal = getDefaultSeason(r);
      const defaultEpisodeVal = getDefaultEpisode(r);
      if (type === 'tv') {
        if (defaultSeasonVal != null || defaultEpisodeVal != null) {
          hasExisting = true;
          const parts = [];
          if (defaultSeasonVal != null) parts.push(`S${defaultSeasonVal}`);
          if (defaultEpisodeVal != null) parts.push(`E${defaultEpisodeVal}`);
          existingDetails = parts.join(' ');
          break;
        }
      } else if (type === 'season') {
        if (defaultEpisodeVal != null) {
          hasExisting = true;
          existingDetails = `E${defaultEpisodeVal}`;
          break;
        }
      }
    }

    const title = t(`dynamic.organizerConfirm.${type}.title`) || 'Confirm Selection';
    const description = type === 'bucket'
      ? t('dynamic.organizerConfirm.bucket.descWithExisting') || t('dynamic.organizerConfirm.bucket.title') || 'Assign episodes to bucket'
      : hasExisting
        ? (t(`dynamic.organizerConfirm.${type}.descWithExisting`, { existing: existingDetails }) || '').replace('{existing}', existingDetails)
        : t(`dynamic.organizerConfirm.${type}.descNoExisting`) || 'Apply selected match?';

    let dontShowAgainChecked = false;

    confirmDialog({
      title,
      description,
      variant: 'primary',
      icon: HelpCircle,
      confirmText: t('organizer.details.matchModal.confirm.confirmBtn') || 'Confirm',
      cancelText: t('common.cancel') || 'Cancel',
      content: createElement(MatchModalConfirmDialog, {
        onChange: (e) => {
          dontShowAgainChecked = e.target.checked;
        },
        label: t('organizer.details.matchModal.confirm.dontShowAgain') || "Don't show this confirmation again",
      }),
      onConfirm: () => {
        if (dontShowAgainChecked) {
          usePromptPreferencesStore.getState().dismissPrompt(skipKey);
        }
        onConfirm();
      },
    });
  };

  const handleResolve = async (candidate, overrides = {}) => {
    const candidateId = candidate.tmdb_id || candidate.id;
    const effectiveSeason = overrides.season !== undefined ? overrides.season : null;
    const effectiveEpisode = overrides.episode !== undefined ? overrides.episode : null;

    const isMatchedEpisode = rows.some((r) => (
      isEpisodeMediaType(r.rawType)
      && (r.rawStatus === 'matched' || r.rawStatus === 'renamed' || r.rawStatus === 'organized')
    ));

    const performResolve = async () => {
      setIsResolvingId(candidateId);
      try {
        await onResolved(async () => {
          if (rows.length > 1) {
            const episodeList = Array.isArray(candidate?.episodes) ? candidate.episodes : [];
            const mediaType = toMetadataMediaType(candidate?.type || candidate?.media_type || mode, mode);
            const seasonVal = toOptionalNumber(effectiveSeason);
            const episodeVal = toOptionalNumber(effectiveEpisode);

            const resolutions = rows.map((r) => {
              const payload = {
                item_id: r.itemId,
                tmdb_id: candidate.tmdb_id || candidate.id,
                type: mediaType,
                media_type: mediaType,
                provider: candidate.provider || 'tmdb',
                is_adult: isNsfwMode(sessionMode),
              };

              if (mediaType === MEDIA_TYPES.TV) {
                if (seasonVal != null) {
                  payload.season_number = seasonVal;
                } else if (isMatchedEpisode) {
                  payload.season_number = null;
                }

                if (episodeList.length > 0) {
                  payload.episode_number = episodeList;
                } else if (episodeVal != null) {
                  payload.episode_number = episodeVal;
                } else if (isMatchedEpisode) {
                  payload.episode_number = null;
                }
              }

              return payload;
            });

            await bulkResolveMutation.mutateAsync({
              resolutions,
            });
          } else {
            const payload = buildResolvePayload(rows[0], candidate, mode, effectiveSeason, effectiveEpisode, sessionMode);
            await resolveMutation.mutateAsync(payload);
          }
        });
        toast(t('organizer.toasts.matchResolveSuccess'), 'success');
      } catch (error) {
        toast(error.message || t('organizer.toasts.matchResolveFailed'), 'danger');
      } finally {
        setIsResolvingId(null);
      }
    };

    const isBucket = mode === MEDIA_TYPES.TV && effectiveSeason !== null && effectiveEpisode === null && Array.isArray(candidate?.episodes) && candidate.episodes.length > 0;

    if (isBucket) {
      requestConfirm('bucket', PROMPT_PREFERENCE_KEYS.ORGANIZER_CONFIRM_BUCKET, performResolve);
      return;
    }

    const isEpisodeRow = rows.some((r) => isEpisodeMediaType(r.rawType));

    if (isEpisodeRow) {
      if (mode === MEDIA_TYPES.TV && effectiveSeason === null && effectiveEpisode === null) {
        requestConfirm('tv', PROMPT_PREFERENCE_KEYS.ORGANIZER_CONFIRM_TV, performResolve);
        return;
      }
      if (mode === MEDIA_TYPES.TV && effectiveSeason !== null && effectiveEpisode === null) {
        requestConfirm('season', PROMPT_PREFERENCE_KEYS.ORGANIZER_CONFIRM_SEASON, performResolve);
        return;
      }
    }

    await performResolve();
  };

  return {
    confirmState: null,
    setConfirmState: () => {},
    isResolvingId,
    handleResolve,
  };
}

export default useMatchResolve;
