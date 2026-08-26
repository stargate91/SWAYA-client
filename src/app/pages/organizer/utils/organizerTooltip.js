import { isSceneMediaType, isEpisodeMediaType } from '@/lib/mediaTypes';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { API_BASE } from '@/lib/backend';

export function isOrganizerRowLandscape(row, activeMainTab, activeManualTab) {
  if (!row) return false;
  return Boolean(
    isSceneMediaType(row.rawType) ||
    isEpisodeMediaType(row.rawType) ||
    row.rawPayload?.is_scene ||
    row.rawPayload?.scan_mode === 'scenes' ||
    activeMainTab === 'scenes' ||
    activeMainTab === 'episodes' ||
    (activeMainTab === 'manual' && (activeManualTab === 'scenes' || activeManualTab === 'episodes')) ||
    (row.images?.[0]?.path && (
      row.images[0].path.includes('scene_stills') ||
      row.images[0].path.includes('stills') ||
      row.images[0].path.includes('snapshots')
    ))
  );
}

export function resolveOrganizerTooltipImage(row, activeMainTab, activeManualTab) {
  if (!row?.images?.length) return null;
  const isLandscape = isOrganizerRowLandscape(row, activeMainTab, activeManualTab);
  return resolveMediaImageUrl(row.images[0].path, isLandscape ? 'scene_stills' : 'poster', API_BASE);
}
